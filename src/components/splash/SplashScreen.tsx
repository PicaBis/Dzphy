"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, ChevronLeft, Sparkles } from "lucide-react";
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

  // Deterministic particle field (no Math.random → no hydration/render drift).
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 120 + (i % 5) * 46;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle * 1.3) * radius * 0.7,
          delay: (i % 6) * 0.12,
          size: 3 + (i % 3),
        };
      }),
    []
  );

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
    const timer = setTimeout(() => setPhase("welcome"), reduce ? 900 : 2600);
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
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        >
          {/* soft ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl" />
          </div>

          {phase === "logo" && (
            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Orbits + particles converging on the logo */}
              <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
                {!reduce && (
                  <>
                    {[0, 1, 2].map((ring) => (
                      <motion.div
                        key={ring}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 0.5, scale: 1, rotate: 360 }}
                        transition={{
                          opacity: { duration: 0.8, delay: 0.2 + ring * 0.15 },
                          scale: { duration: 0.8, delay: 0.2 + ring * 0.15, ease: "easeOut" },
                          rotate: { duration: 14 - ring * 3, repeat: Infinity, ease: "linear" },
                        }}
                        className="absolute rounded-full border border-orange-400/30 dark:border-orange-400/20"
                        style={{
                          width: `${70 + ring * 30}%`,
                          height: `${70 + ring * 30}%`,
                          borderStyle: ring === 1 ? "dashed" : "solid",
                        }}
                      >
                        {/* an electron on each orbit */}
                        <span
                          className="absolute h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,122,0,0.8)]"
                          style={{ top: "-5px", left: "50%", marginLeft: "-5px" }}
                        />
                      </motion.div>
                    ))}
                    {particles.map((p) => (
                      <motion.span
                        key={p.id}
                        initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                        animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0.4] }}
                        transition={{ duration: 1.4, delay: p.delay, ease: "easeIn" }}
                        className="absolute rounded-full bg-orange-400"
                        style={{ width: p.size, height: p.size }}
                      />
                    ))}
                  </>
                )}

                {/* Logo with light-sweep */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 h-28 w-28 sm:h-32 sm:w-32"
                >
                  <Image
                    src="/logo.png"
                    alt="شعار منصة الأستاذ بيكا للفيزياء"
                    width={160}
                    height={160}
                    sizes="(max-width: 640px) 112px, 128px"
                    className="h-full w-full object-contain drop-shadow-2xl"
                    priority
                  />
                  {!reduce && (
                    <motion.div
                      initial={{ x: "-150%" }}
                      animate={{ x: "150%" }}
                      transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
                      className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay"
                    />
                  )}
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0.2 : 1.1, duration: 0.6 }}
                className="px-4 text-center text-xl font-black text-gray-900 dark:text-white sm:text-2xl"
              >
                منصة الأستاذ بيكا للفيزياء
              </motion.p>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 120 }}
                transition={{ delay: reduce ? 0.3 : 1.3, duration: 0.6 }}
                className="h-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
              />
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
                className="relative z-10 mx-auto w-full max-w-md px-6"
              >
                <div className="mb-8 text-center">
                  <motion.div
                    animate={reduce ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto mb-5 h-20 w-20"
                  >
                    <Image src="/logo.png" alt="شعار الأستاذ بيكا" width={96} height={96} sizes="80px" className="h-full w-full object-contain drop-shadow-xl" priority />
                  </motion.div>
                  <h1 className="mb-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                    مرحبًا بك في منصة الأستاذ بيكا
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                    لنبدأ رحلتك — اختر ما يناسبك للمتابعة
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
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("student")}
                        className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-l from-orange-500 to-orange-600 p-4 font-bold text-white shadow-lg transition-all duration-200 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
                      >
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                          <GraduationCap size={24} />
                        </span>
                        <span className="flex-1 text-right">
                          <span className="block text-base sm:text-lg">أنا طالب</span>
                          <span className="block text-xs text-white/80">اختر مستواك الدراسي وابدأ فورًا</span>
                        </span>
                        <ChevronLeft size={18} className="text-white/60" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("teacher")}
                        className="flex w-full items-center gap-4 rounded-2xl bg-gray-900 p-4 font-bold text-white shadow-lg transition-all duration-200 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                          <BookOpen size={24} />
                        </span>
                        <span className="flex-1 text-right">
                          <span className="block text-base sm:text-lg">أنا أستاذ / زائر</span>
                          <span className="block text-xs text-white/80">الدخول إلى الصفحة الرئيسية</span>
                        </span>
                        <ChevronLeft size={18} className="text-white/60" />
                      </motion.button>

                      <button
                        onClick={handleSkip}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-100 p-3 text-sm font-semibold text-gray-500 transition-all hover:border-orange-200 hover:text-orange-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-orange-500/30 dark:hover:text-orange-400"
                      >
                        تخطي والدخول المباشر <ChevronLeft size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="years"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3"
                    >
                      <p className="mb-3 flex items-center justify-center gap-2 text-center font-semibold text-gray-600 dark:text-gray-300">
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
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleYearSelect(year.href)}
                          className={`flex w-full items-center gap-4 rounded-2xl bg-gradient-to-l ${year.color} p-4 font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl`}
                        >
                          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <GraduationCap size={24} />
                          </span>
                          <span className="flex-1 text-right text-base sm:text-lg">{year.label}</span>
                          <ChevronLeft size={18} className="text-white/60" />
                        </motion.button>
                      ))}
                      <button
                        onClick={() => { sound.play("back"); setShowYears(false); }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-100 p-3 text-sm font-semibold text-gray-500 transition-all hover:border-orange-200 hover:text-orange-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-orange-500/30 dark:hover:text-orange-400"
                      >
                        <ChevronLeft size={16} className="rotate-180" /> رجوع للخيارات
                      </button>
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
