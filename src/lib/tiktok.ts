// ============================================================================
// DzPhy — TikTok helper (official oEmbed)
// ----------------------------------------------------------------------------
// TikTok does not expose a free public "list my videos" API, so the reliable,
// allowed approach is:
//   • the canonical video URL is the single source of truth (in src/data/social)
//   • metadata (title, author, real thumbnail) is fetched live from TikTok's
//     official oEmbed endpoint: https://www.tiktok.com/oembed?url=<video_url>
//
// This guarantees every card links to the EXACT original video and shows the
// real cover. Adding a new TikTok video only requires pasting its URL — no
// per-video code edits and no guessed links.
// ============================================================================

export interface TikTokEnriched {
  id: string;
  /** canonical video url — what the card opens */
  url: string;
  videoId: string;
  /** display title (curated, clean) */
  title: string;
  /** raw caption from oEmbed (kept for data completeness) */
  oembedTitle?: string;
  authorName?: string;
  authorUrl?: string;
  /** preferred cover: live oEmbed cover, else the local /public/social image */
  thumbnail: string;
  /** reliable local cover used as an <img> onError fallback */
  localThumb: string;
  /** true when oEmbed confirmed the url resolves to a real, public video */
  verified: boolean;
}

/** Extract the numeric video id from any TikTok video url form. */
export function extractTikTokId(url: string): string {
  const m = url.match(/\/video\/(\d+)/) || url.match(/[?&]video_id=(\d+)/);
  return m ? m[1] : "";
}

/** Canonicalize a TikTok url (strip tracking query params, keep the video path). */
export function canonicalTikTokUrl(url: string, handle = "profpica"): string {
  const id = extractTikTokId(url);
  if (id) return `https://www.tiktok.com/@${handle}/video/${id}`;
  return url.split("?")[0];
}

interface OEmbedResponse {
  title?: string;
  author_name?: string;
  author_unique_id?: string;
  author_url?: string;
  thumbnail_url?: string;
}

/** Fetch official oEmbed metadata for a single TikTok video url. */
export async function fetchTikTokOembed(
  url: string
): Promise<OEmbedResponse | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      {
        headers: { "User-Agent": "DzPhy/1.0 (+https://dzphy.vercel.app)" },
        next: { revalidate: 3600 }, // 1h — titles/covers rarely change
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as OEmbedResponse;
  } catch {
    return null;
  }
}
