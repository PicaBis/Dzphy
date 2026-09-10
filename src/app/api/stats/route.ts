import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

interface SocialStats {
  youtube: {
    subscribers: number;
    videos: number;
    views: number;
  };
  tiktok: {
    followers: number;
    likes: number;
    videos: number;
  };
  instagram: {
    followers: number;
    posts: number;
  };
  facebook: {
    likes: number;
    followers: number;
  };
  telegram: {
    members: number;
  };
  total: {
    followers: number;
    views: number;
    videos: number;
  };
}

/**
 * Fetch YouTube channel statistics from public data
 * Uses RSS feed for videos count and env variables for other stats
 */
async function fetchYouTubeStats(): Promise<SocialStats["youtube"]> {
  try {
    const channelId = siteConfig.youtubeChannelId;
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });

    let videos = 0;
    let views = 0;

    if (res.ok) {
      const text = await res.text();

      // Count video entries from RSS feed
      const videoMatches = text.match(/<entry>/g);
      videos = videoMatches ? videoMatches.length : 0;

      // Extract total views from video entries
      let totalViews = 0;
      const viewMatches = text.match(/viewCount="(\d+)"/g);
      if (viewMatches) {
        viewMatches.forEach((match) => {
          const num = parseInt(match.replace(/viewCount="|"/g, ""));
          if (!isNaN(num)) totalViews += num;
        });
      }
      views = totalViews;
    }

    // YouTube subscribers from environment variable (requires manual update or API key)
    const subscribers = parseInt(process.env.YOUTUBE_SUBSCRIBERS || "8500", 10);

    return { subscribers, videos, views };
  } catch (error) {
    console.error("YouTube stats fetch error:", error);
    // Return env-based fallback values
    return {
      subscribers: parseInt(process.env.YOUTUBE_SUBSCRIBERS || "8500", 10),
      videos: parseInt(process.env.YOUTUBE_VIDEOS || "120", 10),
      views: parseInt(process.env.YOUTUBE_VIEWS || "500000", 10),
    };
  }
}

/**
 * Fetch TikTok statistics from environment variables
 * TikTok API is not publicly available without app approval
 * Stats are updated manually or via admin panel
 */
async function fetchTikTokStats(): Promise<SocialStats["tiktok"]> {
  return {
    followers: parseInt(process.env.TIKTOK_FOLLOWERS || "0", 10),
    likes: parseInt(process.env.TIKTOK_LIKES || "0", 10),
    videos: parseInt(process.env.TIKTOK_VIDEOS || "0", 10),
  };
}

/**
 * Fetch Instagram statistics from environment variables
 * Instagram Graph API requires business account and authorization
 * Stats are updated manually or via admin panel
 */
async function fetchInstagramStats(): Promise<SocialStats["instagram"]> {
  return {
    followers: parseInt(process.env.INSTAGRAM_FOLLOWERS || "0", 10),
    posts: parseInt(process.env.INSTAGRAM_POSTS || "0", 10),
  };
}

/**
 * Fetch Facebook statistics from environment variables
 * Facebook Graph API requires app token and page access
 * Stats are updated manually or via admin panel
 */
async function fetchFacebookStats(): Promise<SocialStats["facebook"]> {
  return {
    followers: parseInt(process.env.FACEBOOK_FOLLOWERS || "0", 10),
    likes: parseInt(process.env.FACEBOOK_LIKES || "0", 10),
  };
}

/**
 * Fetch Telegram channel statistics from environment variables
 * Telegram Bot API can retrieve channel info with proper authorization
 * Stats are updated manually or via admin panel
 */
async function fetchTelegramStats(): Promise<SocialStats["telegram"]> {
  return {
    members: parseInt(process.env.TELEGRAM_MEMBERS || "0", 10),
  };
}

export async function GET() {
  const [youtube, tiktok, instagram, facebook, telegram] = await Promise.all([
    fetchYouTubeStats(),
    fetchTikTokStats(),
    fetchInstagramStats(),
    fetchFacebookStats(),
    fetchTelegramStats(),
  ]);

  const stats: SocialStats = {
    youtube,
    tiktok,
    instagram,
    facebook,
    telegram,
    total: {
      followers:
        youtube.subscribers +
        tiktok.followers +
        instagram.followers +
        facebook.followers +
        telegram.members,
      views: youtube.views,
      videos: youtube.videos + tiktok.videos,
    },
  };

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
