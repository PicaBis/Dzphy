"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, ChevronLeft } from "lucide-react";

type Role = "student" | "teacher" | null;

const years = [
  { id: "1", label: "السنة الأولى ثانوي", href: "/grade/1", color: "from-blue-500 to-blue-700" },
  { id: "2", label: "السنة الثانية ثانوي", href: "/grade/2", color: "from-sky-500 to-blue-700" },
  { id: "3", label: "السنة الثالثة ثانوي (BAC)", href: "/grade/3", color: "from-amber-400 to-yellow-600" },
  { id: "4", label: "شهادة التعليم المتوسط (BEM)", href: "/grade/4", color: "from-green-500 to-emerald-700" },
];

export default function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "welcome">("logo");
  const [role, setRole] = useState<Role>(null);
  const [showYears, setShowYears] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("pica-splash-seen");
    if (seen) {
      router.replace("/");
    }
  }, [router]);

  const handleRoleSelect = (selected: Role) => {
    setRole(selected);
    if (selected === "student") {
      setShowYears(true);
    } else {
      setTimeout(() => {
        localStorage.setItem("pica-splash-seen", "true");
        router.replace("/");
      }, 600);
    }
  };

  const handleYearSelect = (href: string) => {
    localStorage.setItem("pica-splash-seen", "true");
    router.replace(href);
  };

  const handleSkip = () => {
    localStorage.setItem("pica-splash-seen", "true");
    router.replace("/");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-white dark:bg-gray-950 flex items-center justify-center"
      >
        {phase === "logo" && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <Image
                src="/logo.png"
                alt="شعار منصة الأستاذ بيكا للفيزياء"
                width={160}
                height={160}
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white"
            >
              منصة الأستاذ بيكا للفيزياء
            </motion.p>
          </motion.div>
        )}

        <AnimatePresence>
          {phase === "logo" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              onAnimationComplete={() => setPhase("welcome")}
              className="absolute inset-0 bg-white dark:bg-gray-950"
            />
          )}
        </AnimatePresence>

        {phase === "welcome" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md mx-auto px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src="/logo.png"
                  alt="شعار منصة الأستاذ بيكا للفيزياء"
                  width={96}
                  height={96}
                  sizes="96px"
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
                مرحبا بك في موقع الأستاذ بيكا
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                يرجى اختيار نوع الحساب للمتابعة
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!showYears ? (
                <motion.div
                  key="roles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <button
                    onClick={() => handleRoleSelect("student")}
                    className="w-full flex items-center gap-4 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg">طالب</p>
                      <p className="text-xs text-white/80">اختر مستواك الدراسي</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSelect("teacher")}
                    className="w-full flex items-center gap-4 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg">أستاذ</p>
                      <p className="text-xs text-white/80">الدخول إلى صفحة الرئيسية</p>
                    </div>
                  </button>

                  <button
                    onClick={handleSkip}
                    className="w-full flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 p-3 rounded-xl font-semibold transition-all text-sm"
                  >
                    تخطي
                    <ChevronLeft size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="years"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <p className="text-center text-gray-600 dark:text-gray-300 font-semibold mb-4">
                    اختر مستواك الدراسي
                  </p>
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => handleYearSelect(year.href)}
                      className={`w-full flex items-center gap-4 bg-gradient-to-l ${year.color} text-white p-4 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={24} />
                      </div>
                      <div className="text-right">
                        <p className="text-base sm:text-lg">{year.label}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => setShowYears(false)}
                    className="w-full flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 p-3 rounded-xl font-semibold transition-all text-sm"
                  >
                    <ChevronLeft size={16} className="rotate-180" />
                    رجوع
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
