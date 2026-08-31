import { NextRequest } from "next/server";
import { playlists, type PlaylistConfig } from "@/data/playlists";
import { fetchAllPlaylists, type PlaylistVideo } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 900;

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

  const feeds = await fetchAllPlaylists(playlists.map((p) => p.playlistId));

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
    .filter((p) => p.videos.length > 0);

  return Response.json(data);
}
