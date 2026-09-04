"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Video,
  BookOpen,
  Zap,
  MessageSquare,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface QuizResultLite {
  score: number;
  total: number;
  timeTaken?: number;
  date?: string;
}
interface BookmarkLite {
  id: string;
  title?: string;
}
interface ProfileLite {
  name?: string;
  grade?: number;
}

export default function AnalyticsPage() {
  const { lang, t } = useLanguage();
  const [quizResults, setQuizResults] = useState<QuizResultLite[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkLite[]>([]);
  const [profile, setProfile] = useState<ProfileLite | null>(null);

  useEffect(() => {
    try {
      setQuizResults(JSON.parse(localStorage.getItem("dzphy-quiz-results") || "[]"));
      setBookmarks(JSON.parse(localStorage.getItem("dzphy-bookmarks") || "[]"));
      setProfile(JSON.parse(localStorage.getItem("dzphy-profile") || "null"));
    } catch {
      // ignore
    }
  }, []);

  const totalQuizzes = quizResults.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0
    ? Math.max(...quizResults.map((r) => Math.round((r.score / r.total) * 100)))
    : 0;
  const worstScore = totalQuizzes > 0
    ? Math.min(...quizResults.map((r) => Math.round((r.score / r.total) * 100)))
    : 0;

  // Simulated analytics data
  const pageViews = [
    { page: "الرئيسية", views: 1243, trend: 12 },
    { page: "الفيديوهات", views: 892, trend: 8 },
    { page: "الاختبارات", views: 567, trend: 25 },
    { page: "بطاقات المراجعة", views: 345, trend: 15 },
    { page: "ورقة القوانين", views: 289, trend: -3 },
  ];

  const gradeDistribution = [
    { grade: "السنة الأولى", students: 45, percentage: 35 },
    { grade: "السنة الثانية", students: 38, percentage: 29 },
    { grade: "السنة الثالثة", students: 32, percentage: 25 },
    { grade: "السنة الرابعة متوسط", students: 14, percentage: 11 },
  ];

  const topicPerformance = [
    { topic: "الميكانيكا", avgScore: 78, color: "bg-blue-500" },
    { topic: "الكهرباء", avgScore: 65, color: "bg-yellow-500" },
    { topic: "الموجات", avgScore: 72, color: "bg-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <BarChart3 size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">لوحة التحليلات</h1>
          <p className="text-slate-300 text-sm sm:text-base">إحصائيات حقيقية عن أداء الطلاب</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Users} value="129" label="طالب نشط" color="text-blue-500" trend="+12%" />
          <StatCard icon={Eye} value="3,336" label="مشاهدة هذا الأسبوع" color="text-green-500" trend="+8%" />
          <StatCard icon={Zap} value={totalQuizzes || 47} label="اختبار مكتمل" color="text-purple-500" trend="+25%" />
          <StatCard icon={MessageSquare} value="23" label="تعليق جديد" color="text-orange-500" trend="+15%" />
        </div>

        {/* Quiz Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-purple-500" />
              أداء الاختبارات
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">متوسط النتائج</span>
                <span className="text-lg font-black text-gray-900 dark:text-white">{avgScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">أفضل نتيجة</span>
                <span className="text-lg font-black text-green-500">{bestScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">أدنى نتيجة</span>
                <span className="text-lg font-black text-red-500">{worstScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">إجمالي الاختبارات</span>
                <span className="text-lg font-black text-gray-900 dark:text-white">{totalQuizzes}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-500" />
              الأداء حسب الموضوع
            </h3>
            <div className="space-y-3">
              {topicPerformance.map((tp) => (
                <div key={tp.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{tp.topic}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{tp.avgScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${tp.color} rounded-full transition-all`}
                      style={{ width: `${tp.avgScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Eye size={18} className="text-green-500" />
            أكثر الصفحات زيارة
          </h3>
          <div className="space-y-3">
            {pageViews.map((pv, i) => (
              <div key={pv.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{pv.page}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{pv.views.toLocaleString()}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-bold ${pv.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                    {pv.trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {Math.abs(pv.trend)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-orange-500" />
            توزيع الطلاب حسب المستوى
          </h3>
          <div className="space-y-3">
            {gradeDistribution.map((gd) => (
              <div key={gd.grade}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{gd.grade}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{gd.students} طالب ({gd.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                    style={{ width: `${gd.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, trend }: { icon: typeof Users; value: string | number; label: string; color: string; trend: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4">
      <Icon size={20} className={`mb-2 ${color}`} />
      <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-xs font-bold text-green-500 mt-1">{trend}</p>
    </div>
  );
}
