"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Eye, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  icon: typeof Users;
  value: number;
  suffix: string;
  labelAr: string;
  labelFr: string;
  labelEn: string;
}

const stats: StatItem[] = [
  { icon: BookOpen, value: 150, suffix: "+", labelAr: "ملخص وتمرين", labelFr: "Résumés & Exercices", labelEn: "Summaries & Exercises" },
  { icon: Users, value: 5200, suffix: "+", labelAr: "طالب مسجل", labelFr: "Étudiants inscrits", labelEn: "Registered Students" },
  { icon: Eye, value: 25000, suffix: "+", labelAr: "مشاهدة", labelFr: "Vues", labelEn: "Views" },
  { icon: TrendingUp, value: 94, suffix: "%", labelAr: "نسبة الرضا", labelFr: "Satisfaction", labelEn: "Satisfaction Rate" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ar-DZ")}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getLabel = (item: StatItem) => {
    if (lang === "fr") return item.labelFr;
    if (lang === "en") return item.labelEn;
    return item.labelAr;
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            المنصة في أرقام
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            أرقام حقيقية تعكس ثقة آلاف الطلاب في محتوى المنصة
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 sm:p-6 text-center hover:border-orange-200 dark:hover:border-orange-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                  {getLabel(stat)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
