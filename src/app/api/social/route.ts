import { NextRequest, NextResponse } from "next/server";
import { tiktokVideos, instagramPosts } from "@/data/social";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export interface SocialPost {
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
 * Fetch TikTok posts dynamically
 * Currently returns static data from data/social.ts
 * TODO: Integrate with TikTok API or Supabase for real-time updates
 */
async function fetchTiktokPosts(): Promise<SocialPost[]> {
  try {
    // In the future, fetch from Supabase or TikTok API
    // For now, return the curated static data
    return tiktokVideos;
  } catch (error) {
    console.error("TikTok fetch error:", error);
    return tiktokVideos; // Fallback to static data
  }
}

/**
 * Fetch Instagram posts dynamically
 * Currently returns static data from data/social.ts
 * TODO: Integrate with Instagram Graph API or Supabase for real-time updates
 */
async function fetchInstagramPosts(): Promise<SocialPost[]> {
  try {
    // In the future, fetch from Supabase or Instagram Graph API
    // For now, return the curated static data
    return instagramPosts;
  } catch (error) {
    console.error("Instagram fetch error:", error);
    return instagramPosts; // Fallback to static data
  }
}

export async function GET(request: NextRequest) {
  const platform = request.nextUrl.searchParams.get("platform");

  try {
    let posts: SocialPost[] = [];

    if (platform === "tiktok") {
      posts = await fetchTiktokPosts();
    } else if (platform === "instagram") {
      posts = await fetchInstagramPosts();
    } else if (!platform) {
      // Return both platforms if no filter
      const [tiktok, instagram] = await Promise.all([
        fetchTiktokPosts(),
        fetchInstagramPosts(),
      ]);
      posts = [...tiktok, ...instagram];
    } else {
      return NextResponse.json(
        { error: "Invalid platform parameter. Use 'tiktok' or 'instagram'" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        count: posts.length,
        posts,
        platforms: {
          tiktok: posts.filter((p) => p.platform === "tiktok").length,
          instagram: posts.filter((p) => p.platform === "instagram").length,
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Social API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch social posts",
        posts: [...tiktokVideos, ...instagramPosts],
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
