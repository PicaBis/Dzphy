"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, BarChart2, Tag, Filter, Lock } from "lucide-react";
import { courses } from "@/data/content";

const filters = ["الكل", "مجاني", "مدفوع", "ميكانيكا", "كهرباء", "بصريات"];

export default function CoursesPage() {
  const [active, setActive] = useState("الكل");
  const [lockedCourse, setLockedCourse] = useState<string | null>(null);

  const filtered = courses.filter((c) => {
    if (active === "الكل") return true;
    if (active === "مجاني") return c.type === "free";
    if (active === "مدفوع") return c.type === "paid";
    return c.category === active;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-3">الدورات التعليمية</h1>
          <p className="text-orange-100 text-lg max-w-2xl">
            دورات متكاملة في الفيزياء للمنهاج الجزائري — مجانية ومدفوعة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8 shadow-sm flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-gray-500 text-sm ml-2">
            <Filter size={16} />
            <span>تصفية:</span>
          </div>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                active === f
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-40 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                {course.image && !course.image.startsWith("/courses/") ? (
                  <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <BookOpen size={36} className="text-white/60" />
                )}
                <div className="absolute top-3 right-3">
                  {course.type === "free" ? (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">مجاني</span>
                  ) : (
                    <span className="bg-orange-800 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock size={10} />{course.price} دج
                    </span>
                  )}
                </div>
                {course.type === "paid" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Lock size={40} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full inline-block mb-2">{course.category}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 flex-1">{course.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={12} className="text-orange-400"/>{course.lessons} درس</span>
                  <span className="flex items-center gap-1"><BarChart2 size={12} className="text-orange-400"/>{course.level}</span>
                </div>
                {course.type === "free" ? (
                  <a
                    href={course.image.startsWith("https://i.ytimg.com") ? `https://www.youtube.com/@ProfPica` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all"
                  >
                    ابدأ مجانًا
                  </a>
                ) : (
                  <button
                    onClick={() => setLockedCourse(course.id)}
                    className="flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-bold transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Lock size={14} />
                    مقفول
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lockedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                تواصل مع الأستاذ
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                لمزيد من المعلومات وإعطائك رابط الدخول إلى الدورة المدفوعة، يرجى التواصل مع الأستاذ بيكا مباشرة.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.tiktok.com/@profpica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all"
                >
                  تواصل مع الأستاذ
                </a>
                <button
                  onClick={() => setLockedCourse(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-semibold transition-all py-2"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
