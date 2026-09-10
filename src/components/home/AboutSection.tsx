"use client";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import ZoomableImage from "@/components/ui/ZoomableImage";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/191btmBHho/", color: "hover:bg-blue-600" },
  { label: "YouTube", href: "https://www.youtube.com/@ProfPica", color: "hover:bg-red-600" },
  { label: "Instagram", href: "https://www.instagram.com/prof_pica/", color: "hover:bg-pink-600" },
  { label: "TikTok", href: "https://www.tiktok.com/@profpica", color: "hover:bg-gray-900" },
  { label: "Telegram", href: "https://t.me/addlist/zyYD4lHlYudlNzQ8", color: "hover:bg-sky-600" },
];

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <section className="py-14 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/25 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-sm">
            {t("ab.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t("ab.t1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{t("ab.t2")}</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-7 sm:p-9 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-orange-400 dark:hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="relative">
                <ZoomableImage
                  src="/about/cv.png"
                  alt={t("ab.cvAlt")}
                  width={440}
                  height={620}
                  sizes="(max-width: 640px) 288px, (max-width: 768px) 340px, 380px"
                  className="w-72 h-[26rem] sm:w-[21rem] sm:h-[30rem] rounded-2xl overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 shadow-2xl"
                  imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <p className="mt-3 text-center text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {t("ab.zoom")}
                </p>
                <div className="absolute top-2 -right-3 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                  <Award size={20} className="text-white" />
                </div>
              </div>

              <div className="space-y-3 text-right w-full">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white text-center">
                  {t("ab.edu")}
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-bold text-center text-base sm:text-lg">
                  {t("ab.tagline")}
                </p>
                <div className="bg-gradient-to-b from-orange-50 to-orange-100/50 dark:from-orange-500/15 dark:to-orange-500/10 rounded-2xl p-6 text-center space-y-3 border-2 border-orange-100 dark:border-orange-500/20 shadow-sm">
                  <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                    {t("ab.item1")}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                    {t("ab.item2")}
                  </p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                    {t("ab.item3")}
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  {t("ab.follow")}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-bold rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:text-white transition-all shadow-sm hover:shadow-md ${s.color}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 rounded-2xl p-7 sm:p-8 text-white mt-6 sm:mt-8 text-center shadow-lg"
          >
            <Sparkles size={28} className="mx-auto mb-4" />
            <h4 className="font-black text-xl mb-3">{t("ab.mission")}</h4>
            <p className="text-orange-100 text-base leading-relaxed">
              {t("ab.missionDesc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
