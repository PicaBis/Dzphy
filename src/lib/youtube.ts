// ============================================================================
// DzPhy — YouTube playlist RSS fetcher
// Pulls the latest videos of a YouTube playlist via its public RSS feed
// (https://www.youtube.com/feeds/videos.xml?playlist_id=...) — no API key
// required. Because it's fetched live, new videos added to the playlist on
// YouTube show up on the site automatically.
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

const FEED_URL = (playlistId: string) =>
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;

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
  while (true) {
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

function formatViews(n?: string): string | undefined {
  if (!n) return undefined;
  const v = parseInt(n, 10);
  if (Number.isNaN(v)) return undefined;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return `${v}`;
}

export async function fetchPlaylistFeed(playlistId: string): Promise<PlaylistFeed> {
  const res = await fetch(FEED_URL(playlistId), {
    headers: { "User-Agent": "DzPhy/1.0" },
    next: { revalidate: 900 },
  });
  if (!res.ok) throw new Error(`YouTube feed ${playlistId} failed: ${res.status}`);

  const xml = await res.text();
  const title = unescape(extractFirst(xml, "<title>", "</title>") ?? playlistId).trim();

  const videos: PlaylistVideo[] = extractAll(xml, "<entry>", "</entry>").map((entry) => {
    const id = extractFirst(entry, "<yt:videoId>", "</yt:videoId>") ?? "";
    const videoTitle = unescape(extractFirst(entry, "<title>", "</title>") ?? "").trim();
    const url = extractAttr(entry, 'href="https://www.youtube.com/watch?v=');
    const thumb = extractAttr(entry, "url=");
    const published = extractFirst(entry, "<published>", "</published>") ?? "";
    const stats = extractFirst(entry, "<media:statistics", "/>") ?? "";
    const views = formatViews(extractAttr(stats, "views"));

    return {
      id,
      title: videoTitle,
      url: url ? url.split("&")[0] : `https://www.youtube.com/watch?v=${id}`,
      thumbnail: thumb?.replace("i2.ytimg.com", "i.ytimg.com").replace("/hqdefault.jpg", "/mqdefault.jpg") ?? "",
      published,
      views,
    };
  });

  return { playlistId, title, videos };
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
