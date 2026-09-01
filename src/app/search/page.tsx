"use client";
import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  FileText,
  ClipboardList,
  FlaskConical,
  Video,
  GraduationCap,
  CalendarRange,
  AppWindow,
  LayoutGrid,
  ArrowLeft,
} from "lucide-react";
import { search as runSearch, type SearchKind } from "@/lib/search";

const kindIcon: Record<SearchKind, typeof BookOpen> = {
  level: GraduationCap,
  resume: BookOpen,
  exercise: FileText,
  devoir: ClipboardList,
  tp: FlaskConical,
  video: Video,
  course: GraduationCap,
  distribution: CalendarRange,
  app: AppWindow,
  page: LayoutGrid,
};

const kindColor: Record<SearchKind, string> = {
  level: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  resume: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
  exercise: "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300",
  devoir: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300",
  tp: "bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-300",
  video: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
  course: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  distribution: "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-300",
  app: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  page: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

const suggestions = ["نيوتن", "الكهرباء", "القذائف", "BAC", "BEM", "الموجات", "التوزيعات"];

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQ = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  // keep the URL in sync (shareable search links) without a full navigation
  useEffect(() => {
    const id = setTimeout(() => {
      const usp = new URLSearchParams();
      if (query.trim()) usp.set("q", query.trim());
      const qs = usp.toString();
      router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [query, router]);

  const results = useMemo(() => runSearch(query), [query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">ابحث في DzPhy</h1>
          <p className="text-orange-100 mb-7 text-sm sm:text-base">
            دروس، ملخصات، تمارين، فروض، فيديوهات، دورات وتوزيعات — كل المحتوى في مكان واحد
          </p>
          <div className="relative">
            <Search size={22} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب: نيوتن، الكهرباء، القذائف، BAC..."
              className="w-full pr-14 pl-5 py-4 bg-white dark:bg-gray-800 dark:text-white rounded-2xl text-base shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/40 transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {!query.trim() ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Search size={36} className="text-orange-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">ابدأ بكتابة ما تبحث عنه</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">ملخصات، تمارين، فروض، فيديوهات، دورات...</p>
            </motion.div>
          ) : results.length === 0 ? (
            <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">لا توجد نتائج لـ &quot;{query}&quot;</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">جرّب كلمة أخرى مثل: نيوتن، الكهرباء، BEM</p>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                <span className="font-bold text-gray-900 dark:text-white">{results.length}</span> نتيجة لـ &quot;{query}&quot;
              </p>
              {results.map((item, i) => {
                const Icon = kindIcon[item.kind];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <Link
                      href={item.url}
                      className="block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${kindColor[item.kind]}`}>
                          <Icon size={19} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${kindColor[item.kind]}`}>
                              {item.kindLabel}
                            </span>
                            {item.meta && <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.meta}</span>}
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                        </div>
                        <ArrowLeft size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-950" />}>
      <SearchInner />
    </Suspense>
  );
}
