"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
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

// Quick-access chips per level → deep links to REAL content only.
const quickLinks: Record<LevelKey, { icon: typeof BookOpen; label: string; href: string }[]> = {
  "1as": [
    { icon: BookOpen, label: "ملخصات", href: "/grade/1/resumes" },
    { icon: FileText, label: "تمارين", href: "/grade/1/exercises" },
    { icon: ClipboardList, label: "فروض", href: "/grade/1/devoirs" },
    { icon: FlaskConical, label: "عملي", href: "/grade/1/tp" },
    { icon: Video, label: "فيديو", href: "/videos?level=1as" },
  ],
  "2as": [
    { icon: BookOpen, label: "ملخصات", href: "/grade/2/resumes" },
    { icon: FileText, label: "تمارين", href: "/grade/2/exercises" },
    { icon: ClipboardList, label: "فروض", href: "/grade/2/devoirs" },
    { icon: FlaskConical, label: "عملي", href: "/grade/2/tp" },
    { icon: Video, label: "فيديو", href: "/videos?level=2as" },
  ],
  "3as": [
    { icon: BookOpen, label: "ملخصات", href: "/grade/3/resumes" },
    { icon: FileText, label: "تمارين", href: "/grade/3/exercises" },
    { icon: ClipboardList, label: "فروض", href: "/grade/3/devoirs" },
    { icon: FlaskConical, label: "عملي", href: "/grade/3/tp" },
    { icon: Video, label: "فيديو", href: "/videos?level=3as" },
  ],
  bem: [
    { icon: Video, label: "دروس", href: "/videos?level=bem" },
    { icon: Sparkles, label: "مكتسبات", href: "/videos?level=bem" },
    { icon: CalendarRange, label: "توزيع", href: "/distributions?level=%D8%B4%D9%87%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D9%85%D8%AA%D9%88%D8%B3%D8%B7%20(BEM)" },
  ],
};

export default function GradeCards() {
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
            <GraduationCap size={15} /> المستويات الدراسية
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3">
            اختر <span className="text-orange-500">مستواك</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            محتوى مرتّب لكل مستوى وفق المنهاج الجزائري — لكل مستوى لونه الخاص
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
                className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl ${lvl.glow} transition-all duration-300 hover:-translate-y-1.5`}
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

                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1.5">{lvl.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed mb-4 flex-1">
                    {lvl.description}
                  </p>

                  {/* subject chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lvl.topics.map((t) => (
                      <span key={t} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${lvl.chip}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* quick-access section links */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {links.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.label}
                          href={l.href}
                          title={l.label}
                          className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl ${lvl.soft} hover:scale-105 transition-transform`}
                        >
                          <Icon size={15} className={lvl.text} />
                          <span className="text-[9px] text-gray-500 dark:text-gray-400 leading-none">{l.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    href={lvl.href}
                    className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white ${lvl.solid} transition-all duration-200 group-hover:gap-3`}
                  >
                    استكشف القسم <ArrowLeft size={16} />
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
