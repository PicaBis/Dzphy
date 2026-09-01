// ============================================================================
// DzPhy — Academic levels: single source of truth
// ----------------------------------------------------------------------------
// Fixed visual identity per level (color system) + canonical names + aliases.
// Every place that shows a level (home cards, grade pages, videos, search,
// distributions) reads from here so colors never drift between pages and the
// same level is never shown twice under a different name.
//
// COLOR SYSTEM (fixed):
//   السنة الأولى ثانوي  → أزرق  (blue)
//   السنة الثانية ثانوي → أزرق  (blue)
//   السنة الثالثة ثانوي / BAC → أصفر (amber)
//   السنة الرابعة متوسط / BEM → أخضر (green)
//
// Tailwind class strings are written out in full so the compiler keeps them.
// ============================================================================

export type LevelKey = "1as" | "2as" | "3as" | "bem";
export type LevelColor = "blue" | "amber" | "green";

export interface LevelTheme {
  key: LevelKey;
  /** dynamic route segment for /grade/[grade] */
  gradeParam: string;
  /** canonical Arabic name shown everywhere */
  title: string;
  /** short code / badge (1AS, 2AS, BAC, BEM) */
  badge: string;
  /** playlists level key used by /videos and /api */
  videoLevel: string;
  /** short one-line description */
  description: string;
  /** subject chips shown on the card */
  topics: string[];
  color: LevelColor;
  /** hub link for the level */
  href: string;
  /** extra search terms that must resolve to THIS level (dedup: BAC→3as, BEM→4am) */
  aliases: string[];

  // ---- Tailwind class tokens (static so the compiler keeps them) ----
  gradient: string; // header / hero gradient
  solid: string; // solid button bg + hover
  soft: string; // soft tint background
  text: string; // accent text color
  border: string; // accent border
  ring: string; // focus / outline ring color
  chip: string; // subject chip bg+text
  glow: string; // colored shadow on hover
}

export const LEVELS: LevelTheme[] = [
  {
    key: "1as",
    gradeParam: "1",
    title: "السنة الأولى ثانوي",
    badge: "1AS",
    videoLevel: "1as",
    description: "أسس الفيزياء والكيمياء — الميكانيكا، الكهرباء والمادة.",
    topics: ["الميكانيكا", "الكهرباء", "الكيمياء"],
    color: "blue",
    href: "/grade/1",
    aliases: ["1as", "اولى ثانوي", "الأولى ثانوي", "أولى ثانوي", "الجذع المشترك", "1 ثانوي"],
    gradient: "from-blue-500 to-blue-700",
    solid: "bg-blue-600 hover:bg-blue-700",
    soft: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-500/30",
    ring: "ring-blue-500",
    chip: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300",
    glow: "hover:shadow-blue-500/20",
  },
  {
    key: "2as",
    gradeParam: "2",
    title: "السنة الثانية ثانوي",
    badge: "2AS",
    videoLevel: "2as",
    description: "قوانين نيوتن، الطاقة، الدوائر الكهربائية والتفاعلات.",
    topics: ["قوانين نيوتن", "الطاقة", "الكهرباء"],
    color: "blue",
    href: "/grade/2",
    aliases: ["2as", "ثانية ثانوي", "الثانية ثانوي", "2 ثانوي"],
    gradient: "from-sky-500 to-blue-700",
    solid: "bg-sky-600 hover:bg-sky-700",
    soft: "bg-sky-50 dark:bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-500/30",
    ring: "ring-sky-500",
    chip: "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300",
    glow: "hover:shadow-sky-500/20",
  },
  {
    key: "3as",
    gradeParam: "3",
    title: "السنة الثالثة ثانوي",
    badge: "BAC",
    videoLevel: "3as",
    description: "الإعداد للباكالوريا — الموجات، الميكانيكا والكيمياء المتقدمة.",
    topics: ["الموجات", "النووي", "الباكالوريا"],
    color: "amber",
    href: "/grade/3",
    aliases: ["bac", "3as", "باك", "باكالوريا", "الباكالوريا", "ثالثة ثانوي", "الثالثة ثانوي", "3 ثانوي"],
    gradient: "from-amber-400 to-yellow-600",
    solid: "bg-amber-500 hover:bg-amber-600",
    soft: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/30",
    ring: "ring-amber-500",
    chip: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300",
    glow: "hover:shadow-amber-500/20",
  },
  {
    key: "bem",
    gradeParam: "4",
    title: "السنة الرابعة متوسط",
    badge: "BEM",
    videoLevel: "bem",
    description: "التحضير لشهادة التعليم المتوسط — الوحدات، القياس والتحويلات.",
    topics: ["الكهرباء", "الميكانيكا", "المادة"],
    color: "green",
    href: "/grade/4",
    aliases: ["bem", "شهادة التعليم المتوسط", "رابعة متوسط", "الرابعة متوسط", "4 متوسط", "4am", "المتوسط"],
    gradient: "from-green-500 to-emerald-700",
    solid: "bg-green-600 hover:bg-green-700",
    soft: "bg-green-50 dark:bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-500/30",
    ring: "ring-green-500",
    chip: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300",
    glow: "hover:shadow-green-500/20",
  },
];

// ---- Lookups -------------------------------------------------------------
export const levelByGradeParam: Record<string, LevelTheme> = Object.fromEntries(
  LEVELS.map((l) => [l.gradeParam, l])
);

export const levelByKey: Record<LevelKey, LevelTheme> = Object.fromEntries(
  LEVELS.map((l) => [l.key, l])
) as Record<LevelKey, LevelTheme>;

/** Canonical distribution-level label (matches src/data/distributions.ts) */
export const levelToDistributionLabel: Record<LevelKey, string> = {
  "1as": "السنة الأولى ثانوي",
  "2as": "السنة الثانية ثانوي",
  "3as": "السنة الثالثة ثانوي",
  bem: "شهادة التعليم المتوسط (BEM)",
};

export function getLevelByGradeParam(grade: string): LevelTheme | undefined {
  return levelByGradeParam[grade];
}
