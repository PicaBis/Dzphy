"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Trophy,
  Clock,
  Bookmark,
  Star,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { QuizResult } from "@/data/quizzes";

const PROFILE_KEY = "dzphy-profile";
const QUIZ_RESULTS_KEY = "dzphy-quiz-results";

interface Profile {
  name: string;
  grade: number;
  avatar: string;
  goal: string;
  joinDate: string;
}

const avatars = ["🎓", "📚", "⚡", "🔬", "🧪", "🌟", "🚀", "💡"];
const grades = [
  { value: 1, label: "السنة الأولى ثانوي" },
  { value: 2, label: "السنة الثانية ثانوي" },
  { value: 3, label: "السنة الثالثة ثانوي" },
  { value: 4, label: "السنة الرابعة متوسط" },
];

export default function ProfilePage() {
  const { lang, t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [bookmarksCount, setBookmarksCount] = useState(0);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PROFILE_KEY);
      if (p) setProfile(JSON.parse(p));
      const qr = localStorage.getItem(QUIZ_RESULTS_KEY);
      if (qr) setQuizResults(JSON.parse(qr));
      const bm = localStorage.getItem("dzphy-bookmarks");
      if (bm) setBookmarksCount(JSON.parse(bm).length);
    } catch {
      // ignore
    }
  }, []);

  const saveProfile = (updated: Profile) => {
    setProfile(updated);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setEditing(false);
  };

  const resetProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(QUIZ_RESULTS_KEY);
    localStorage.removeItem("dzphy-bookmarks");
    setProfile(null);
    setQuizResults([]);
    setBookmarksCount(0);
  };

  if (!profile) {
    return <ProfileSetup onComplete={saveProfile} />;
  }

  const totalQuizzes = quizResults.length;
  const avgScore = totalQuizzes > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / totalQuizzes)
    : 0;
  const totalTime = Math.round(quizResults.reduce((sum, r) => sum + r.timeTaken, 0) / 60);
  const bestScore = totalQuizzes > 0
    ? Math.max(...quizResults.map((r) => Math.round((r.score / r.total) * 100)))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden mb-6"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white relative">
            <button
              onClick={() => setEditing(true)}
              className="absolute top-4 left-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
            >
              <Settings size={18} />
            </button>
            <div className="text-6xl mb-3">{profile.avatar}</div>
            <h1 className="text-2xl font-black">{profile.name}</h1>
            <p className="text-white/80 text-sm mt-1">
              {grades.find((g) => g.value === profile.grade)?.label}
            </p>
            {profile.goal && (
              <p className="text-white/60 text-xs mt-2">🎯 {profile.goal}</p>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard icon={BarChart3} value={totalQuizzes} label="اختبار" color="text-violet-500" />
          <StatCard icon={Trophy} value={`${avgScore}%`} label="متوسط" color="text-yellow-500" />
          <StatCard icon={Bookmark} value={bookmarksCount} label="محفوظ" color="text-orange-500" />
          <StatCard icon={Clock} value={`${totalTime}د`} label="وقت" color="text-blue-500" />
        </div>

        {/* Recent Results */}
        {quizResults.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 mb-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              آخر النتائج
            </h2>
            <div className="space-y-2">
              {quizResults.slice(-5).reverse().map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {r.score}/{r.total}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.date).toLocaleDateString("ar-DZ")}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${
                    (r.score / r.total) >= 0.7 ? "text-green-500" : (r.score / r.total) >= 0.5 ? "text-yellow-500" : "text-red-500"
                  }`}>
                    {Math.round((r.score / r.total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset */}
        <button
          onClick={resetProfile}
          className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 py-3 rounded-xl font-bold text-sm transition-all"
        >
          <LogOut size={16} />
          حذف الحساب والبيانات
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-black text-gray-900 dark:text-white">تعديل الملف الشخصي</h2>
              <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <EditField label="الاسم" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">المستوى</label>
                <select
                  value={profile.grade}
                  onChange={(e) => setProfile({ ...profile, grade: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
                >
                  {grades.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">الأفاتار</label>
                <div className="flex gap-2 flex-wrap">
                  {avatars.map((a) => (
                    <button
                      key={a}
                      onClick={() => setProfile({ ...profile, avatar: a })}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                        profile.avatar === a
                          ? "bg-indigo-500 ring-2 ring-indigo-300"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <EditField label="الهدف" value={profile.goal} onChange={(v) => setProfile({ ...profile, goal: v })} />
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => saveProfile(profile)}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                <Save size={15} />
                حفظ
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-bold text-sm transition-all"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ProfileSetup({ onComplete }: { onComplete: (p: Profile) => void }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [avatar, setAvatar] = useState("🎓");
  const [goal, setGoal] = useState("");

  const handleStart = () => {
    if (!name.trim()) return;
    onComplete({
      name: name.trim(),
      grade,
      avatar,
      goal,
      joinDate: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 w-full max-w-md overflow-hidden"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white">
          <div className="text-5xl mb-3">{avatar}</div>
          <h1 className="text-2xl font-black">مرحبًا بك!</h1>
          <p className="text-white/80 text-sm mt-2">أنشئ ملفك الشخصي لتتبع تقدمك</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">اسمك</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">مستواك الدراسي</label>
            <select
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
            >
              {grades.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">اختر أفاتار</label>
            <div className="flex gap-2 flex-wrap">
              {avatars.map((a) => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    avatar === a
                      ? "bg-indigo-500 ring-2 ring-indigo-300 scale-110"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">هدفك (اختياري)</label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="مثال: التفوق في الباك"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
            />
          </div>
          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-black text-lg transition-all shadow-lg"
          >
            ابدأ الآن
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: typeof User; value: string | number; label: string; color: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
      <Icon size={20} className={`mx-auto mb-2 ${color}`} />
      <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

function EditField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white"
      />
    </div>
  );
}
