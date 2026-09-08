"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ChevronLeft, BookOpen, FileText } from "lucide-react";
import { maktasabat } from "@/data/maktasabat";

export default function MaktasabatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-600 py-14 pt-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link href="/grade/3" className="hover:text-white transition-colors">السنة الثالثة ثانوي</Link>
            <ChevronLeft size={14} />
            <span className="text-white font-semibold">المكتسبات القبلية</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <BookOpen size={26} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">المكتسبات القبلية — بكالوريا 2027</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            أساسيات الفيزياء المطلوبة للготовية لامتحان البكالوريا — فيزياء. حمّل الدروس الأربعة بصيغة PDF مباشرة.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          عرض <span className="font-bold text-gray-900 dark:text-white">{maktasabat.length}</span> درس
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {maktasabat.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-4 hover:border-amber-200 dark:hover:border-amber-500/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white flex-shrink-0">
                  <span className="font-black text-lg">{item.session}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                    الحصة {item.session}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                    PDF · {item.sizeMB}MB
                  </span>
                </div>
              </div>

              <h3 className="font-black text-gray-900 dark:text-white leading-snug">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{item.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1"><FileText size={12} className="text-amber-400" />ملف PDF</span>
              </div>

              <a
                href={item.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
              >
                <Download size={16} /> تحميل مباشر (PDF)
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
