"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  ChevronLeft,
  Sparkles,
  Atom,
} from "lucide-react";
import { sound } from "@/lib/sound";

type Role = "student" | "teacher" | null;

const years = [
  { id: "1", label: "السنة الأولى ثانوي", href: "/grade/1", color: "from-blue-500 to-blue-700" },
  { id: "2", label: "السنة الثانية ثانوي", href: "/grade/2", color: "from-sky-500 to-blue-700" },
  { id: "3", label: "السنة الثالثة ثانوي", href: "/grade/3", color: "from-amber-400 to-yellow-600" },
  { id: "4", label: "السنة الرابعة متوسط", href: "/grade/4", color: "from-green-500 to-emerald-700" },
];

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [phase, setPhase] = useState<"logo" | "welcome">("logo");
  const [showYears, setShowYears] = useState(false);
  const router = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem("pica-splash-seen")) setShowSplash(true);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  useEffect(() => {
    if (!showSplash || !mounted) return;
    const timer = setTimeout(() => setPhase("welcome"), reduce ? 600 : 2000);
    return () => clearTimeout(timer);
  }, [showSplash, mounted, reduce]);

  const navigateTo = useCallback(
    (href: string) => {
      try {
        localStorage.setItem("pica-splash-seen", "true");
      } catch {
        /* ignore */
      }
      sound.play("success");
      setShowSplash(false);
      setTimeout(() => router.replace(href), 480);
    },
    [router]
  );

  const handleRoleSelect = (selected: Role) => {
    sound.unlock();
    sound.play("click");
    if (selected === "student") setShowYears(true);
    else navigateTo("/");
  };

  const handleYearSelect = (href: string) => {
    sound.unlock();
    sound.play("nav");
    navigateTo(href);
  };

  const handleSkip = () => {
    sound.unlock();
    sound.play("click");
    navigateTo("/");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          data-sound-managed
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white"
        >
          {/* ============================ Phase 1 — Logo ============================ */}
          {phase === "logo" && (
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64"
              >
                <div className="absolute inset-6 rounded-full bg-orange-50/80 blur-2xl" />

                {!reduce && (
                  <>
                    <motion.span
                      className="absolute inset-2 rounded-full border-2 border-dashed border-orange-200"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span
                      className="absolute inset-7 rounded-full border border-blue-100"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-orange-400 shadow-md shadow-orange-200" />
                    </motion.span>
                  </>
                )}

                <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                  <Image
                    src="/logo.png"
                    alt="شعار منصة الأستاذ بيكا للفيزياء"
                    width={256}
                    height={256}
                    sizes="(max-width: 640px) 176px, 208px"
                    className="h-full w-full object-contain drop-shadow-xl"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                  منصة الأستاذ بيكا
                </h1>
                <div className="flex items-center gap-2">
                  <span className="h-px w-10 bg-gradient-to-l from-orange-400 to-transparent" />
                  <Atom size={16} className="text-orange-500" />
                  <span className="h-px w-10 bg-gradient-to-r from-orange-400 to-transparent" />
                </div>
                <p className="text-sm font-semibold text-gray-400 sm:text-base">
                  للفيزياء التعليمية — تعلّم بذكاء وفهم بعمق
                </p>

                <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-l from-orange-500 to-amber-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduce ? 0.5 : 1.8, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* ========================== Phase 2 — Welcome ========================== */}
          <AnimatePresence mode="wait">
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 mx-auto w-full max-w-md px-5 sm:px-6"
              >
                <div className="mb-8 text-center">
                  <motion.div
                    animate={reduce ? {} : { y: [0, -7, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto mb-5 h-24 w-24"
                  >
                    <div className="absolute inset-0 rounded-full bg-orange-50" />
                    <div className="absolute inset-2 rounded-full border border-orange-100" />
                    <Image src="/logo.png" alt="شعار الأستاذ بيكا" width={112} height={112} sizes="96px" className="relative h-full w-full object-contain drop-shadow-lg" priority />
                  </motion.div>
                  <h1 className="mb-1.5 text-2xl font-black text-gray-900 sm:text-3xl">
                    مرحبًا بك
                  </h1>
                  <p className="text-sm font-medium text-gray-400 sm:text-base">
                    اختر طريقة الدخول للمتابعة
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!showYears ? (
                    <motion.div
                      key="roles"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.32 }}
                      className="space-y-3.5"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("student")}
                        className="group flex w-full items-center gap-4 rounded-3xl bg-gradient-to-l from-orange-500 to-orange-600 p-5 text-right font-bold text-white shadow-xl shadow-orange-500/25 ring-1 ring-orange-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/35"
                      >
                        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                          <GraduationCap size={26} />
                        </span>
                        <span className="flex-1">
                          <span className="block text-lg font-black sm:text-xl">أنا طالب</span>
                          <span className="block text-xs text-white/90 sm:text-sm">اختر مستواك الدراسي وابدأ فورًا</span>
                        </span>
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white/30">
                          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("teacher")}
                        className="group flex w-full items-center gap-4 rounded-3xl border-2 border-gray-100 bg-white p-5 text-right font-bold text-gray-900 shadow-md transition-all duration-300 hover:border-gray-200 hover:shadow-xl"
                      >
                        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white transition-transform group-hover:scale-110 group-hover:-rotate-3">
                          <BookOpen size={26} />
                        </span>
                        <span className="flex-1">
                          <span className="block text-lg font-black sm:text-xl">أنا أستاذ / زائر</span>
                          <span className="block text-xs text-gray-400 sm:text-sm">الدخول إلى الصفحة الرئيسية</span>
                        </span>
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all group-hover:bg-gray-200">
                          <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleSkip}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl p-3 text-sm font-semibold text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        تخطي والدخول المباشر <ChevronLeft size={14} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="years"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.32 }}
                      className="space-y-3"
                    >
                      <p className="mb-4 flex items-center justify-center gap-2 text-center text-lg font-black text-gray-900">
                        <Sparkles size={18} className="text-orange-500" />
                        اختر مستواك الدراسي
                        <Sparkles size={18} className="text-orange-500" />
                      </p>

                      {years.map((year, index) => (
                        <motion.button
                          key={year.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.07 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleYearSelect(year.href)}
                          className={`group flex w-full items-center gap-4 rounded-2xl bg-gradient-to-l ${year.color} p-4 text-right font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl`}
                        >
                          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl font-black backdrop-blur-sm transition-transform group-hover:scale-110">
                            {year.id}
                          </span>
                          <span className="flex-1 text-sm font-bold sm:text-base">{year.label}</span>
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white/30">
                            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                          </span>
                        </motion.button>
                      ))}

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => { sound.play("back"); setShowYears(false); }}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl p-3 text-sm font-semibold text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
                      >
                        <ChevronLeft size={14} className="rotate-180" /> رجوع للخيارات
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
