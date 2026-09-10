"use client";
import { motion } from "framer-motion";
import { Zap, Target, Calculator, Cpu } from "lucide-react";
import { apps } from "@/data/content";
import DirectionArrow from "@/components/ui/DirectionArrow";
import { useLanguage } from "@/context/LanguageContext";

const appIcons = [Zap, Target, Calculator, Cpu];
const appColors = [
  "from-orange-400 to-orange-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
];

export default function AppsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block bg-orange-500/25 text-orange-300 border border-orange-500/40 px-4 py-2 rounded-full text-sm font-bold mb-5 shadow-lg">{t("as.badge")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">{t("as.t1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">{t("as.t2")}</span> {t("as.t3")}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">{t("as.desc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {apps.map((app, i) => {
            const Icon = appIcons[i];
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1, ease: "easeOut" }}
                className="group relative bg-gray-800/70 backdrop-blur-md border-2 border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] hover:shadow-2xl hover:shadow-orange-900/30"
              >
                {app.badge && <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">{app.badge}</div>}
                <div className={`h-36 bg-gradient-to-br ${appColors[i]} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-18 h-18 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                  ><Icon size={32} className="text-white" /></motion.div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-400 font-semibold mb-2 block uppercase tracking-wide">{app.category}</span>
                  <h3 className="text-white font-bold text-lg mb-2.5 group-hover:text-orange-300 transition-colors">{app.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">{app.description}</p>
                  <a href={app.url} className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-orange-500/50">
                    {t("as.try")} <DirectionArrow size={16} />
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
