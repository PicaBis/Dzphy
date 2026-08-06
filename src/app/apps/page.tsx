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

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-3">التطبيقات والبرامج</h1>
          <p className="text-gray-400 text-lg max-w-2xl">أدوات DzPhy الذكية — محاكيات تفاعلية وحاسبات فيزيائية</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, i) => {
            const Icon = appIcons[i];
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-40 bg-gradient-to-br ${appColors[i]} flex items-center justify-center relative`}>
                  {app.badge && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{app.badge}</div>
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon size={30} className="text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-gray-400 font-medium block mb-1">{app.category}</span>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">{app.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{app.description}</p>
                  <a href={app.url} className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all">
                    تجربة التطبيق
                    <ArrowLeft size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
