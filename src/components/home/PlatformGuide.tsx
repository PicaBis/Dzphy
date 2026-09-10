"use client";
import { motion } from "framer-motion";
import {
  YouTubeIcon,
  TikTokIcon,
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/icons/SocialIcons";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

// One card per platform, each answering "what will I find here?" — so a new
// student understands, in seconds, where every kind of content lives.
const platforms = [
  {
    key: "youtube",
    name: "YouTube",
    taglineKey: "youtube.tagline",
    Icon: YouTubeIcon,
    descriptionKey: "youtube.desc",
    href: "https://www.youtube.com/@ProfPica",
    gradient: "from-red-500 to-rose-600",
    tint: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
  },
  {
    key: "tiktok",
    name: "TikTok",
    taglineKey: "tiktok.tagline",
    Icon: TikTokIcon,
    descriptionKey: "tiktok.desc",
    href: "https://www.tiktok.com/@profpica",
    gradient: "from-gray-800 to-black",
    tint: "bg-gray-100 dark:bg-white/5",
    text: "text-gray-900 dark:text-white",
  },
  {
    key: "telegram",
    name: "Telegram",
    taglineKey: "telegram.tagline",
    Icon: TelegramIcon,
    descriptionKey: "telegram.desc",
    href: "https://t.me/addlist/zyYD4lHlYudlNzQ8",
    gradient: "from-sky-500 to-sky-600",
    tint: "bg-sky-50 dark:bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "instagram",
    name: "Instagram",
    taglineKey: "instagram.tagline",
    Icon: InstagramIcon,
    descriptionKey: "instagram.desc",
    href: "https://www.instagram.com/prof_pica/",
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    tint: "bg-pink-50 dark:bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
  },
  {
    key: "facebook",
    name: "Facebook",
    taglineKey: "facebook.tagline",
    Icon: FacebookIcon,
    descriptionKey: "facebook.desc",
    href: "https://www.facebook.com/share/191btmBHho/",
    gradient: "from-blue-600 to-blue-700",
    tint: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
];

export default function PlatformGuide() {
  const { t } = useLanguage();
  return (
    <section className="py-14 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/25 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-sm">
            {t("pg.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t("pg.t1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{t("pg.t2")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
            {t("pg.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
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
                className="group flex flex-col bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg hover:border-orange-400 dark:hover:border-orange-500/60 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50 active:scale-[0.98]"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-120 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-black text-gray-900 dark:text-white text-lg">{p.name}</h3>
                </div>
                <span className={`text-xs font-bold ${p.text} mb-3`}>{t(p.taglineKey)}</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                  {t(p.descriptionKey)}
                </p>
                <span className="inline-flex items-center gap-2 mt-5 text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {t("pg.open")} <DirectionArrow size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
