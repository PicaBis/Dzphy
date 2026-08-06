"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-100 dark:bg-orange-500/10 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-50 dark:bg-orange-500/5 rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              منصة الفيزياء الجزائرية #1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6"
            >
              منصة الفيزياء الجزائرية{" "}
              <span className="text-orange-500 relative">
                التي تجمع
                <svg className="absolute -bottom-2 right-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 3 150 3 298 8" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              كل ما يحتاجه الطالب
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              ملخصات، تمارين محلولة، فروض واختبارات، دورات تعليمية، تطبيقات ذكية، وآخر الفيديوهات التعليمية — كل شيء في مكان واحد.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/grade/3"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 shadow-lg shadow-orange-200 dark:shadow-orange-500/20 hover:shadow-orange-300 dark:hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                ابدأ التعلم
                <ArrowLeft size={18} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 bg-white dark:bg-gray-900 px-7 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 hover:bg-orange-50 dark:hover:bg-orange-500/10"
              >
                <PlayCircle size={18} className="text-orange-500" />
                استكشف الدورات
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-video bg-gray-900">
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/videoseries?list=PLybg94GvOJ9E9BcCU-3YO7nKqwJmEQCNM&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0"
                title="Physics Education Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
