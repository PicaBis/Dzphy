"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Trophy,
  Flame,
  Star,
  Target,
  BookOpen,
  Video,
  Zap,
  Award,
} from "lucide-react";
import { getProgressStats, getProgress, allLessons, allVideos } from "@/lib/progress";
import { badges, levelNames, checkBadges } from "@/data/gamification";
import { useLanguage } from "@/context/LanguageContext";

export default function ProgressPage() {
  const { lang, t } = useLanguage();
  const stats = getProgressStats();
  const progress = getProgress();
  const [quizCount, setQuizCount] = useState(0);

  useEffect(() => {
    try {
      const results = JSON.parse(localStorage.getItem("dzphy-quiz-results") || "[]");
      setQuizCount(results.length);
    } catch {
      // ignore
    }
  }, []);

  const earnedBadges = checkBadges(stats.points, stats.streak, quizCount, false);
  const levelName = levelNames[Math.min(stats.level - 1, levelNames.length - 1)];
  const pointsForNextLevel = stats.level * 100;
  const pointsInCurrentLevel = stats.points % 100;
  const levelProgress = (pointsInCurrentLevel / 100) * 100;

  const completedLessons = allLessons.filter((l) => progress.items[l.id]?.completed).length;
  const completedVideos = allVideos.filter((v) => progress.items[v.id]?.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <TrendingUp size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">تقدمك الدراسي</h1>
          <p className="text-indigo-100 text-sm sm:text-base">تابع مسيرتك التعليمية وإنجازاتك</p>
        </div>

        {/* Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black">
              {stats.level}
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">{levelName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">المستوى {stats.level}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">{pointsInCurrentLevel}/100 نقطة للمستوى التالي</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Star} value={stats.points} label="نقطة" color="text-yellow-500" bg="bg-yellow-50 dark:bg-yellow-500/10" />
          <StatCard icon={Flame} value={stats.streak} label="أيام متتالية" color="text-orange-500" bg="bg-orange-50 dark:bg-orange-500/10" />
          <StatCard icon={BookOpen} value={completedLessons} label="دروس مكتملة" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-500/10" />
          <StatCard icon={Video} value={completedVideos} label="فيديوهات" color="text-red-500" bg="bg-red-50 dark:bg-red-500/10" />
        </div>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target size={20} className="text-indigo-500" />
            التقدم العام
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-700" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8"
                  strokeDasharray={`${stats.percentage * 2.51} 251`}
                  strokeLinecap="round"
                  className="text-indigo-500 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-gray-900 dark:text-white">{stats.percentage}%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                أكملت {stats.completed} من {stats.total} نشاط
              </p>
              <p className="text-xs text-gray-400 mt-1">
                أكملت {completedLessons} دروس و {completedVideos} فيديوهات و {quizCount} اختبارات
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award size={20} className="text-yellow-500" />
            الشارات ({earnedBadges.length}/{badges.length})
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {badges.map((badge) => {
              const earned = earnedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`text-center p-3 rounded-xl transition-all ${
                    earned
                      ? "bg-gray-50 dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-800 opacity-40"
                  }`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{badge.nameAr}</p>
                  <p className="text-[10px] text-gray-400">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, bg }: { icon: typeof Star; value: number | string; label: string; color: string; bg: string }) {
  return (
    <div className={`${bg} rounded-xl p-4 text-center`}>
      <Icon size={20} className={`mx-auto mb-2 ${color}`} />
      <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}
