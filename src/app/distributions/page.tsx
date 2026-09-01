"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Calendar, Layers, GraduationCap, Tag, Search, CalendarRange, FileText, ChevronLeft } from "lucide-react";
import {
  distributions,
  levels,
  streams,
  categories,
  type DistributionResource,
} from "@/data/distributions";

function getInitialUrlState() {
  if (typeof window === "undefined") {
    return { level: "الكل", category: "الكل" };
  }
  const params = new URLSearchParams(window.location.search);
  const l = params.get("level");
  const c = params.get("category");
  return {
    level: l && levels.includes(l as any) ? l : "الكل",
    category: c && categories.includes(c as any) ? c : "الكل",
  };
}

const levelColor: Record<string, string> = {
  "السنة الأولى ثانوي": "from-blue-500 to-blue-700",
  "السنة الثانية ثانوي": "from-orange-500 to-orange-700",
  "السنة الثالثة ثانوي": "from-purple-500 to-purple-700",
  "شهادة التعليم المتوسط (BEM)": "from-green-500 to-green-700",
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all border ${
        active
          ? "bg-orange-500 text-white border-orange-500 shadow-sm"
          : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400"
      }`}
    >
      {children}
    </button>
  );
}

function DistributionCard({ item, index }: { item: DistributionResource; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-4 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${levelColor[item.level] || "from-orange-500 to-orange-700"} flex items-center justify-center text-white flex-shrink-0`}>
          <CalendarRange size={22} />
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">{item.category}</span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">{item.level}</span>
        </div>
      </div>

      <h3 className="font-black text-gray-900 dark:text-white leading-snug">{item.title}</h3>
      {item.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{item.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1"><Layers size={12} className="text-orange-400" />{item.stream}</span>
        <span className="flex items-center gap-1"><Calendar size={12} />{item.date}</span>
        <span className="flex items-center gap-1"><FileText size={12} />PDF{item.sizeMB ? ` · ${item.sizeMB}MB` : ""}</span>
      </div>

      {item.fileUrl ? (
        <a
          href={item.fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
        >
          <Download size={16} /> تحميل مباشر (PDF)
        </a>
      ) : (
        <span className="flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl text-sm font-bold border border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed">
          <Download size={16} /> قريبًا
        </span>
      )}
    </motion.article>
  );
}

export default function DistributionsPage() {
  const initial = getInitialUrlState();
  const [level, setLevel] = useState<string>(initial.level);
  const [stream, setStream] = useState<string>("الكل");
  const [category, setCategory] = useState<string>(initial.category);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return distributions.filter((d) => {
      if (level !== "الكل" && d.level !== level) return false;
      if (stream !== "الكل" && d.stream !== stream) return false;
      if (category !== "الكل" && d.category !== category) return false;
      if (q) {
        const hay = `${d.title} ${d.description ?? ""} ${d.stream} ${d.level} ${d.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [level, stream, category, query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 py-14 pt-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <span className="text-white font-semibold">التوزيعات السنوية</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><CalendarRange size={26} /></div>
            <h1 className="text-3xl sm:text-4xl font-black">التوزيعات السنوية</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            التوزيعات السنوية الرسمية لمادة العلوم الفيزيائية لكل مستويات الطور الثانوي وشهادة التعليم المتوسط — حمّلها مباشرة بصيغة PDF.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-8 shadow-sm space-y-4">
          <div className="relative">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن توزيع، مستوى، شعبة..."
              className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-white dark:placeholder-gray-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[80px]"><GraduationCap size={15} className="text-orange-500" />المستوى</span>
            <Chip active={level === "الكل"} onClick={() => setLevel("الكل")}>الكل</Chip>
            {levels.map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>)}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[80px]"><Layers size={15} className="text-orange-500" />الشعبة</span>
            <Chip active={stream === "الكل"} onClick={() => setStream("الكل")}>الكل</Chip>
            {streams.map((s) => <Chip key={s} active={stream === s} onClick={() => setStream(s)}>{s}</Chip>)}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[80px]"><Tag size={15} className="text-orange-500" />التصنيف</span>
            <Chip active={category === "الكل"} onClick={() => setCategory("الكل")}>الكل</Chip>
            {categories.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">عرض <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> ملف</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">لا توجد ملفات مطابقة</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">جرّب تعديل الفلاتر أو كلمات البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => <DistributionCard key={item.id} item={item} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
