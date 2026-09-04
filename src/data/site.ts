// ============================================================================
// DzPhy — Central site configuration (single source of truth)
// Social channels, community groups, hero video, contact & payment info.
// Edit links here and they update across Header, Footer, and the Follow page.
// ============================================================================

export type SocialPlatform =
  | "youtube"
  | "facebook"
  | "telegram"
  | "whatsapp"
  | "tiktok"
  | "instagram"
  | "messenger"
  | "linktree";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
  description: string;
  /** tailwind gradient (used on the Follow page cards) */
  gradient: string;
  /** hover text color (used in the Footer) */
  hover: string;
}

export interface CommunityGroup {
  level: string;
  accent: string; // tailwind gradient
  channels: { platform: SocialPlatform; label: string; url: string }[];
}

// Official channels of الأستاذ بيكا (ProfPica)
export const socialLinks: SocialLink[] = [
  {
    platform: "youtube",
    label: "يوتيوب",
    handle: "@ProfPica",
    url: "https://www.youtube.com/@ProfPica",
    description: "دروس مفصلة وشروحات كاملة بالفيديو",
    gradient: "from-red-500 to-red-700",
    hover: "hover:text-red-500",
  },
  {
    platform: "facebook",
    label: "فيسبوك",
    handle: "الصفحة الرسمية",
    url: "https://www.facebook.com/share/191btmBHho/",
    description: "الصفحة الرسمية — منشورات ومستجدات يومية",
    gradient: "from-blue-600 to-blue-700",
    hover: "hover:text-blue-500",
  },
  {
    platform: "telegram",
    label: "تلغرام",
    handle: "المحفظة الشاملة",
    url: "https://t.me/addlist/zyYD4lHlYudlNzQ8",
    description: "مجلد القنوات — كل الملفات و PDF",
    gradient: "from-sky-500 to-sky-600",
    hover: "hover:text-sky-500",
  },
  {
    platform: "whatsapp",
    label: "واتساب",
    handle: "مجتمع الواتساب",
    url: "https://chat.whatsapp.com/L8AYMeLoZlIBLDYYmIxzJM",
    description: "الملفات والتحديثات المباشرة",
    gradient: "from-green-500 to-green-600",
    hover: "hover:text-green-500",
  },
  {
    platform: "tiktok",
    label: "تيك توك",
    handle: "@profpica",
    url: "https://www.tiktok.com/@profpica",
    description: "أفكار سريعة وفيديوهات قصيرة",
    gradient: "from-gray-800 to-black",
    hover: "hover:text-white",
  },
  {
    platform: "instagram",
    label: "إنستغرام",
    handle: "@prof_pica",
    url: "https://www.instagram.com/prof_pica/",
    description: "ملخصات يومية ونظام الكاروزول",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    hover: "hover:text-pink-500",
  },
];

// Level-specific chat groups (Instagram + Messenger + TikTok)
export const communityGroups: CommunityGroup[] = [
  {
    level: "قسم البكالوريا (BAC)",
    accent: "from-amber-400 to-amber-600",
    channels: [
      { platform: "instagram", label: "دردشة إنستغرام", url: "https://ig.me/j/Abad0_EOdV-2zoOc/" },
      { platform: "messenger", label: "دردشة ماسنجر", url: "https://www.facebook.com/share/p/1TGJknG72P/" },
      { platform: "tiktok", label: "دردشة تيك توك", url: "https://tiktok.me/group/ZS48kfMv3" },
    ],
  },
  {
    level: "قسم الثانوي (1AS + 2AS)",
    accent: "from-blue-500 to-blue-700",
    channels: [
      { platform: "instagram", label: "دردشة إنستغرام المشتركة", url: "https://ig.me/j/AbYfyjrDHrHA7C3K/" },
      { platform: "messenger", label: "دردشة ماسنجر المشتركة", url: "https://m.me/j/AbZE0uZCGtPb0Y3a/?send_source=gc%3Acopy_invite_link_c" },
    ],
  },
  {
    level: "قسم شهادة التعليم المتوسط (BEM)",
    accent: "from-green-500 to-green-700",
    channels: [
      { platform: "instagram", label: "دردشة إنستغرام", url: "https://ig.me/j/AbbSOE39BOzOxcTk/" },
      { platform: "messenger", label: "دردشة ماسنجر", url: "https://www.facebook.com/share/p/17hXCjNRWU/" },
    ],
  },
];

// Organized communities (files + discussions) from the Linktree tree
export const organizedCommunities: SocialLink[] = [
  {
    platform: "telegram",
    label: "منتدى الأستاذ بيكا",
    handle: "مجلد القنوات",
    url: "https://t.me/addlist/zyYD4lHlYudlNzQ8",
    description: "المنتدى المنظم — ملفات و نقاشات لكل المستويات",
    gradient: "from-sky-500 to-sky-600",
    hover: "hover:text-sky-500",
  },
  {
    platform: "messenger",
    label: "مجتمع الفيزياء",
    handle: "ماسنجر",
    url: "https://m.me/cm/Abb2d24PID2C63CA",
    description: "مجتمع الأستاذ بيكا للفيزياء على ماسنجر",
    gradient: "from-violet-500 to-purple-700",
    hover: "hover:text-violet-500",
  },
  {
    platform: "whatsapp",
    label: "مجتمع الفيزياء",
    handle: "واتساب",
    url: "https://chat.whatsapp.com/L8AYMeLoZlIBLDYYmIxzJM",
    description: "مجتمع الأستاذ بيكا للفيزياء على واتساب",
    gradient: "from-green-500 to-green-700",
    hover: "hover:text-green-500",
  },
];

export const siteConfig = {
  brand: "الأستاذ بيكا",
  linktree: "https://linktr.ee/profpica",
  /** Official YouTube channel of @ProfPica — used as the primary video source */
  youtubeChannelId: "UCjS-HtyRKuNQoHWCJyLKbAQ",
  youtubeChannelUrl: "https://www.youtube.com/@ProfPica",
  /** Official TikTok handle — new videos are added by URL only (see src/data/social.ts) */
  tiktokHandle: "profpica",
  facebookPersonal: "https://www.facebook.com/share/19Kq65FKqg/",
  // Sensitive data moved to env vars - see .env.local
  contact: {
    location: "الجزائر",
    // email and whatsapp from env vars only
  },
  /**
   * Hero video: put a valid 11-char YouTube video ID to embed it directly.
   * Leave empty ("") to show a safe click-to-watch poster that opens the
   * YouTube channel — this prevents the "This video is unavailable" error.
   */
  heroVideoId: "-5EN-AXJJZU",
};
