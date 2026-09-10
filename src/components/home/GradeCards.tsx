"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  ClipboardList,
  FlaskConical,
  Video,
  CalendarRange,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { LEVELS, type LevelKey } from "@/lib/levels";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

// Quick-access chips per level -> deep links to REAL content only.
const quickLinks: Record<LevelKey, { icon: typeof BookOpen; labelKey: string; href: string }[]> = {
  "1as": [
    { icon: BookOpen, labelKey: "chip.resumes", href: "/grade/1/resumes" },
    { icon: FileText, labelKey: "chip.exercises", href: "/grade/1/exercises" },
    { icon: ClipboardList, labelKey: "chip.devoirs", href: "/grade/1/devoirs" },
    { icon: FlaskConical, labelKey: "chip.tp", href: "/grade/1/tp" },
    { icon: Video, labelKey: "chip.videos", href: "/videos?level=1as" },
  ],
  "2as": [
    { icon: BookOpen, labelKey: "chip.resumes", href: "/grade/2/resumes" },
    { icon: FileText, labelKey: "chip.exercises", href: "/grade/2/exercises" },
    { icon: ClipboardList, labelKey: "chip.devoirs", href: "/grade/2/devoirs" },
    { icon: FlaskConical, labelKey: "chip.tp", href: "/grade/2/tp" },
    { icon: Video, labelKey: "chip.videos", href: "/videos?level=2as" },
  ],
  "3as": [
    { icon: BookOpen, labelKey: "chip.resumes", href: "/grade/3/resumes" },
    { icon: FileText, labelKey: "chip.exercises", href: "/grade/3/exercises" },
    { icon: ClipboardList, labelKey: "chip.devoirs", href: "/grade/3/devoirs" },
    { icon: FlaskConical, labelKey: "chip.tp", href: "/grade/3/tp" },
    { icon: Video, labelKey: "chip.videos", href: "/videos?level=3as" },
  ],
  bem: [
    { icon: Video, labelKey: "chip.lessons", href: "/videos?level=bem" },
    { icon: Sparkles, labelKey: "chip.skills", href: "/videos?level=bem" },
    { icon: CalendarRange, labelKey: "chip.distribution", href: "/distributions?level=%D8%B4%D9%87%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D9%85%D8%AA%D9%88%D8%B3%D8%B7%20(BEM)" },
  ],
};

export default function GradeCards() {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <GraduationCap size={17} /> {t("gc.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t("gc.t1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{t("gc.t2")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t("gc.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {LEVELS.map((lvl, i) => {
            const links = quickLinks[lvl.key];
            return (
              <motion.div
                key={lvl.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, ease: "easeOut" }}
                className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-2xl card-shine tilt-hover hover:border-orange-400 dark:hover:border-orange-500/50 ${lvl.glow} transition-all duration-300 hover:-translate-y-2`}
              >
                {/* top accent strip in the level color */}
                <div className={`h-2 w-full bg-gradient-to-l ${lvl.gradient} shadow-sm`} />

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  {/* header: icon tile + short badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lvl.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <GraduationCap size={28} />
                    </div>
                    <span className={`text-xs font-black tracking-widest px-3 py-1.5 rounded-full shadow-sm ${lvl.chip}`}>
                      {lvl.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{t(`grade${lvl.gradeParam}`)}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 flex-1">
                    {t(lvl.description)}
                  </p>

                  {/* subject chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lvl.topics.map((topic) => (
                      <span key={topic} className={`text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm ${lvl.chip} transition-all group-hover:shadow-md`}>
                        {t(topic)}
                      </span>
                    ))}
                  </div>

                  {/* quick-access section links */}
                  <div className="flex items-center gap-2 mb-6 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/30 dark:to-transparent p-3 rounded-xl">
                    {links.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.labelKey}
                          href={l.href}
                          title={t(l.labelKey)}
                          className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg ${lvl.soft} hover:scale-110 transition-all duration-200 group/link`}
                        >
                          <Icon size={18} className={`${lvl.text} group-hover/link:scale-125 transition-transform`} />
                          <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300 leading-none text-center">{t(l.labelKey)}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    href={lvl.href}
                    className={`mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-base text-white ${lvl.solid} shadow-lg hover:shadow-xl transition-all duration-200 group-hover:gap-3 group-hover:scale-105`}
                  >
                    {t("gc.explore")} <DirectionArrow size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
