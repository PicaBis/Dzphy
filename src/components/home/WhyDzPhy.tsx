"use client";
import { motion } from "framer-motion";
import { BookOpen, Globe, Lightbulb, RefreshCw, Cpu, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const features = [
  { icon: BookOpen, titleKey: "wd1.title", descKey: "wd1.desc", color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-500/20" },
  { icon: Globe, titleKey: "wd2.title", descKey: "wd2.desc", color: "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400", border: "border-orange-100 dark:border-orange-500/20" },
  { icon: Lightbulb, titleKey: "wd3.title", descKey: "wd3.desc", color: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400", border: "border-yellow-100 dark:border-yellow-500/20" },
  { icon: RefreshCw, titleKey: "wd4.title", descKey: "wd4.desc", color: "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400", border: "border-green-100 dark:border-green-500/20" },
  { icon: Cpu, titleKey: "wd5.title", descKey: "wd5.desc", color: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-500/20" },
  { icon: Users, titleKey: "wd6.title", descKey: "wd6.desc", color: "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400", border: "border-pink-100 dark:border-pink-500/20" },
];

export default function WhyDzPhy() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">{t("wd.badge")}</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">{t("wd.t1")} <span className="text-orange-500">{t("wd.t2")}</span> {t("wd.t3")}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{t("wd.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`group p-6 rounded-2xl border-2 ${feature.border} bg-white dark:bg-gray-800 hover:shadow-lg card-shine tilt-hover hover:border-orange-400 dark:hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><Icon size={22} /></div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t(feature.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
