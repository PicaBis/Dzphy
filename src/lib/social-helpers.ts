/**
 * Social Media Helper Functions
 * Utility functions for fetching and managing social media content
 */

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
 * Fetch latest social media posts from the API
 * Returns both TikTok and Instagram posts
 */
export async function fetchLatestSocialPosts(): Promise<SocialPost[]> {
  try {
    const response = await fetch("/api/social/latest", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch latest social posts:", error);
    return [];
  }
}

/**
 * Fetch social media posts filtered by platform
 */
export async function fetchSocialPostsByPlatform(
  platform: "tiktok" | "instagram"
): Promise<SocialPost[]> {
  try {
    const response = await fetch(`/api/social?platform=${platform}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error(`Failed to fetch ${platform} posts:`, error);
    return [];
  }
}

/**
 * Get all social posts (both platforms combined)
 */
export async function fetchAllSocialPosts(): Promise<SocialPost[]> {
  try {
    const response = await fetch("/api/social", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch all social posts:", error);
    return [];
  }
}

/**
 * Get posts from a specific platform with limit
 */
export async function fetchSocialPostsWithLimit(
  platform: "tiktok" | "instagram",
  limit: number = 6
): Promise<SocialPost[]> {
  const posts = await fetchSocialPostsByPlatform(platform);
  return posts.slice(0, limit);
}

/**
 * Get mixed posts from both platforms
 */
export async function fetchMixedSocialPosts(
  tiktokLimit: number = 3,
  instagramLimit: number = 3
): Promise<SocialPost[]> {
  try {
    const [tiktok, instagram] = await Promise.all([
      fetchSocialPostsWithLimit("tiktok", tiktokLimit),
      fetchSocialPostsWithLimit("instagram", instagramLimit),
    ]);

    // Interleave the posts for better display
    const mixed: SocialPost[] = [];
    const maxLength = Math.max(tiktok.length, instagram.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < tiktok.length) mixed.push(tiktok[i]);
      if (i < instagram.length) mixed.push(instagram[i]);
    }

    return mixed;
  } catch (error) {
    console.error("Failed to fetch mixed social posts:", error);
    return [];
  }
}

/**
 * Get the platform color gradient
 */
export function getPlatformGradient(platform: "tiktok" | "instagram"): string {
  if (platform === "tiktok") {
    return "from-gray-800 to-black";
  }
  return "from-fuchsia-500 via-pink-500 to-orange-400";
}

/**
 * Get the platform label in Arabic
 */
export function getPlatformLabel(platform: "tiktok" | "instagram"): string {
  if (platform === "tiktok") {
    return "تيك توك";
  }
  return "إنستغرام";
}
