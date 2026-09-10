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

async function fetchYouTubeStats(): Promise<SocialStats["youtube"]> {
  try {
    const channelId = siteConfig.youtubeChannelId;
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return { subscribers: 0, videos: 0, views: 0 };

    const text = await res.text();
    const videoMatches = text.match(/<yt:statistics/g);
    const videos = videoMatches ? videoMatches.length : 0;

    // Extract view count from entry statistics
    let totalViews = 0;
    const viewMatches = text.match(/viewCount="(\d+)"/g);
    if (viewMatches) {
      viewMatches.forEach((match) => {
        const num = parseInt(match.replace(/viewCount="|"/g, ""));
        if (!isNaN(num)) totalViews += num;
      });
    }

    return { subscribers: 0, videos, views: totalViews };
  } catch {
    return { subscribers: 0, videos: 0, views: 0 };
  }
}

async function fetchTikTokStats(): Promise<SocialStats["tiktok"]> {
  // TikTok doesn't have a public API for stats
  // Return estimated values based on manual updates
  return { followers: 0, likes: 0, videos: 0 };
}

async function fetchInstagramStats(): Promise<SocialStats["instagram"]> {
  // Instagram doesn't have a public API without business account
  return { followers: 0, posts: 0 };
}

async function fetchFacebookStats(): Promise<SocialStats["facebook"]> {
  // Facebook requires Graph API token
  return { likes: 0, followers: 0 };
}

async function fetchTelegramStats(): Promise<SocialStats["telegram"]> {
  // Telegram doesn't have a public API for group stats
  return { members: 0 };
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
