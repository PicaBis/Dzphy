"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Video,
  BookOpen,
  FileText,
  GraduationCap,
  CalendarRange,
  AppWindow,
  LayoutGrid,
  Share2,
  ArrowLeft,
  Search,
} from "lucide-react";
import { useBookmarks } from "@/components/ui/Bookmarks";
import { useLanguage } from "@/context/LanguageContext";

const typeIcon: Record<string, typeof BookOpen> = {
  video: Video,
  resume: BookOpen,
  exercise: FileText,
  course: GraduationCap,
  distribution: CalendarRange,
  app: AppWindow,
  page: LayoutGrid,
};

const typeColor: Record<string, string> = {
  video: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
  resume: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
  exercise: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  course: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  distribution: "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-300",
  app: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  page: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = bookmarks.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.type === filter;
    return matchSearch && matchFilter;
  });

  const types = [...new Set(bookmarks.map((b) => b.type))];

  const handleShare = (item: { title: string; url: string }) => {
    if (navigator.share) {
      navigator.share({ title: item.title, url: item.url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + item.url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Bookmark size={28} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">المفضلة</h1>
          <p className="text-purple-100 text-sm sm:text-base">
            جميع المحتوى الذي حفظته للوصول السريع — {bookmarks.length} عنصر
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-3xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
              <Bookmark size={40} className="text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد عناصر في المفضلة</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">اضغط على أيقونة المرجعية على أي عنصر لإضافته هنا</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <ArrowLeft size={16} />
              تصفح المحتوى
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث في المفضلة..."
                  className="w-full pr-11 pl-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:text-white"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    filter === "all"
                      ? "bg-purple-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300"
                  }`}
                >
                  الكل ({bookmarks.length})
                </button>
                {types.map((type) => {
                  const count = bookmarks.filter((b) => b.type === type).length;
                  const Icon = typeIcon[type] || BookOpen;
                  return (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                        filter === type
                          ? "bg-purple-500 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300"
                      }`}
                    >
                      <Icon size={14} />
                      {type} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bookmarks List */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج مطابقة</p>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {filtered.map((item, i) => {
                    const Icon = typeIcon[item.type] || BookOpen;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      >
                        <div className="group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[item.type] || typeColor.page}`}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {new Date(item.addedAt).toLocaleDateString("ar-DZ")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={item.url}
                                className="p-2 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/20 transition-all"
                                aria-label="فتح"
                              >
                                <ExternalLink size={16} />
                              </Link>
                              <button
                                onClick={() => handleShare({ title: item.title, url: item.url })}
                                className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/20 transition-all"
                                aria-label="مشاركة"
                              >
                                <Share2 size={16} />
                              </button>
                              <button
                                onClick={() => removeBookmark(item.id)}
                                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all"
                                aria-label="إزالة من المفضلة"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
