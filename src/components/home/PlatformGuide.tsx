"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  YouTubeIcon,
  TikTokIcon,
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/icons/SocialIcons";

// One card per platform, each answering "what will I find here?" — so a new
// student understands, in seconds, where every kind of content lives.
const platforms = [
  {
    key: "youtube",
    name: "YouTube",
    tagline: "الدروس المفصّلة",
    emoji: "🎬",
    Icon: YouTubeIcon,
    description: "الدروس الكاملة، البثوث المباشرة، حل السلاسل والمراجعات الشاملة لكل مستوى.",
    href: "https://www.youtube.com/@ProfPica",
    gradient: "from-red-500 to-rose-600",
    tint: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
  },
  {
    key: "tiktok",
    name: "TikTok",
    tagline: "أفكار سريعة",
    emoji: "⚡",
    Icon: TikTokIcon,
    description: "أفكار فيزياء سريعة، تبسيط مفهوم، أو حيلة ذكية في ثوانٍ معدودة.",
    href: "https://www.tiktok.com/@profpica",
    gradient: "from-gray-800 to-black",
    tint: "bg-gray-100 dark:bg-white/5",
    text: "text-gray-900 dark:text-white",
  },
  {
    key: "telegram",
    name: "Telegram",
    tagline: "حقيبة الملفات",
    emoji: "📚",
    Icon: TelegramIcon,
    description: "ملفات الأستاذ: PDF، سلاسل تمارين، ملخصات ومواضيع قابلة للتحميل مباشرة.",
    href: "https://t.me/addlist/zyYD4lHlYudlNzQ8",
    gradient: "from-sky-500 to-sky-600",
    tint: "bg-sky-50 dark:bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "instagram",
    name: "Instagram",
    tagline: "صور وملخصات",
    emoji: "📸",
    Icon: InstagramIcon,
    description: "صور وملخصات بصرية، قوانين ومفاهيم أساسية تُثبّت المعلومة بسرعة.",
    href: "https://www.instagram.com/prof_pica/",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    tint: "bg-pink-50 dark:bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
  },
  {
    key: "facebook",
    name: "Facebook",
    tagline: "المستجدات الرسمية",
    emoji: "📰",
    Icon: FacebookIcon,
    description: "المنشورات المهمة، الأخبار الوزارية والتنبيهات الرسمية والملخصات الشاملة.",
    href: "https://www.facebook.com/share/191btmBHho/",
    gradient: "from-blue-600 to-blue-700",
    tint: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
];

export default function PlatformGuide() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            دليل الطالب الجديد
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
            ماذا تجد في <span className="text-orange-500">كل منصة</span>؟
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            كل منصة لها وظيفة واحدة واضحة — اعرف أين تذهب وماذا ستجد في كل مكان.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {platforms.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, ease: "easeOut" }}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50 active:scale-[0.98]"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-gray-900 dark:text-white text-lg">{p.name}</h3>
                  <span className="text-base" aria-hidden>{p.emoji}</span>
                </div>
                <span className={`text-xs font-bold ${p.text} mb-2`}>{p.tagline}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {p.description}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-orange-500 transition-colors">
                  فتح المنصة <ArrowLeft size={13} />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
