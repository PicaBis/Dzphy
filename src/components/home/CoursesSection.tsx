"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, BarChart2, ArrowLeft, Tag } from "lucide-react";
import { courses } from "@/data/content";

export default function CoursesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-3">الدورات التعليمية</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">دورات <span className="text-orange-500">مميزة</span> للفيزياء</h2>
          </div>
          <Link href="/courses" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-sm border border-orange-200 dark:border-orange-500/30 hover:border-orange-400 dark:hover:border-orange-500/50 px-5 py-2.5 rounded-xl transition-all hover:bg-orange-50 dark:hover:bg-orange-500/10">كل الدورات <ArrowLeft size={16} /></Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-40 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                <BookOpen size={40} className="text-white/70" />
                <div className="absolute top-3 right-3">
                  {course.type === "free" ? (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">مجاني</span>
                  ) : (
                    <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Tag size={10} />{course.price} دج</span>
                  )}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-full">{course.category}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 flex-1">{course.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={12} className="text-orange-400" />{course.lessons} درس</span>
                  <span className="flex items-center gap-1"><BarChart2 size={12} className="text-orange-400" />{course.level}</span>
                </div>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-50 dark:border-gray-700">
                  <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-600 dark:text-orange-400">أ</div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</span>
                </div>
                <Link href={`/courses/${course.id}`} className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all">
                  {course.type === "free" ? "ابدأ مجانا" : "التسجيل في الدورة"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
