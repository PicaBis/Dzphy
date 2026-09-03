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

// Quick-access chips per level → deep links to REAL content only.
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
    <section className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <GraduationCap size={15} /> {t("gc.badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {t("gc.t1")} <span className="text-orange-500">{t("gc.t2")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            {t("gc.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEVELS.map((lvl, i) => {
            const links = quickLinks[lvl.key];
            return (
              <motion.div
                key={lvl.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, ease: "easeOut" }}
                className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl card-shine tilt-hover ${lvl.glow} transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* top accent strip in the level color */}
                <div className={`h-1.5 w-full bg-gradient-to-l ${lvl.gradient}`} />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* header: icon tile + short badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lvl.gradient} flex items-center justify-center text-white shadow-lg`}>
                      <GraduationCap size={26} />
                    </div>
                    <span className={`text-xs font-black tracking-wide px-3 py-1 rounded-full ${lvl.chip}`}>
                      {lvl.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1.5">{t(`grade${lvl.gradeParam}`)}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-4 flex-1">
                    {t(lvl.description)}
                  </p>

                  {/* subject chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lvl.topics.map((topic) => (
                      <span key={topic} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${lvl.chip}`}>
                        {t(topic)}
                      </span>
                    ))}
                  </div>

                  {/* quick-access section links */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {links.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.labelKey}
                          href={l.href}
                          title={t(l.labelKey)}
                          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl ${lvl.soft} hover:scale-105 transition-transform`}
                        >
                          <Icon size={15} className={lvl.text} />
                          <span className="text-[9px] text-gray-500 dark:text-gray-400 leading-none">{t(l.labelKey)}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    href={lvl.href}
                    className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white ${lvl.solid} transition-all duration-200 group-hover:gap-3`}
                  >
                    {t("gc.explore")} <DirectionArrow size={16} />
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
