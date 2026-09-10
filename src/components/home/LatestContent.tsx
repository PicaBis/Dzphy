"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, FileText, ClipboardList, Download, Eye, Calendar } from "lucide-react";
import { latestContent } from "@/data/content";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

const typeConfig: Record<string, { labelKey: string; color: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  resume: { labelKey: "ملخص", color: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400", icon: BookOpen },
  exercise: { labelKey: "تمارين", color: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400", icon: FileText },
  devoir: { labelKey: "فرض", color: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400", icon: ClipboardList },
  tp: { labelKey: "عمل تطبيقي", color: "bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400", icon: FileText },
  video: { labelKey: "فيديو", color: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400", icon: Eye },
};

const gradeLabelKey: Record<string, string> = { "1": "السنة الأولى", "2": "السنة الثانية", "3": "السنة الثالثة" };

export default function LatestContent() {
  const { t } = useLanguage();
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14">
          <div>
            <span className="inline-block bg-orange-100 dark:bg-orange-500/25 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-sm">{t("lc.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">{t("lc.t1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">{t("lc.t2")}</span></h2>
          </div>
          <Link href="/grade/3/resumes" className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 font-bold text-sm border-2 border-orange-300 dark:border-orange-500/40 hover:border-orange-500 dark:hover:border-orange-500/60 px-5 py-3 rounded-lg transition-all hover:bg-orange-50 dark:hover:bg-orange-500/15 shrink-0 shadow-sm">{t("lc.all")} <DirectionArrow size={18} /></Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {latestContent.map((item, i) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5 sm:p-6 hover:border-orange-400 dark:hover:border-orange-500/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-13 h-13 rounded-xl bg-orange-50 dark:bg-orange-500/15 flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-500/25 transition-all shadow-sm group-hover:scale-110">
                    <Icon size={22} className="text-orange-500" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${config.color}`}>{t(config.labelKey)}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 px-3 py-1.5 rounded-full font-medium">{t(gradeLabelKey[item.grade])}</span>
                  </div>
                </div>
                <h3 className="font-black text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-5">
                  <Calendar size={13} /><span>{item.date}</span>
                  {item.subject && <><span>•</span><span className="text-orange-500 font-semibold">{t(item.subject)}</span></>}
                </div>
                <div className="flex gap-3">
                  <a href={item.viewUrl} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-orange-500/15 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg text-xs font-bold transition-all shadow-sm">
                    <Eye size={14} /> {t("lc.watch")}
                  </a>
                  <a href={item.downloadUrl} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-orange-200 dark:shadow-orange-500/20">
                    <Download size={14} /> {t("lc.pdf")}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
