import { NextRequest } from "next/server";
import { playlists, type PlaylistConfig } from "@/data/playlists";
import {
  fetchAllPlaylists,
  fetchChannelFeed,
  youtubeThumbnail,
  type PlaylistVideo,
} from "@/lib/youtube";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";

export interface PlaylistResponse {
  id: string;
  title: string;
  levelKey: string;
  levelLabel: string;
  stream: string;
  description: string;
  playlistId: string;
  videoId: string;
  gradient: string;
  accent: string;
  badge: string;
  playlistUrl: string;
  videos: PlaylistVideo[];
}

export async function GET(request: NextRequest) {
  const level = request.nextUrl.searchParams.get("level");

  // Curated playlists (level-filtered) + the channel's latest uploads.
  const [feeds, channel] = await Promise.all([
    fetchAllPlaylists(playlists.map((p) => p.playlistId)),
    fetchChannelFeed(siteConfig.youtubeChannelId).catch(() => null),
  ]);

  // IMPORTANT: every curated playlist is ALWAYS returned, even when its RSS
  // feed momentarily fails (YouTube playlist feeds are rate-limited and flaky).
  // Dropping playlists with 0 fetched videos was the root cause of "only one or
  // two playlists show up / they change on refresh". A curated playlist always
  // has a cover + a real "open on YouTube" link, so it stays useful with 0
  // live videos. Playlists that DID load videos are surfaced first.
  const data: PlaylistResponse[] = playlists
    .filter((p: PlaylistConfig) => !level || p.levelKey === level)
    .map((p) => ({
      id: p.id,
      title: p.title,
      levelKey: p.levelKey,
      levelLabel: p.levelLabel,
      stream: p.stream,
      description: p.description,
      playlistId: p.playlistId,
      videoId: p.videoId,
      gradient: p.gradient,
      accent: p.accent,
      badge: p.badge,
      playlistUrl: `https://www.youtube.com/playlist?list=${p.playlistId}`,
      videos: feeds[p.playlistId]?.videos ?? [],
    }))
    // Stable order: playlists with live videos first, otherwise keep curated order.
    .sort((a, b) => Number(b.videos.length > 0) - Number(a.videos.length > 0));

  // Channel uploads appear as a "latest videos" section (all levels view only),
  // so anything newly uploaded to the channel shows up automatically — even
  // before it's added to a curated playlist. Every video keeps a real cover.
  if (!level && channel && channel.videos.length > 0) {
    data.unshift({
      id: "channel-latest",
      title: "أحدث الفيديوهات من القناة",
      levelKey: "general",
      levelLabel: "القناة",
      stream: "كل المستويات",
      description:
        "آخر ما نُشر على قناة الأستاذ بيكا على يوتيوب — يُحدَّث تلقائيًا مع كل فيديو جديد.",
      playlistId: channel.playlistId,
      videoId: channel.videos[0]?.id ?? "",
      gradient: "from-red-500 to-rose-600",
      accent: "text-red-500",
      badge: "جديد",
      playlistUrl: siteConfig.youtubeChannelUrl,
      videos: channel.videos.map((v) => ({
        ...v,
        thumbnail: v.thumbnail || youtubeThumbnail(v.id),
      })),
    });
  }

  return Response.json(data);
}
