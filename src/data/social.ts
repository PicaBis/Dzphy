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
    id: "tt-20of20",
    platform: "tiktok",
    title: "طريقك نحو الـ 20/20 يبدأ من هنا! 🎓",
    description: "أسرار المكتسبات القبلية لبكالوريا 2027 — الميكانيك، الكيمياء، الطاقة والمنهجية",
    url: "https://www.tiktok.com/@profpica/video/7663056270466747665",
    thumbnail: "/social/tt_20of20.jpg",
    badge: "أهم مقطع",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-derivative",
    platform: "tiktok",
    title: "مفهوم الاشتقاق في الفيزياء 📐",
    description: "افهم الاشتقاق d/dx في الفيزياء بطريقة مبسطة — الفكرة التي لا يخبرونك بها",
    url: "https://www.tiktok.com/@profpica/video/7657689403850001684",
    thumbnail: "/social/tt_derivative.jpg",
    badge: "شرح",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-chemical",
    platform: "tiktok",
    title: "المتابعة الزمنية لتحول كيميائي ⚗️",
    description: "مراجعة شاملة للبكالوريا — المفاهيم الأساسية والعمليات الحسابية",
    url: "https://www.tiktok.com/@profpica/video/7633140673121619220",
    thumbnail: "/social/tt_chemical.jpg",
    badge: "مراجعة باك",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-university",
    platform: "tiktok",
    title: "كيف تختار تخصصك الجامعي؟ 🤔",
    description: "دليل الأستاذ بيكا لطلبة البكالوريا — جماعة لمداتوش تقدرو تعاودوه عادي",
    url: "https://www.tiktok.com/@profpica/video/7663555563409739028",
    thumbnail: "/social/tt_university.jpg",
    badge: "إرشاد",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-congrats",
    platform: "tiktok",
    title: "إلى كل من نال مراده 🎉",
    description: "هنيئاً لك — هذه أول خطوة في مشوارك الجامعي والمستقبل بين يديك",
    url: "https://www.tiktok.com/@profpica/video/7660785481734573333",
    thumbnail: "/social/tt_congrats.jpg",
    badge: "تحفيز",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-telegram",
    platform: "tiktok",
    title: "الملخصات والسلاسل والدروس 📚",
    description: "انضم لقناة التلغرام profpica للحصول على كل الملفات و PDF",
    url: "https://www.tiktok.com/@profpica/video/7635612398610664725",
    thumbnail: "/social/tt_telegram.jpg",
    badge: "قناة تلغرام",
    gradient: "from-gray-800 to-black",
  },
];

// Recent Instagram reels & posts of @prof_pica
export const instagramPosts: SocialVideo[] = [
  {
    id: "ig-casio",
    platform: "instagram",
    title: "كيفية استعمال الحاسبة CASIO fx-991ES 🧮",
    description: "شرح عملي للآلة الحاسبة — ضروري لكل تلميذ في العلوم الفيزيائية",
    url: "https://www.instagram.com/reel/DbpnOFVtwcR/",
    thumbnail: "/social/ig_casio.jpg",
    badge: "آخر ريل",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-motivation",
    platform: "instagram",
    title: "#العلوم_الفيزيائية #bac2027 #motivation 🔥",
    description: "تحفيز لطلبة البكالوريا — استعد بقوة للسنة الدراسية الجديدة",
    url: "https://www.instagram.com/reel/DaIUeL-NJl2/",
    thumbnail: "/social/ig_motivation.jpg",
    badge: "تحفيز",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-post-aug6",
    platform: "instagram",
    title: "منشور جديد من الأستاذ بيكا ✍️",
    description: "أحدث منشور على إنستغرام — تابع الصفحة لأول بأول",
    url: "https://www.instagram.com/p/DbsNJtEjcom/",
    thumbnail: "/social/ig_post_aug6.jpg",
    badge: "جديد",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-wolf",
    platform: "instagram",
    title: "الأستاذ بيكا — الهوية الجديدة 🐺",
    description: "العلامة الجديدة لمحتوى العلوم الفيزيائية",
    url: "https://www.instagram.com/p/DbpmNiAjSnQ/",
    thumbnail: "/social/ig_wolf.jpg",
    badge: "هوية",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-poster",
    platform: "instagram",
    title: "دروس الدعم لجميع المستويات 🎯",
    description: "دروس خصوصية لكل الشعب والمستويات — BAC، 2AS، 1AS و BEM",
    url: "https://www.instagram.com/p/DbqFV68DRUQ/",
    thumbnail: "/social/ig_poster.jpg",
    badge: "دعم",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-aug2",
    platform: "instagram",
    title: "منشورات يومية من الأستاذ بيكا",
    description: "ملخصات يومية ونظام الكاروزول — تابع حساب إنستغرام الرسمي",
    url: "https://www.instagram.com/p/Dbj3OOQq6sX/",
    thumbnail: "/social/ig_aug2.jpg",
    badge: "ملخصات",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
];
