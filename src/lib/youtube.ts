// ============================================================================
// DzPhy — YouTube fetcher (channel-first, playlist-aware)
// ----------------------------------------------------------------------------
// Two official, allowed sources are supported, in priority order:
//
//   1. YouTube Data API v3  — used automatically when the server-side env var
//      YOUTUBE_API_KEY is present. Gives full playlist/channel listings and
//      accurate metadata. The key is read ONLY on the server (API route) and is
//      never shipped to the browser.
//
//   2. Public RSS feeds     — the zero-config fallback (no API key required):
//        playlist:  https://www.youtube.com/feeds/videos.xml?playlist_id=...
//        channel:   https://www.youtube.com/feeds/videos.xml?channel_id=...
//
// Thumbnails are ALWAYS derived deterministically from the video id
// (https://i.ytimg.com/vi/<id>/hqdefault.jpg). Every public YouTube video has
// this image, so covers show up for single videos exactly like they do for
// playlists — no more missing thumbnails.
//
// Because both sources are fetched live (with revalidation), any video added to
// a playlist or uploaded to the channel appears on the site automatically.
// ============================================================================

export interface PlaylistVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  views?: string;
}

export interface PlaylistFeed {
  playlistId: string;
  title: string;
  videos: PlaylistVideo[];
}

const REVALIDATE_SECONDS = 900; // 15 min — new uploads appear automatically

/** Official YouTube thumbnail for a video id. Works for every public video. */
export function youtubeThumbnail(
  videoId: string,
  quality: "hq" | "mq" | "sd" | "maxres" = "hq"
): string {
  const map = {
    hq: "hqdefault",
    mq: "mqdefault",
    sd: "sddefault",
    maxres: "maxresdefault",
  } as const;
  return `https://i.ytimg.com/vi/${videoId}/${map[quality]}.jpg`;
}

// ---------------------------------------------------------------------------
// Tiny, dependency-free XML helpers (RSS feeds are small & well-formed)
// ---------------------------------------------------------------------------
const unescape = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

function extractAll(text: string, startTag: string, endTag: string): string[] {
  const out: string[] = [];
  let from = 0;
  for (;;) {
    const s = text.indexOf(startTag, from);
    if (s === -1) break;
    const contentStart = s + startTag.length;
    const e = text.indexOf(endTag, contentStart);
    if (e === -1) break;
    out.push(text.slice(contentStart, e));
    from = e + endTag.length;
  }
  return out;
}

function extractFirst(text: string, startTag: string, endTag: string): string | undefined {
  const s = text.indexOf(startTag);
  if (s === -1) return undefined;
  const contentStart = s + startTag.length;
  const e = text.indexOf(endTag, contentStart);
  if (e === -1) return undefined;
  return text.slice(contentStart, e);
}

function extractAttr(text: string, attr: string): string | undefined {
  const re = new RegExp(`${attr}=["']([^"']*)["']`);
  const m = text.match(re);
  return m ? m[1] : undefined;
}

function formatViews(n?: string | number): string | undefined {
  if (n === undefined || n === null) return undefined;
  const v = typeof n === "number" ? n : parseInt(n, 10);
  if (Number.isNaN(v)) return undefined;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return `${v}`;
}

// ---------------------------------------------------------------------------
// RSS parsing (shared by playlist & channel feeds)
// ---------------------------------------------------------------------------
function parseFeed(xml: string, fallbackTitle: string): { title: string; videos: PlaylistVideo[] } {
  const title = unescape(extractFirst(xml, "<title>", "</title>") ?? fallbackTitle).trim();

  const videos: PlaylistVideo[] = extractAll(xml, "<entry>", "</entry>")
    .map((entry) => {
      const id = extractFirst(entry, "<yt:videoId>", "</yt:videoId>") ?? "";
      const videoTitle = unescape(extractFirst(entry, "<title>", "</title>") ?? "").trim();
      const published = extractFirst(entry, "<published>", "</published>") ?? "";
      const stats = extractFirst(entry, "<media:statistics", "/>") ?? "";
      const views = formatViews(extractAttr(stats, "views"));
      return {
        id,
        title: videoTitle,
        url: `https://www.youtube.com/watch?v=${id}`,
        // Deterministic — never depends on fragile feed attributes.
        thumbnail: id ? youtubeThumbnail(id) : "",
        published,
        views,
      };
    })
    .filter((v) => v.id);

  return { title, videos };
}

async function fetchText(url: string): Promise<string> {
  // Two attempts with an 8s timeout each — YouTube RSS is occasionally slow or
  // rate-limited; a single transient failure shouldn't empty a whole playlist.
  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "DzPhy/1.0 (+https://dzphy.vercel.app)" },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(`fetch ${url} failed`);
}

// ---------------------------------------------------------------------------
// YouTube Data API v3 (used only when YOUTUBE_API_KEY is set on the server)
// ---------------------------------------------------------------------------
function apiKey(): string | undefined {
  return process.env.YOUTUBE_API_KEY || process.env.YT_API_KEY || undefined;
}

interface ApiThumb { url: string }
interface ApiPlaylistItem {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, ApiThumb>;
  };
}

async function fetchPlaylistViaApi(playlistId: string, key: string): Promise<PlaylistFeed> {
  const videos: PlaylistVideo[] = [];
  let pageToken = "";
  // up to 2 pages (100 videos) — plenty for the UI, keeps quota low
  for (let page = 0; page < 2; page++) {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50` +
      `&playlistId=${encodeURIComponent(playlistId)}&key=${key}` +
      (pageToken ? `&pageToken=${pageToken}` : "");
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`YouTube API playlist ${playlistId} failed: ${res.status}`);
    const json = (await res.json()) as { items?: ApiPlaylistItem[]; nextPageToken?: string };
    for (const it of json.items ?? []) {
      const vid = it.snippet?.resourceId?.videoId;
      if (!vid) continue;
      videos.push({
        id: vid,
        title: (it.snippet?.title ?? "").trim(),
        url: `https://www.youtube.com/watch?v=${vid}`,
        thumbnail: youtubeThumbnail(vid),
        published: it.snippet?.publishedAt ?? "",
      });
    }
    if (!json.nextPageToken) break;
    pageToken = json.nextPageToken;
  }
  return { playlistId, title: playlistId, videos };
}

// ---------------------------------------------------------------------------
// Public API of this module
// ---------------------------------------------------------------------------
export async function fetchPlaylistFeed(playlistId: string): Promise<PlaylistFeed> {
  const key = apiKey();
  if (key) {
    try {
      return await fetchPlaylistViaApi(playlistId, key);
    } catch {
      /* fall back to RSS below */
    }
  }
  const xml = await fetchText(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
  );
  const { title, videos } = parseFeed(xml, playlistId);
  return { playlistId, title, videos };
}

/** Latest uploads straight from the channel (independent of any playlist). */
export async function fetchChannelFeed(channelId: string): Promise<PlaylistFeed> {
  const xml = await fetchText(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  );
  const { title, videos } = parseFeed(xml, channelId);
  return { playlistId: `channel:${channelId}`, title, videos };
}

export async function fetchAllPlaylists(
  playlistIds: string[]
): Promise<Record<string, PlaylistFeed>> {
  const results = await Promise.allSettled(playlistIds.map(fetchPlaylistFeed));
  const out: Record<string, PlaylistFeed> = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") out[playlistIds[i]] = r.value;
  });
  return out;
}
