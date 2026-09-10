// ============================================================================
// DzPhy — Social media content (TikTok + Instagram) of الأستاذ بيكا
// ----------------------------------------------------------------------------
// كل بوست له:
//   • url       → الرابط المباشر للبوست نفسه (يفتح الفيديو/الريل تحديداً)
//   • thumbnail → صورة غلاف محلية من /public/social (لا تنتهي صلاحيتها أبداً)
//
// ⚠️ ملاحظة: الروابط حالياً تشير إلى صفحة الحساب مؤقتاً.
// عند توفّر الرابط المباشر لكل فيديو/ريل يُستبدل حقل url فقط —
// مثال تكتوك:  https://www.tiktok.com/@profpica/video/7412345678901234567
// مثال انستغرام: https://www.instagram.com/reel/XXXXXXXXXX/
// وسيقوم النظام تلقائياً بجلب العنوان والغلاف الحقيقي عبر oEmbed.
// ============================================================================

export interface SocialVideo {
  id: string;
  platform: "tiktok" | "instagram";
  title: string;
  description: string;
  /** الرابط المباشر للبوست — يفتح الفيديو/الريل نفسه وليس صفحة الحساب */
  url: string;
  /** Local thumbnail in /public/social */
  thumbnail: string;
  /** Badge shown on the card */
  badge: string;
  gradient: string;
}

export const TIKTOK_PROFILE = "https://www.tiktok.com/@profpica";
export const INSTAGRAM_PROFILE = "https://www.instagram.com/prof_pica/";

// فيديوهات تكتوك @profpica — الأغلفة محلية والرابط لكل فيديو على حدة
export const tiktokVideos: SocialVideo[] = [
  {
    id: "tt-1",
    platform: "tiktok",
    title: "طريقة الحصول على 20/20 في الفيزياء",
    description: "نصائح ذهبية للتنقيط العالي في اختبارات الفيزياء",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_20of20.jpg",
    badge: "تنقيط",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-2",
    platform: "tiktok",
    title: "تفاعلات كيميائية سريعة",
    description: "شرح سريع ومبسط لتفاعلات كيميائية أساسية",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_chemical.jpg",
    badge: "كيمياء",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-3",
    platform: "tiktok",
    title: "تهنئة بالنجاح والتفوق",
    description: "مبارك النجاح لجميع الطلبة — فرحة النتائج",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_congrats.jpg",
    badge: "تهنئة",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-4",
    platform: "tiktok",
    title: "المشتقة — شرح في دقيقة",
    description: "فهم المشتقة وتطبيقاتها في الفيزياء بسرعة",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_derivative.jpg",
    badge: "شرح",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-5",
    platform: "tiktok",
    title: "قنوات التلغرام — ملفات PDF",
    description: "انضم لقنوات التلغرام: ملخصات وتمارين ومواضيع جاهزة",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_telegram.jpg",
    badge: "ملفات",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "tt-6",
    platform: "tiktok",
    title: "التوجيه الجامعي — ما بعد الباك",
    description: "نصائح لاختيار التخصص والجامعة المناسبة",
    url: TIKTOK_PROFILE, // TODO: استبدل برابط الفيديو المباشر
    thumbnail: "/social/tt_university.jpg",
    badge: "توجيه",
    gradient: "from-gray-800 to-black",
  },
];

// منشورات وريلز انستغرام @prof_pica — الأغلفة محلية والرابط لكل منشور على حدة
export const instagramPosts: SocialVideo[] = [
  {
    id: "ig-1",
    platform: "instagram",
    title: "ملخص جديد — أغسطس",
    description: "ملخص مرئي لقوانين أساسية في الفيزياء",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_aug2.jpg",
    badge: "ملخص",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-2",
    platform: "instagram",
    title: "ساعة كاسيو للاختبارات",
    description: "الأداة المسموح بها في الامتحانات — اخترها بذكاء",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_casio.jpg",
    badge: "نصيحة",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-3",
    platform: "instagram",
    title: "تحفيز نحو التفوق",
    description: "كلمة تدفعك نحو المراجعة الجادة اليوم",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_motivation.jpg",
    badge: "تحفيز",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-4",
    platform: "instagram",
    title: "منشور — 6 أوت",
    description: "منشور تعليمي جديد من صفحة الأستاذ بيكا",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_post_aug6.jpg",
    badge: "جديد",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-5",
    platform: "instagram",
    title: "ملصق القوانين",
    description: "ملصق شامل للقوانين — احفظه بدقة",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_poster.jpg",
    badge: "قوانين",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
  {
    id: "ig-6",
    platform: "instagram",
    title: "همة وطموح",
    description: "النجاح يبدأ بإرادة قوية — واصل المسير",
    url: INSTAGRAM_PROFILE, // TODO: استبدل برابط المنشور/الريل المباشر
    thumbnail: "/social/ig_wolf.jpg",
    badge: "همة",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
  },
];
