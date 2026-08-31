import { tiktokVideos } from "@/data/social";
import { siteConfig } from "@/data/site";
import {
  canonicalTikTokUrl,
  extractTikTokId,
  fetchTikTokOembed,
  type TikTokEnriched,
} from "@/lib/tiktok";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

// Returns the curated TikTok videos, each enriched live from TikTok's official
// oEmbed endpoint so the title/cover are real and every link is verified to
// resolve to the exact original video. Falls back to the curated data when
// oEmbed is unavailable, so the section never breaks.
export async function GET() {
  const handle = siteConfig.tiktokHandle || "profpica";

  const enriched: TikTokEnriched[] = await Promise.all(
    tiktokVideos.map(async (v) => {
      const url = canonicalTikTokUrl(v.url, handle);
      const videoId = extractTikTokId(url);
      const oembed = await fetchTikTokOembed(url);
      return {
        id: v.id,
        url,
        videoId,
        // Keep the clean curated title for display; store the raw caption too.
        title: v.title,
        oembedTitle: oembed?.title?.trim(),
        authorName: oembed?.author_name,
        authorUrl: oembed?.author_url,
        thumbnail: oembed?.thumbnail_url || v.thumbnail,
        localThumb: v.thumbnail,
        verified: Boolean(oembed),
      };
    })
  );

  return Response.json(enriched);
}
