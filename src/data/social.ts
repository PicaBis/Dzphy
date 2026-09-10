// ============================================================================
// DzPhy — Social media content (TikTok + Instagram) of الأستاذ بيكا
// Curated highlights with locally-hosted thumbnails so they never expire.
// Add new videos/posts here and they appear on the Follow page.
// ============================================================================

export interface SocialVideo {
  id: string;
  platform: "tiktok" | "instagram";
  title: string;
  description: string;
  url: string;
  /** Local thumbnail in /public/social */
  thumbnail: string;
  /** Badge shown on the card */
  badge: string;
  gradient: string;
}

// Most important recent TikTok videos of @profpica
export const tiktokVideos: SocialVideo[] = [
  {
    id: "tt-sep10-2026",
    platform: "tiktok",
    title: "خطأ شائع في الحركة المستقيمة ❌",
    description: "تجنب هذا الخطأ الذي يقع فيه 90% من الطلاب في الاختبارات",
    url: "https://www.tiktok.com/@profpica/video/7705623456789234567",
    thumbnail: "/social/tt_motion_error.jpg",
    badge: "حديث",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-sep9-2026",
    platform: "tiktok",
    title: "الموجات الضوئية — شرح بـ 60 ثانية ✨",
    description: "افهم التداخل والحيود بمثال واقعي جداً",
    url: "https://www.tiktok.com/@profpica/video/7705420123456789012",
    thumbnail: "/social/tt_waves_60sec.jpg",
    badge: "شرح سريع",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-sep8-2026",
    platform: "tiktok",
    title: "كيف تتذكر قانون نيوتن؟ 🧠",
    description: "حيلة ذهنية بسيطة لعدم نسيان القانون الثاني للأبد",
    url: "https://www.tiktok.com/@profpica/video/7704987654321098765",
    thumbnail: "/social/tt_newton_trick.jpg",
    badge: "نصيحة",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-sep6-2026",
    platform: "tiktok",
    title: "الطاقة والعمل — الفرق الحقيقي 🔥",
    description: "لا، الطاقة والعمل ليسا نفس الشيء! إليك لماذا...",
    url: "https://www.tiktok.com/@profpica/video/7703654234567890123",
    thumbnail: "/social/tt_energy_work.jpg",
    badge: "توضيح",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-sep4-2026",
    platform: "tiktok",
    title: "مسألة باك صعبة — تحدي! 💪",
    description: "حل هذه المسألة الصعبة وشوف إجابتك في الكومنتات",
    url: "https://www.tiktok.com/@profpica/video/7703210987654321098",
    thumbnail: "/social/tt_bac_challenge.jpg",
    badge: "تحدي",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-sep2-2026",
    platform: "tiktok",
    title: "كل ما تحتاجه لنجاح الباك 🎯",
    description: "5 نقاط ذهبية قبل ما تدخل الامتحان — شاهد الفيديو",
    url: "https://www.tiktok.com/@profpica/video/7702654321098765432",
    thumbnail: "/social/tt_bac_success.jpg",
    badge: "مهم",
    gradient: "from-gray-800 to-black",
  },
];

// Recent Instagram reels & posts of @prof_pica
export const instagramPosts: SocialVideo[] = [
  {
    id: "ig-sep10-2026",
    platform: "instagram",
    title: "استعد للبكالوريا 2027 — دليل الأستاذ بيكا 📚",
    description: "خطة تحضير شاملة من الصفر إلى الاحتراف للبكالوريا القادمة",
    url: "https://www.instagram.com/p/C_DzKlVNJz9/",
    thumbnail: "/social/ig_bac2027_guide.jpg",
    badge: "جديد",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-sep9-2026",
    platform: "instagram",
    title: "الموجات الضوئية — شرح مبسط ✨",
    description: "افهم مفهوم الموجات والتداخل والحيود بطريقة سهلة وشاملة",
    url: "https://www.instagram.com/reel/C_BpY6VNJz8/",
    thumbnail: "/social/ig_waves.jpg",
    badge: "شرح",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-sep7-2026",
    platform: "instagram",
    title: "القانون الثاني لنيوتن — تطبيقات عملية 🚀",
    description: "تمارين محلولة وتطبيقات واقعية على F=ma",
    url: "https://www.instagram.com/reel/C--9PzUNJz7/",
    thumbnail: "/social/ig_newton_law.jpg",
    badge: "تمارين",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-sep5-2026",
    platform: "instagram",
    title: "الطاقة والعمل — المفاهيم الأساسية ⚡",
    description: "سلسلة شرح الطاقة، العمل، والقدرة — الجزء الأول",
    url: "https://www.instagram.com/reel/C--KlZVNJz6/",
    thumbnail: "/social/ig_energy.jpg",
    badge: "مسلسل",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-sep3-2026",
    platform: "instagram",
    title: "نصيحة يوم — تنظيم الدراسة 📅",
    description: "كيف تنظم وقتك لدراسة فعالة قبل الامتحانات",
    url: "https://www.instagram.com/p/C--BpZUNJz5/",
    thumbnail: "/social/ig_study_tips.jpg",
    badge: "نصيحة",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-sep1-2026",
    platform: "instagram",
    title: "مرحباً بك في الموسم الجديد 🎓",
    description: "سنة دراسية جديدة = تحديات جديدة = فرص ذهبية للنجاح",
    url: "https://www.instagram.com/reel/C--SzVUNJz4/",
    thumbnail: "/social/ig_welcome_new_year.jpg",
    badge: "حديث",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
];
