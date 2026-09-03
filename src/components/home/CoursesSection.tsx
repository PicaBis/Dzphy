"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, BarChart2, Tag, Play, Lock } from "lucide-react";
import { courses } from "@/data/content";
import { playlists } from "@/data/playlists";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

export default function CoursesSection() {
  const { t } = useLanguage();
  const freeCourses = courses.filter((c) => c.type === "free");
  const paidCourses = courses.filter((c) => c.type === "paid");

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-3">{t("cs.badge")}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{t("cs.t1")} <span className="text-orange-500">{t("cs.t2")}</span> {t("cs.t3")}</h2>
          </div>
          <Link href="/courses" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-sm border-2 border-orange-300 dark:border-orange-500/30 hover:border-orange-500 dark:hover:border-orange-500/50 px-5 py-2.5 rounded-xl transition-all hover:bg-orange-50 dark:hover:bg-orange-500/10">{t("cs.all")} <DirectionArrow size={16} /></Link>
        </motion.div>

        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-6">{t("cs.free")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {freeCourses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-500/50 card-shine transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-gray-900">
                  {course.image && course.image.startsWith("https://i.ytimg.com") ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <BookOpen size={40} className="text-white/70" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t("common.free")}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-bold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-full mb-2">{course.category}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 flex-1">{course.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                  <a
                    href="https://www.youtube.com/@ProfPica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all"
                  >
                    <Play size={14} />
                    {t("cs.watch")}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-6">{t("cs.paid")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {paidCourses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="group bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-gray-900">
                  {course.image && !course.image.startsWith("https://i.ytimg.com") ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <BookOpen size={40} className="text-white/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Tag size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-orange-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock size={10} />{course.price} {t("common.price")}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-bold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-full mb-2">{course.category}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 flex-1">{course.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={12} className="text-orange-400" />{course.lessons} {t("cs.lessons")}</span>
                    <span className="flex items-center gap-1"><BarChart2 size={12} className="text-orange-400" />{course.level}</span>
                  </div>
                  <button
                    onClick={() => alert(t("cs.modalDesc"))}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-bold transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Lock size={14} />
                    {t("common.locked")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
