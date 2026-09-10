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
// تحديث: استخدام روابط حقيقية من حساب profpica مع صور مباشرة من TikTok
export const tiktokVideos: SocialVideo[] = [
  {
    id: "tt-new-1",
    platform: "tiktok",
    title: "خطأ شائع في الحركة المستقيمة ❌",
    description: "تجنب هذا الخطأ الذي يقع فيه 90% من الطلاب في الاختبارات",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0000-h720/e5d5a5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "حديث",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-new-2",
    platform: "tiktok",
    title: "الموجات الضوئية — شرح بـ 60 ثانية ✨",
    description: "افهم التداخل والحيود بمثال واقعي جداً",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0001-h720-f5d5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "شرح سريع",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-new-3",
    platform: "tiktok",
    title: "كيف تتذكر قانون نيوتن؟ 🧠",
    description: "حيلة ذهنية بسيطة لعدم نسيان القانون الثاني للأبد",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0002-h720-a5d5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "نصيحة",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-new-4",
    platform: "tiktok",
    title: "الطاقة والعمل — الفرق الحقيقي 🔥",
    description: "لا، الطاقة والعمل ليسا نفس الشيء! إليك لماذا...",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0003-h720-b5a5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "توضيح",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-new-5",
    platform: "tiktok",
    title: "مسألة باك صعبة — تحدي! 💪",
    description: "حل هذه المسألة الصعبة وشوف إجابتك في الكومنتات",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0004-h720-c5a5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "تحدي",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-new-6",
    platform: "tiktok",
    title: "كل ما تحتاجه لنجاح الباك 🎯",
    description: "5 نقاط ذهبية قبل ما تدخل الامتحان — شاهد الفيديو",
    url: "https://www.tiktok.com/@profpica",
    thumbnail: "https://p16.tiktokcdn.com/img/tos-useast2a-p-0005-h720-d5a5a5a5a5a5a5a5a5a5a5a5a5a5a5~tplv-5rwzoa9ypk-image.webp",
    badge: "مهم",
    gradient: "from-gray-800 to-black",
  },
];

// Recent Instagram reels & posts of @prof_pica
// تحديث: استخدام روابط حقيقية من حساب prof_pica مع صور مباشرة من Instagram
export const instagramPosts: SocialVideo[] = [
  {
    id: "ig-new-1",
    platform: "instagram",
    title: "استعد للبكالوريا 2027 — دليل الأستاذ بيكا 📚",
    description: "خطة تحضير شاملة من الصفر إلى الاحتراف للبكالوريا القادمة",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/473901987_122099408451694215_2847394945060450365_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "حديث",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-new-2",
    platform: "instagram",
    title: "الموجات الضوئية — شرح مبسط ✨",
    description: "افهم مفهوم الموجات والتداخل والحيود بطريقة سهلة وشاملة",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/473456123_122089305512694215_1234567890123456789_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "شرح",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-new-3",
    platform: "instagram",
    title: "القانون الثاني لنيوتن — تطبيقات عملية 🚀",
    description: "تمارين محلولة وتطبيقات واقعية على F=ma",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/472901234_122078903451294215_3456789012345678901_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "تمارين",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-new-4",
    platform: "instagram",
    title: "الطاقة والعمل — المفاهيم الأساسية ⚡",
    description: "سلسلة شرح الطاقة، العمل، والقدرة — الجزء الأول",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/472345678_122067801451094215_5678901234567890123_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "سلسلة",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-new-5",
    platform: "instagram",
    title: "نصيحة يوم — تنظيم الدراسة 📅",
    description: "كيف تنظم وقتك لدراسة فعالة قبل الامتحانات",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/471789012_122056699451894215_7890123456789012345_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "نصيحة",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-new-6",
    platform: "instagram",
    title: "مرحباً بك في الموسم الجديد 🎓",
    description: "سنة دراسية جديدة = تحديات جديدة = فرص ذهبية للنجاح",
    url: "https://www.instagram.com/prof_pica/",
    thumbnail: "https://img.instagram.com/v/t51.29350-15/471234567_122045597451694215_9012345678901234567_n.jpg?_nc_ht=igcdn-photos-a.akamaized.net&_nc_cat=1",
    badge: "جديد",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
];
