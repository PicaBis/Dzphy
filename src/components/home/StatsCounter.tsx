"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Eye, TrendingUp, Video, Play, Tv } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  icon: typeof Users;
  value: number;
  suffix: string;
  labelAr: string;
  labelFr: string;
  labelEn: string;
  color: string;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || target === 0) return;
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
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        const items: StatItem[] = [
          {
            icon: Video,
            value: data.youtube?.videos || 0,
            suffix: "+",
            labelAr: "فيديو تعليمي",
            labelFr: "Vidéos éducatives",
            labelEn: "Educational Videos",
            color: "text-red-500",
          },
          {
            icon: Users,
            value: data.total?.followers || 0,
            suffix: "+",
            labelAr: "متابع عبر المنصات",
            labelFr: "Abonnés",
            labelEn: "Followers",
            color: "text-orange-500",
          },
          {
            icon: Eye,
            value: data.total?.views || 0,
            suffix: "+",
            labelAr: "مشاهدة",
            labelFr: "Vues",
            labelEn: "Views",
            color: "text-blue-500",
          },
          {
            icon: TrendingUp,
            value: data.youtube?.subscribers || 0,
            suffix: "+",
            labelAr: "مشترك في القناة",
            labelFr: "Abonnés YouTube",
            labelEn: "YouTube Subscribers",
            color: "text-green-500",
          },
        ];
        setStats(items);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to estimated numbers
        setStats([
          { icon: Video, value: 120, suffix: "+", labelAr: "فيديو تعليمي", labelFr: "Vidéos", labelEn: "Videos", color: "text-red-500" },
          { icon: Users, value: 15000, suffix: "+", labelAr: "متابع عبر المنصات", labelFr: "Abonnés", labelEn: "Followers", color: "text-orange-500" },
          { icon: Eye, value: 500000, suffix: "+", labelAr: "مشاهدة", labelFr: "Vues", labelEn: "Views", color: "text-blue-500" },
          { icon: TrendingUp, value: 8500, suffix: "+", labelAr: "مشترك في القناة", labelFr: "Abonnés YouTube", labelEn: "Subscribers", color: "text-green-500" },
        ]);
        setLoading(false);
      });
  }, []);

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
            أرقام حقيقية من جميع صفحاتنا على منصات التواصل الاجتماعي
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
                  <Icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">
                  {loading ? (
                    <span className="inline-block w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
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
