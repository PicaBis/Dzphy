"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, FileText, ClipboardList, BookMarked, Download, Eye } from "lucide-react";
import { latestContent, courses } from "@/data/content";

const typeLabel: Record<string, string> = {
  resume: "ملخص",
  exercise: "تمارين",
  devoir: "فرض",
  tp: "عمل تطبيقي",
};

const typeIcon: Record<string, typeof BookOpen> = {
  resume: BookOpen,
  exercise: FileText,
  devoir: ClipboardList,
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ type: string; id: string; title: string; description: string; category?: string }>>([]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();

    const contentResults = latestContent
      .filter((i) => i.title.toLowerCase().includes(q) || (i.subject || "").toLowerCase().includes(q))
      .map((i) => ({ type: i.type, id: i.id, title: i.title, description: i.description }));

    const courseResults = courses
      .filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
      .map((c) => ({ type: "course", id: c.id, title: c.title, description: c.description, category: c.category }));

    setResults([...contentResults, ...courseResults]);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-white mb-4">البحث في DzPhy</h1>
          <p className="text-orange-100 mb-8">ابحث في الملخصات، التمارين، الفروض والدورات</p>
          <div className="relative">
            <Search size={22} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن أي شيء..."
              className="w-full pr-14 pl-5 py-4 bg-white rounded-2xl text-base shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence>
          {query && results.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-semibold">لا توجد نتائج لـ "{query}"</p>
            </motion.div>
          )}

          {results.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <p className="text-gray-500 text-sm mb-4">
                <span className="font-bold text-gray-900">{results.length}</span> نتيجة لـ "{query}"
              </p>
              {results.map((item, i) => {
                const Icon = typeIcon[item.type] || BookMarked;
                return (
                  <motion.div
                    key={`${item.type}-${item.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2.5 py-0.5 rounded-full">
                            {item.type === "course" ? "دورة" : typeLabel[item.type] || item.type}
                          </span>
                          {item.category && (
                            <span className="text-xs text-gray-400">{item.category}</span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">{item.description}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        {item.type !== "course" && (
                          <>
                            <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"><Eye size={15} /></button>
                            <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"><Download size={15} /></button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {!query && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <Search size={36} className="text-orange-400" />
              </div>
              <p className="text-gray-500 text-lg">ابدأ بكتابة ما تبحث عنه</p>
              <p className="text-gray-400 text-sm mt-2">ملخصات، تمارين، فروض، دورات...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
