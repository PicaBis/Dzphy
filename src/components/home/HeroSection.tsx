"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, PlayCircle, Play } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";

const youtubeUrl = socialLinks.find((s) => s.platform === "youtube")?.url || "https://www.youtube.com/@ProfPica";
const isValidVideoId = (id: string) => /^[A-Za-z0-9_-]{11}$/.test(id);

export default function HeroSection() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-white dark:bg-gray-950 pt-14 sm:pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100 dark:bg-orange-500/10 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-50 dark:bg-orange-500/5 rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-5 sm:mb-6"
            >
              {t("hero.title1")}{" "}
              <span className="text-orange-500 relative">
                {t("hero.title2")}
                <svg className="absolute -bottom-2 right-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 3 150 3 298 8" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {t("hero.title3")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              {t("hero.desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-orange-200 dark:shadow-orange-500/20 hover:shadow-orange-300 dark:hover:shadow-orange-500/30 hover:scale-105 active:scale-95 border-2 border-orange-600"
              >
                {t("hero.watch")}
                <Arrow size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-500 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 bg-white dark:bg-gray-900 px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all duration-200 hover:bg-orange-50 dark:hover:bg-orange-500/10"
              >
                <PlayCircle size={18} className="text-orange-500" />
                {t("hero.courses")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-video bg-gray-900">
              {isValidVideoId(siteConfig.heroVideoId) ? (
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube-nocookie.com/embed/${siteConfig.heroVideoId}?rel=0&modestbranding=1`}
                  title={t("hero.videoTitleAttr")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Safe poster: opens the YouTube channel — no "video unavailable" error */
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.watchAria")}
                  className="group absolute inset-0 block"
                >
                  <Image
                    src="/about/teacher.jpg"
                    alt={t("hero.posterAlt")}
                    width={640}
                    height={360}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className="w-20 h-20 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-2xl shadow-red-900/40 transition-all group-hover:scale-110">
                      <Play size={32} className="text-white ms-1" fill="currentColor" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-center">
                    <p className="text-white font-black text-lg">{t("hero.videoTitle")}</p>
                    <p className="text-white/70 text-sm">{t("hero.videoSub")}</p>
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
