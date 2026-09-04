"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Target,
  Star,
  Trophy,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { quizzes, quizTopics, type QuizResult } from "@/data/quizzes";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "dzphy-quiz-results";

function getQuizTitle(quiz: typeof quizzes[0], lang: string): string {
  if (lang === "fr" && quiz.titleFr) return quiz.titleFr;
  if (lang === "en" && quiz.titleEn) return quiz.titleEn;
  return quiz.titleAr;
}

function getQuizColor(topic: string): string {
  const found = quizTopics.find((t) => t.key === topic);
  return found?.color || "from-orange-500 to-orange-700";
}

function getTopicIcon(topic: string): string {
  const found = quizTopics.find((t) => t.key === topic);
  return found?.icon || "📝";
}

export default function QuizzesPage() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<number>(0);

  const results: QuizResult[] = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  })();

  const getBestScore = (quizId: string) => {
    const quizResults = results.filter((r) => r.quizId === quizId);
    if (quizResults.length === 0) return null;
    return quizResults.reduce((best, r) => (r.score > best.score ? r : best), quizResults[0]);
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (filter !== "all" && q.topic !== filter) return false;
    if (gradeFilter > 0 && q.grade !== gradeFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 to-violet-700 dark:from-violet-600 dark:to-violet-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">اختبارات تفاعلية</h1>
          <p className="text-violet-100 text-sm sm:text-base">
            اختبر معلوماتك في الفيزياء — تصحيح فوري مع شرح كل إجابة
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-violet-500" />
              <h2 className="font-bold text-gray-900 dark:text-white">إحصائياتك</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-violet-500">{results.length}</p>
                <p className="text-xs text-gray-500">اختبار مكتمل</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-green-500">
                  {Math.round(results.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / results.length)}%
                </p>
                <p className="text-xs text-gray-500">متوسط النتائج</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-orange-500">
                  {Math.round(results.reduce((sum, r) => sum + r.timeTaken, 0) / 60)} د
                </p>
                <p className="text-xs text-gray-500">متوسط الوقت</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === "all" ? "bg-violet-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-300"
            }`}
          >
            الكل
          </button>
          {quizTopics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => setFilter(topic.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === topic.key ? `bg-gradient-to-r ${topic.color} text-white` : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-300"
              }`}
            >
              {topic.icon} {topic.key}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {[0, 1, 2, 3, 4].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                gradeFilter === g ? "bg-violet-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {g === 0 ? "كل المستويات" : `السنة ${g}`}
            </button>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuizzes.map((quiz, i) => {
            const best = getBestScore(quiz.id);
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/quizzes/${quiz.id}`} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg transition-all">
                    <div className={`bg-gradient-to-r ${getQuizColor(quiz.topic)} p-5 text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl">{getTopicIcon(quiz.topic)}</span>
                          <h3 className="font-bold text-lg mt-2">{getQuizTitle(quiz, lang)}</h3>
                        </div>
                        <ArrowRight size={24} className="opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Target size={14} />
                          {quiz.questions.length} سؤال
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {Math.floor(quiz.timeLimit / 60)} دقيقة
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} />
                          {quiz.questions.filter((q) => q.difficulty === "easy").length} سهل
                        </span>
                      </div>
                      {best && (
                        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 rounded-lg p-2">
                          <Trophy size={16} className="text-green-500" />
                          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                            أفضل نتيجة: {best.score}/{best.total} ({Math.round((best.score / best.total) * 100)}%)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16">
            <Target size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد اختبارات مطابقة للفلاتر المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
}
