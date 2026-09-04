"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Printer,
} from "lucide-react";
import { formulas, formulaTopics } from "@/data/formulas";
import { useLanguage } from "@/context/LanguageContext";

export default function FormulasPage() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = formulas.filter((f) => {
    if (filter !== "all" && f.topic !== filter) return false;
    if (gradeFilter > 0 && f.grade !== gradeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        f.nameAr.toLowerCase().includes(q) ||
        f.nameFr.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.variables.some((v) => v.nameAr.toLowerCase().includes(q) || v.nameFr.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const copyFormula = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Calculator size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">ورقة القوانين الشاملة</h1>
          <p className="text-emerald-100 text-sm sm:text-base">
            جميع قوانين الفيزياء في مكان واحد — ابحث، انسخ، اطبع
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قانون، رمز، متغير..."
            className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === "all" ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            الكل ({formulas.length})
          </button>
          {formulaTopics.map((topic) => {
            const count = formulas.filter((f) => f.topic === topic.key).length;
            if (count === 0) return null;
            return (
              <button
                key={topic.key}
                onClick={() => setFilter(topic.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === topic.key ? `bg-gradient-to-r ${topic.color} text-white` : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {topic.icon} {topic.key} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6">
          {[0, 1, 2, 3].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                gradeFilter === g ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {g === 0 ? "كل المستويات" : `السنة ${g}`}
            </button>
          ))}
        </div>

        {/* Print Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            <Printer size={16} />
            طباعة
          </button>
        </div>

        {/* Formulas */}
        <div className="space-y-3">
          {filtered.map((f, i) => {
            const isExpanded = expanded === f.id;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : f.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 text-right">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={18} className="text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{f.nameAr}</h3>
                      <p className="text-xs text-gray-400">{f.nameFr}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 space-y-4">
                    {/* Formula */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <code className="text-xl sm:text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                          {f.formula}
                        </code>
                        <button
                          onClick={() => copyFormula(f.id, f.formula)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 transition-all"
                        >
                          {copied === f.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Variables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {f.variables.map((v) => (
                        <div key={v.symbol} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                            {v.symbol}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{v.nameAr}</p>
                            <p className="text-xs text-gray-400">{v.nameFr}</p>
                          </div>
                          {v.unit && (
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                              {v.unit}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calculator size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
