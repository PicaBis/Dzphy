"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, ChevronLeft, Sparkles } from "lucide-react";

type Role = "student" | "teacher" | null;

const years = [
  { id: "1", label: "السنة الأولى ثانوي", href: "/grade/1", color: "from-blue-500 to-blue-700" },
  { id: "2", label: "السنة الثانية ثانوي", href: "/grade/2", color: "from-sky-500 to-blue-700" },
  { id: "3", label: "السنة الثالثة ثانوي (BAC)", href: "/grade/3", color: "from-amber-400 to-yellow-600" },
  { id: "4", label: "شهادة التعليم المتوسط (BEM)", href: "/grade/4", color: "from-green-500 to-emerald-700" },
];

const playClickSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // ignore audio errors
  }
};

export default function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "welcome">("logo");
  const [showYears, setShowYears] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("pica-splash-seen");
    if (seen) {
      router.replace("/");
    }
  }, [router]);

  const navigateTo = useCallback((href: string) => {
    setIsNavigating(true);
    localStorage.setItem("pica-splash-seen", "true");
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }, []);

  const handleRoleSelect = (selected: Role) => {
    playClickSound();
    if (selected === "student") {
      setShowYears(true);
    } else {
      navigateTo("/");
    }
  };

  const handleYearSelect = (href: string) => {
    playClickSound();
    navigateTo(href);
  };

  const handleSkip = () => {
    playClickSound();
    navigateTo("/");
  };

  return (
    <AnimatePresence>
      {!isNavigating && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden"
        >
          {phase === "logo" && (
            <>
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: ["easeOut"] }}
                className="flex flex-col items-center gap-6 relative z-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40"
                >
                  <Image
                    src="/logo.png"
                    alt="شعار منصة الأستاذ بيكا للفيزياء"
                    width={160}
                    height={160}
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-contain w-full h-full drop-shadow-2xl"
                    priority
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white text-center px-4"
                >
                  منصة الأستاذ بيكا للفيزياء
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                onAnimationComplete={() => setPhase("welcome")}
                className="absolute inset-0 bg-white dark:bg-gray-950"
              />
            </>
          )}

          <AnimatePresence mode="wait">
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md mx-auto px-6 relative z-10"
              >
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center mb-10"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-24 h-24 mx-auto mb-6"
                  >
                    <Image
                      src="/logo.png"
                      alt="شعار منصة الأستاذ بيكا للفيزياء"
                      width={96}
                      height={96}
                      sizes="96px"
                      className="object-contain w-full h-full drop-shadow-xl"
                      priority
                    />
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3"
                  >
                    مرحبا بك في موقع الأستاذ بيكا
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-500 dark:text-gray-400 text-sm sm:text-base"
                  >
                    يرجى اختيار نوع الحساب للمتابعة
                  </motion.p>
                </motion.div>

                <AnimatePresence mode="wait">
                  {!showYears ? (
                    <motion.div
                      key="roles"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("student")}
                        className="w-full flex items-center gap-4 bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-orange-200/50"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                        >
                          <GraduationCap size={24} />
                        </motion.div>
                        <div className="text-right flex-1">
                          <p className="text-base sm:text-lg">طالب</p>
                          <p className="text-xs text-white/80">اختر مستواك الدراسي</p>
                        </div>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronLeft size={18} className="text-white/60" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleSelect("teacher")}
                        className="w-full flex items-center gap-4 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                        >
                          <BookOpen size={24} />
                        </motion.div>
                        <div className="text-right flex-1">
                          <p className="text-base sm:text-lg">أستاذ</p>
                          <p className="text-xs text-white/80">الدخول إلى صفحة الرئيسية</p>
                        </div>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronLeft size={18} className="text-white/60" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleSkip}
                        className="w-full flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 p-3 rounded-xl font-semibold transition-all text-sm border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-500/30"
                      >
                        تخطي والدخول المباشر
                        <ChevronLeft size={16} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="years"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-3"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-gray-600 dark:text-gray-300 font-semibold mb-4 flex items-center justify-center gap-2"
                      >
                        <Sparkles size={18} className="text-orange-500" />
                        اختر مستواك الدراسي
                        <Sparkles size={18} className="text-orange-500" />
                      </motion.p>
                      {years.map((year, index) => (
                        <motion.button
                          key={year.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleYearSelect(year.href)}
                          className={`w-full flex items-center gap-4 bg-gradient-to-l ${year.color} text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-orange-200/30`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                            <GraduationCap size={24} />
                          </div>
                          <div className="text-right flex-1">
                            <p className="text-base sm:text-lg">{year.label}</p>
                          </div>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ChevronLeft size={18} className="text-white/60" />
                          </motion.div>
                        </motion.button>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setShowYears(false)}
                        className="w-full flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 p-3 rounded-xl font-semibold transition-all text-sm border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-500/30"
                      >
                        <ChevronLeft size={16} className="rotate-180" />
                        رجوع للخيارات
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
