import { NextResponse } from "next/server";
import { tiktokVideos, instagramPosts } from "@/data/social";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export interface LatestSocialPost {
  id: string;
  platform: "tiktok" | "instagram";
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  badge: string;
  gradient: string;
}

/**
 * Get the latest social media posts from TikTok and Instagram
 * Returns the most recent posts sorted by when they appear in the arrays
 * (arrays are ordered with newest first)
 */
export async function GET() {
  try {
    // Combine and return latest posts from both platforms
    // Both arrays are already ordered with latest first
    const allPosts: LatestSocialPost[] = [
      ...tiktokVideos.slice(0, 6), // Latest 6 TikTok videos
      ...instagramPosts.slice(0, 6), // Latest 6 Instagram posts
    ];

    return NextResponse.json(
      {
        success: true,
        count: allPosts.length,
        posts: allPosts,
        tiktok: tiktokVideos.slice(0, 6),
        instagram: instagramPosts.slice(0, 6),
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Latest social posts error:", error);

    // Return fallback data
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch latest posts",
        count: tiktokVideos.length + instagramPosts.length,
        posts: [...tiktokVideos, ...instagramPosts],
        tiktok: tiktokVideos,
        instagram: instagramPosts,
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "public, s-maxage=600, stale-while-revalidate=3600",
        },
      }
    );
  }
}
