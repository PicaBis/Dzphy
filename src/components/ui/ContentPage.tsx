"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Download, Eye, Heart, ChevronLeft, ChevronRight, BookOpen, Calendar, Tag } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  subject: string;
  date: string;
  downloadUrl: string;
  viewUrl: string;
}

interface ContentPageProps {
  grade: string;
  section: string;
  sectionLabel: string;
  items: ContentItem[];
  gradeLabel: string;
  description: string;
  color: string;
  /** per-level accent tokens (fall back to orange) */
  accentSolid?: string;
  accentSoft?: string;
  accentText?: string;
}

const subjects = ["الكل", "الميكانيكا", "الكهرباء", "الكيمياء", "البصريات", "النووي"];
const ITEMS_PER_PAGE = 6;

export default function ContentPage({
  grade,
  section,
  sectionLabel,
  items,
  gradeLabel,
  description,
  color,
  accentSolid = "bg-orange-500 hover:bg-orange-600",
  accentSoft = "bg-orange-50 dark:bg-orange-500/10",
  accentText = "text-orange-500",
}: ContentPageProps) {
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("الكل");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchSubject = activeSubject === "الكل" || item.subject === activeSubject;
    return matchSearch && matchSubject;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className={`${color} py-12 pt-24 text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link href={`/grade/${grade}`} className="hover:text-white transition-colors">{gradeLabel}</Link>
            <ChevronLeft size={14} />
            <span className="text-white font-semibold">{sectionLabel}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">{sectionLabel} - {gradeLabel}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder={`ابحث في ${sectionLabel}...`}
                className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-gray-500 transition-all" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {subjects.map((sub) => (
              <button key={sub} onClick={() => { setActiveSubject(sub); setPage(1); }}
                className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSubject === sub ? `${accentSolid} text-white shadow-sm` : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-100 dark:border-gray-600"
                }`}
              >{sub}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">عرض <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> نتيجة</p>
        </div>

        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">لا توجد نتائج</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">جرب كلمات بحث مختلفة</p>
          </div>
         ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {paginated.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease: "easeOut" }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${accentSoft} flex items-center justify-center transition-colors`}>
                    <BookOpen size={18} className={accentText} />
                  </div>
                  <button onClick={() => toggleFav(item.id)}
                    className={`p-1.5 rounded-lg transition-all ${favorites.has(item.id) ? "text-red-500" : "text-gray-300 dark:text-gray-600 hover:text-red-400"}`}>
                    <Heart size={16} fill={favorites.has(item.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Tag size={11} className="text-orange-400" />{item.subject}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{item.date}</span>
                </div>
                <div className="flex gap-2">
                  <a href={item.viewUrl} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl text-xs font-semibold transition-all">
                    <Eye size={13} /> مشاهدة
                  </a>
                  <a href={item.downloadUrl} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 ${accentSolid} text-white rounded-xl text-xs font-semibold transition-all`}>
                    <Download size={13} /> تحميل PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500/50 disabled:opacity-40 transition-all">
              <ChevronRight size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === p ? `${accentSolid} text-white shadow-md` : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500/50 disabled:opacity-40 transition-all">
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
