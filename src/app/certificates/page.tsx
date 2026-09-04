"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Download,
  Trophy,
  Star,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getProgressStats, getProgress } from "@/lib/progress";

export default function CertificatesPage() {
  const { lang, t } = useLanguage();
  const stats = getProgressStats();
  const progress = getProgress();
  const [generated, setGenerated] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);

  const milestones = [
    { level: 1, name: "إتمام المستوى الأول", points: 100, icon: "🌱" },
    { level: 2, name: "إتمام المستوى الثاني", points: 200, icon: "📖" },
    { level: 3, name: "إتمام المستوى الثالث", points: 300, icon: "🎓" },
    { level: 5, name: "إتمام المستوى الخامس", points: 500, icon: "🏆" },
    { level: 10, name: "إتمام المستوى العاشر", points: 1000, icon: "👑" },
  ];

  const unlockedMilestones = milestones.filter((m) => stats.points >= m.points);
  const nextMilestone = milestones.find((m) => stats.points < m.points);

  const generateCertificate = (milestone: typeof milestones[0]) => {
    setSelectedLevel(milestone.level);
    setGenerated(true);
  };

  if (generated) {
    const milestone = milestones.find((m) => m.level === selectedLevel);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          {/* Certificate */}
          <div className="bg-white rounded-3xl border-4 border-orange-300 p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-200 to-transparent" />
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-200 to-transparent" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-orange-200 to-transparent" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-orange-200 to-transparent" />

            <div className="relative">
              <div className="text-6xl mb-4">{milestone?.icon}</div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">شهادة إتمام</h1>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-6" />

              <p className="text-lg text-gray-600 mb-4">تُمنح هذه الشهادة إلى</p>
              <p className="text-2xl font-black text-orange-500 mb-4">
                {(() => {
                  try {
                    return JSON.parse(localStorage.getItem("dzphy-profile") || "{}").name || "طالب";
                  } catch {
                    return "طالب";
                  }
                })()}
              </p>

              <p className="text-gray-600 mb-6">
                لإتمامه بنجاح <strong>{milestone?.name}</strong>
                <br />
                في منصة الأستاذ بيكا للفيزياء
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date().toLocaleDateString("ar-DZ")}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} />
                  {stats.points} نقطة
                </span>
                <span className="flex items-center gap-1">
                  <Trophy size={14} />
                  المستوى {stats.level}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Award size={14} />
                <span>منصة الأستاذ بيكا للفيزياء — dzphy.vercel.app</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-all"
            >
              <Download size={16} />
              طباعة / حفظ PDF
            </button>
            <button
              onClick={() => setGenerated(false)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              العودة
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Award size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الشهادات</h1>
          <p className="text-amber-100 text-sm sm:text-base">احصل على شهادة عند إتمام كل مستوى</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m) => {
            const unlocked = stats.points >= m.points;
            return (
              <motion.div
                key={m.level}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border-2 p-6 text-center ${
                  unlocked
                    ? "bg-white dark:bg-gray-800 border-amber-300 dark:border-amber-500/50"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60"
                }`}
              >
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{m.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{m.points} نقطة مطلوبة</p>
                {unlocked ? (
                  <button
                    onClick={() => generateCertificate(m)}
                    className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
                  >
                    <Download size={14} />
                    تحميل الشهادة
                  </button>
                ) : (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min((stats.points / m.points) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {nextMilestone && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              الشارة القادمة: <strong>{nextMilestone.name}</strong> — تحتاج {nextMilestone.points - stats.points} نقطة إضافية
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
