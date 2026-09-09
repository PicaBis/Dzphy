"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, ChevronLeft, Sparkles, Atom } from "lucide-react";
import { sound } from "@/lib/sound";

type Role = "student" | "teacher" | null;

const years = [
  { id: "1", label: "السنة الأولى ثانوي", href: "/grade/1", color: "from-blue-500 to-blue-700", icon: "1" },
  { id: "2", label: "السنة الثانية ثانوي", href: "/grade/2", color: "from-sky-500 to-blue-700", icon: "2" },
  { id: "3", label: "السنة الثالثة ثانوي", href: "/grade/3", color: "from-amber-400 to-yellow-600", icon: "3" },
  { id: "4", label: "السنة الرابعة متوسط", href: "/grade/4", color: "from-green-500 to-emerald-700", icon: "4" },
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
    const timer = setTimeout(() => setPhase("welcome"), reduce ? 600 : 1800);
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        >
          {/* Subtle background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-orange-200/20 dark:bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl" />
          </div>

          {phase === "logo" && (
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Logo with clean fade-in */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  <Image
                    src="/logo.png"
                    alt="شعار منصة الأستاذ بيكا للفيزياء"
                    width={160}
                    height={160}
                    sizes="(max-width: 640px) 112px, 128px"
                    className="h-full w-full object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <Atom size={20} className="text-orange-500" />
                  <h1 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                    منصة الأستاذ بيكا
                  </h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  للفيزياء التعليمية
                </p>
              </motion.div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 mx-auto w-full max-w-lg px-4 sm:px-6"
              >
                <div className="mb-8 text-center">
                  <motion.div
                    animate={reduce ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto mb-5 h-20 w-20"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-600/20 blur-xl" />
                    <Image src="/logo.png" alt="شعار الأستاذ بيكا" width={96} height={96} sizes="80px" className="relative h-full w-full object-contain drop-shadow-xl" priority />
                  </motion.div>
                  <h1 className="mb-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                    مرحبًا بك
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                    اختر طريقة الدخول للمتابعة
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!showYears ? (
                    <motion.div
                      key="roles"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("student")}
                        className="group flex w-full items-center gap-4 rounded-2xl bg-gradient-to-l from-orange-500 to-orange-600 p-4 font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30"
                      >
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                          <GraduationCap size={24} />
                        </span>
                        <span className="flex-1 text-right">
                          <span className="block text-base font-black sm:text-lg">أنا طالب</span>
                          <span className="block text-xs text-white/90">اختر مستواك الدراسي وابدأ فورًا</span>
                        </span>
                        <ChevronLeft size={18} className="text-white/70 transition-transform group-hover:-translate-x-1" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("teacher")}
                        className="group flex w-full items-center gap-4 rounded-2xl bg-gray-900 p-4 font-bold text-white shadow-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110">
                          <BookOpen size={24} />
                        </span>
                        <span className="flex-1 text-right">
                          <span className="block text-base font-black sm:text-lg">أنا أستاذ / زائر</span>
                          <span className="block text-xs text-white/90">الدخول إلى الصفحة الرئيسية</span>
                        </span>
                        <ChevronLeft size={18} className="text-white/70 transition-transform group-hover:-translate-x-1" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleSkip}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white/50 p-3 text-sm font-semibold text-gray-600 backdrop-blur-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:border-orange-500/40 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
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
                      transition={{ duration: 0.35 }}
                      className="space-y-2"
                    >
                      <p className="mb-3 flex items-center justify-center gap-2 text-center text-lg font-black text-gray-900 dark:text-white">
                        <Sparkles size={18} className="text-orange-500" />
                        اختر مستواك الدراسي
                        <Sparkles size={18} className="text-orange-500" />
                      </p>
                      {years.map((year, index) => (
                        <motion.button
                          key={year.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleYearSelect(year.href)}
                          className={`group flex w-full items-center gap-4 rounded-2xl bg-gradient-to-l ${year.color} p-4 font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl`}
                        >
                          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-xl font-black transition-transform group-hover:scale-110">
                            {year.icon}
                          </span>
                          <span className="flex-1 text-right text-sm font-bold sm:text-base">{year.label}</span>
                          <ChevronLeft size={18} className="text-white/70 transition-transform group-hover:-translate-x-1" />
                        </motion.button>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => { sound.play("back"); setShowYears(false); }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white/50 p-3 text-sm font-semibold text-gray-600 backdrop-blur-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:border-orange-500/40 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
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
