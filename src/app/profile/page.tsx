"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Trophy,
  Clock,
  Bookmark,
  Settings,
  LogOut,
  Save,
  X,
  BarChart3,
  Cloud,
  CloudOff,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import type { QuizResult } from "@/data/quizzes";

const PROFILE_KEY = "dzphy-profile";
const QUIZ_RESULTS_KEY = "dzphy-quiz-results";

interface Profile {
  name: string;
  grade: number;
  /** Color key for the initial-based avatar (legacy emoji values fall back). */
  avatar: string;
  goal: string;
  joinDate: string;
}

// Initial-based avatars — professional color circles (no emoji).
const AVATAR_COLORS: Record<string, string> = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  green: "bg-green-600",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
};
const DEFAULT_AVATAR = "orange";

function AvatarCircle({ name, color, size = "md" }: { name: string; color: string; size?: "md" | "lg" }) {
  const cls = AVATAR_COLORS[color] ?? AVATAR_COLORS[DEFAULT_AVATAR];
  const initial = (name || "طالب").trim().charAt(0);
  const dims = size === "lg" ? "h-20 w-20 text-3xl" : "h-14 w-14 text-xl";
  return (
    <div className={`${dims} ${cls} rounded-full flex items-center justify-center font-black text-white shadow-lg ring-4 ring-white/40 select-none`}>
      {initial}
    </div>
  );
}

const grades = [
  { value: 1, label: "السنة الأولى ثانوي" },
  { value: 2, label: "السنة الثانية ثانوي" },
  { value: 3, label: "السنة الثالثة ثانوي" },
  { value: 4, label: "السنة الرابعة متوسط" },
];

export default function ProfilePage() {
  const { user, displayName, isConfigured, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

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

  // Signed-in users: pull the server-side profile + quiz history (source of
  // truth across devices) and merge them over the local/offline copy.
  useEffect(() => {
    if (!user) return;
    setSyncing(true);
    (async () => {
      try {
        const [profileRes, resultsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/quiz/results"),
        ]);
        if (profileRes.ok) {
          const { profile: serverProfile } = await profileRes.json();
          if (serverProfile) {
            setProfile((prev) => ({
              name: serverProfile.name || prev?.name || user.email?.split("@")[0] || "",
              grade: serverProfile.grade || prev?.grade || 1,
              avatar: serverProfile.avatar || prev?.avatar || DEFAULT_AVATAR,
              goal: serverProfile.goal || prev?.goal || "",
              joinDate: serverProfile.created_at || prev?.joinDate || new Date().toISOString(),
            }));
          }
        }
        if (resultsRes.ok) {
          const { results } = await resultsRes.json();
          if (Array.isArray(results) && results.length > 0) {
            setQuizResults((local) => {
              const serverAsLocal: QuizResult[] = results.map((r: { quiz_id: string; score: number; total: number; time_taken: number; created_at: string }) => ({
                quizId: r.quiz_id,
                score: r.score,
                total: r.total,
                answers: {},
                timeTaken: r.time_taken,
                date: r.created_at,
              }));
              const seen = new Set(local.map((r) => `${r.quizId}-${r.date}`));
              const merged = [...local];
              for (const r of serverAsLocal) {
                if (!seen.has(`${r.quizId}-${r.date}`)) merged.push(r);
              }
              return merged;
            });
          }
        }
      } catch {
        // offline — local data already shown
      } finally {
        setSyncing(false);
      }
    })();
  }, [user]);

  const saveProfile = (updated: Profile) => {
    setProfile(updated);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (user) {
      fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updated.name,
          grade: updated.grade,
          avatar: updated.avatar,
          goal: updated.goal,
        }),
      }).catch(() => {});
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
        {/* Account sync status */}
        <div className="flex items-center justify-between gap-3 mb-4 px-1">
          {user ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 dark:text-green-400">
              <Cloud size={15} />
              {syncing ? "جاري المزامنة..." : `متصل${displayName ? ` كـ ${displayName}` : ` كـ ${user.email}`}`}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <CloudOff size={15} />
              {isConfigured ? (
                <span>
                  غير مسجل الدخول —{" "}
                  <Link href="/login" className="text-orange-500 hover:underline">
                    سجّل الدخول لحفظ تقدمك عبر أجهزتك
                  </Link>
                </span>
              ) : (
                "تقدمك محفوظ في هذا المتصفح فقط"
              )}
            </div>
          )}
          {user && (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={13} /> خروج
            </button>
          )}
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden mb-6"
        >
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-8 pt-10 pb-8 text-center text-white relative">
            <button
              onClick={() => setEditing(true)}
              aria-label="تعديل الملف الشخصي"
              className="absolute top-4 left-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
            >
              <Settings size={18} />
            </button>
            <div className="flex justify-center mb-4">
              <AvatarCircle name={profile.name} color={profile.avatar} size="lg" />
            </div>
            <h1 className="text-2xl font-black">{profile.name}</h1>
            <p className="text-white/85 text-sm mt-1">
              {grades.find((g) => g.value === profile.grade)?.label}
            </p>
            {profile.goal && (
              <p className="text-white/80 text-xs mt-2.5 flex items-center justify-center gap-1.5">
                <Target size={13} /> {profile.goal}
              </p>
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
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
                >
                  {grades.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">لون الأفاتار</label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {Object.entries(AVATAR_COLORS).map(([key, cls]) => (
                    <button
                      key={key}
                      onClick={() => setProfile({ ...profile, avatar: key })}
                      aria-label={`لون ${key}`}
                      className={`h-10 w-10 rounded-full ${cls} flex items-center justify-center text-white font-black transition-all ${
                        (AVATAR_COLORS[profile.avatar] ? profile.avatar : DEFAULT_AVATAR) === key
                          ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-gray-800 scale-110"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                    >
                      {(profile.name || "طالب").trim().charAt(0)}
                    </button>
                  ))}
                </div>
              </div>
              <EditField label="الهدف" value={profile.goal} onChange={(v) => setProfile({ ...profile, goal: v })} />
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => saveProfile(profile)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
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
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
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

  const inputCls =
    "w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:text-white transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 w-full max-w-md overflow-hidden shadow-sm"
      >
        {/* Brand header — consistent with login/signup */}
        <div className="p-7 sm:p-8 text-center border-b border-gray-100 dark:border-gray-700">
          <div className="mx-auto h-14 w-14 mb-4">
            <Image src="/logo.png" alt="DzPhy" width={64} height={64} sizes="56px" className="h-full w-full object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">مرحبًا بك</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">أنشئ ملفك الشخصي لتتبع تقدمك</p>
        </div>
        <div className="p-6 sm:p-7 space-y-4">
          <div>
            <label htmlFor="setup-name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">اسمك</label>
            <input
              id="setup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="setup-grade" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">مستواك الدراسي</label>
            <select
              id="setup-grade"
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              className={inputCls}
            >
              {grades.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">لون الأفاتار</label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {Object.entries(AVATAR_COLORS).map(([key, cls]) => (
                <button
                  key={key}
                  onClick={() => setAvatar(key)}
                  aria-label={`لون ${key}`}
                  className={`h-11 w-11 rounded-full ${cls} flex items-center justify-center text-white font-black text-lg transition-all ${
                    avatar === key
                      ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-gray-800 scale-110"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                >
                  {(name || "طالب").trim().charAt(0)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="setup-goal" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">هدفك (اختياري)</label>
            <input
              id="setup-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="مثال: التفوق في الباك"
              className={inputCls}
            />
          </div>
          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-black text-base transition-all shadow-lg shadow-orange-200 dark:shadow-orange-500/20 active:scale-[0.99]"
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
        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white"
      />
    </div>
  );
}
