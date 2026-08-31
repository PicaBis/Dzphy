"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Target, Calculator, Cpu } from "lucide-react";
import { apps } from "@/data/content";

const appIcons = [Zap, Target, Calculator, Cpu];
const appColors = [
  "from-orange-400 to-orange-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
];

export default function AppsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-sm font-bold mb-4">التطبيقات والبرامج</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">اكتشف أدوات <span className="text-orange-400">DzPhy</span> الذكية</h2>
          <p className="text-gray-400 max-w-xl mx-auto">تطبيقات ذكية مصممة خصيصا لمساعدة الطالب الجزائري على فهم الفيزياء بطريقة تفاعلية</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {apps.map((app, i) => {
            const Icon = appIcons[i];
            return (
              <motion.div key={app.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/20"
              >
                {app.badge && <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">{app.badge}</div>}
                <div className={`h-32 bg-gradient-to-br ${appColors[i]} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  ><Icon size={30} className="text-white" /></motion.div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-gray-500 font-medium mb-1 block">{app.category}</span>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">{app.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{app.description}</p>
                  <a href={app.url} className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-orange-500 text-white rounded-xl text-sm font-semibold transition-all duration-200 border border-white/10 hover:border-transparent">
                    تجربة التطبيق <ArrowLeft size={14} />
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
