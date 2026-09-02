// ============================================================================
// DzPhy — Official YouTube playlists (قوائم التشغيل)
// Single source of truth for the video playlists shown on /videos and in the
// homepage VideosSection. Videos are fetched live from YouTube's public RSS
// feeds (no API key needed) so anything added to a playlist on YouTube appears
// on the site automatically.
// ============================================================================

// NOTE: "الرابعة متوسط" and "BEM" are the SAME level. They are unified under a
// single key `bem` so the site never shows two separate sections for it.
export type PlaylistLevelKey =
  | "1as"
  | "2as"
  | "3as"
  | "bac"
  | "bem"
  | "general";

export interface PlaylistConfig {
  id: string;
  title: string;
  levelKey: PlaylistLevelKey;
  levelLabel: string;
  stream: string;
  description: string;
  playlistId: string;
  /** representative video id used for the playlist cover thumbnail */
  videoId: string;
  gradient: string; // tailwind gradient
  accent: string; // tailwind text color
  badge: string;
}

export const playlists: PlaylistConfig[] = [
  {
    id: "bac-skills",
    title: "المكتسبات القبلية BAC",
    levelKey: "3as",
    levelLabel: "السنة الثالثة ثانوي",
    stream: "العلوم الفيزيائية",
    description: "دورة المكتسبات القبلية لطلاب البكالوريا — مراجعة أساسيات كل وحدة قبل انطلاق العام الدراسي.",
    playlistId: "PLBnz3ydY2LlQ",
    videoId: "-5EN-AXJJZU",
    gradient: "from-amber-400 to-orange-600",
    accent: "text-amber-500",
    badge: "BAC",
  },
  {
    id: "bem-skills",
    title: "المكتسبات القبلية BEM",
    levelKey: "bem",
    levelLabel: "السنة الرابعة متوسط",
    stream: "العلوم الفيزيائية والتكنولوجيا",
    description: "دورة المكتسبات القبلية لتحضير شهادة التعليم المتوسط — الوحدات، التحويلات والقياس.",
    playlistId: "PLSWzUlE4bftk",
    videoId: "oPagkCEZsPo",
    gradient: "from-green-400 to-emerald-600",
    accent: "text-green-500",
    badge: "BEM",
  },
  {
    id: "3as-lessons",
    title: "دروس السنة الثالثة ثانوي",
    levelKey: "3as",
    levelLabel: "السنة الثالثة ثانوي",
    stream: "العلوم الفيزيائية",
    description: "جميع دروس السنة الثالثة ثانوي مشروحة بالتفصيل استعدادًا لشهادة البكالوريا.",
    playlistId: "PLGRsyA_VAyBUh27KazoXi7UkRxdFIuJJW",
    videoId: "-L5lScjATK0",
    gradient: "from-amber-400 to-yellow-600",
    accent: "text-amber-500",
    badge: "3AS",
  },
  {
    id: "2as-lessons",
    title: "دروس السنة الثانية ثانوي",
    levelKey: "2as",
    levelLabel: "السنة الثانية ثانوي",
    stream: "العلوم الفيزيائية",
    description: "دروس السنة الثانية ثانوي مشروحة بطريقة مبسطة مع تمارين تطبيقية.",
    playlistId: "PLGRsyA_VAyBV_BigPtMb4dCTPf_ntJIrc",
    videoId: "bmjBZhGd9M8",
    gradient: "from-blue-500 to-indigo-700",
    accent: "text-blue-500",
    badge: "2AS",
  },
  {
    id: "1as-lessons",
    title: "دروس السنة الأولى ثانوي",
    levelKey: "1as",
    levelLabel: "السنة الأولى ثانوي",
    stream: "العلوم الفيزيائية",
    description: "دروس السنة الأولى ثانوي بأسلوب بسيط يرافق الطالب منذ البداية.",
    playlistId: "PLGRsyA_VAyBUELSMjFUjySZWj_VW78VXT",
    videoId: "hSZ6W5oE5xo",
    gradient: "from-blue-500 to-blue-700",
    accent: "text-blue-500",
    badge: "1AS",
  },
  {
    id: "4am-lessons",
    title: "دروس السنة الرابعة متوسط",
    levelKey: "bem",
    levelLabel: "السنة الرابعة متوسط",
    stream: "العلوم الفيزيائية والتكنولوجيا",
    description: "دروس الرابعة متوسط للتحضير الجيد لشهادة التعليم المتوسط.",
    playlistId: "PLEZiwx-tv7C8",
    videoId: "SMFMsBl3e8Y",
    gradient: "from-emerald-400 to-green-600",
    accent: "text-emerald-500",
    badge: "BEM",
  },
  {
    id: "courses-live",
    title: "الدورات والبثوث",
    levelKey: "general",
    levelLabel: "عام",
    stream: "كل المستويات",
    description: "تسجيلات الدورات التأسيسية والبثوث المباشرة — من الصفر إلى الاحتراف.",
    playlistId: "PLENnjsac87c8",
    videoId: "0toWJ_u6ttc",
    gradient: "from-rose-400 to-red-600",
    accent: "text-rose-500",
    badge: "دورات",
  },
  {
    id: "ideas-tricks",
    title: "أفكار وثغرات في الفيزياء",
    levelKey: "general",
    levelLabel: "عام",
    stream: "كل المستويات",
    description: "أفكارٌ وثغراتٌ لن تجدها في الكتب — الأخطاء الشائعة وكيف تتجنبها للحصول على العلامة الكاملة.",
    playlistId: "PLH8jy6bdMILQ",
    videoId: "B3lJciBRoBw",
    gradient: "from-amber-400 to-yellow-600",
    accent: "text-yellow-500",
    badge: "أفكار",
  },
];

export const levelLabels: Record<PlaylistLevelKey, string> = {
  "1as": "السنة الأولى ثانوي",
  "2as": "السنة الثانية ثانوي",
  "3as": "السنة الثالثة ثانوي",
  bac: "البكالوريا",
  bem: "السنة الرابعة متوسط",
  general: "عام",
};
