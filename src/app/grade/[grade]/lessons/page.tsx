"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Snowflake,
  Flower2,
  Sun,
  Lock,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getLevelByGradeParam } from "@/lib/levels";
import { getGradeLessons, type Season, type Unit, type Lesson, type LessonPart } from "@/data/lessons";

const seasonIcons: Record<string, React.ElementType> = {
  winter: Snowflake,
  spring: Flower2,
  summer: Sun,
};

const seasonColors: Record<string, string> = {
  winter: "from-blue-500 to-cyan-600",
  spring: "from-green-500 to-emerald-600",
  summer: "from-amber-400 to-orange-500",
};

const seasonBg: Record<string, string> = {
  winter: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30",
  spring: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30",
  summer: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30",
};

function PartCard({ part, index }: { part: LessonPart; index: number }) {
  const hasContent = part.fileUrl && part.fileUrl !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {part.thumbnail ? (
          <img
            src={part.thumbnail}
            alt={part.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <FileText size={36} className="text-gray-300 dark:text-gray-600" />
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500">PDF</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
          PDF · {part.sizeMB}MB
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 line-clamp-2">
          {part.title}
        </h4>
        {hasContent ? (
          <a
            href={part.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md"
          >
            <Download size={14} /> تحميل
          </a>
        ) : (
          <span className="flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl text-xs font-bold border border-dashed border-gray-300 dark:border-gray-600 cursor-not-allowed">
            <Lock size={14} /> قريبًا
          </span>
        )}
      </div>
    </motion.div>
  );
}

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const hasParts = lesson.parts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <BookOpen size={18} className="text-amber-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-black text-gray-900 dark:text-white text-base leading-snug">
            {lesson.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {lesson.description}
          </p>
        </div>
      </div>

      {hasParts ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lesson.parts.map((part, i) => (
            <PartCard key={part.id} part={part} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-600">
          <FileText size={24} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
          <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold">قريبًا</p>
        </div>
      )}
    </motion.div>
  );
}

function UnitCard({ unit, index }: { unit: Unit; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm font-black">
          {index + 1}
        </div>
        <h3 className="font-black text-gray-900 dark:text-white text-lg">{unit.title}</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
          ({unit.lessons.length} {unit.lessons.length === 1 ? "درس" : "دروس"})
        </span>
      </div>

      <div className="space-y-4 pr-4 border-r-2 border-orange-200 dark:border-orange-500/30">
        {unit.lessons.map((lesson, i) => (
          <LessonCard key={lesson.id} lesson={lesson} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function SeasonSection({ season, index }: { season: Season; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = seasonIcons[season.id] || BookOpen;
  const color = seasonColors[season.id] || "from-orange-500 to-orange-600";
  const bg = seasonBg[season.id] || "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-6"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-4 p-5 rounded-2xl ${bg} border hover:shadow-lg transition-all duration-300 text-right`}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>
          <Icon size={22} />
        </div>
        <div className="flex-1">
          <h2 className="font-black text-gray-900 dark:text-white text-lg">{season.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{season.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
            {season.units.reduce((acc, u) => acc + u.lessons.length, 0)} درس
          </span>
          {isOpen ? (
            <ChevronRight size={20} className="text-gray-400 rotate-90 transition-transform" />
          ) : (
            <ChevronRight size={20} className="text-gray-400 transition-transform" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-4">
              {season.units.length > 0 ? (
                season.units.map((unit, i) => (
                  <UnitCard key={unit.id} unit={unit} index={i} />
                ))
              ) : (
                <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                  <BookOpen size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-400 dark:text-gray-500 text-sm font-semibold">قريبًا — الدروس قيد الإعداد</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function GradeLessonsPage() {
  const params = useParams();
  const grade = params?.grade as string;
  const level = getLevelByGradeParam(grade);
  const gradeLessons = getGradeLessons(grade);

  if (!level || !gradeLessons) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">قريبًا — الدروس غير متوفرة بعد</p>
          <Link href={`/grade/${grade}`} className="mt-4 inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm">
            العودة لصفحة المستوى <ChevronLeft size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${level.gradient} py-14 pt-24 text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link href={`/grade/${grade}`} className="hover:text-white transition-colors">{level.title}</Link>
            <ChevronLeft size={14} />
            <span className="text-white font-semibold">الدروس</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <BookOpen size={26} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">دروس {level.title}</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            الدروس م organized حسب الفصول والوحدات وفق المنهاج الجزائري — حمّل الأجزاء بصيغة PDF مباشرة.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {gradeLessons.seasons.map((season, i) => (
          <SeasonSection key={season.id} season={season} index={i} />
        ))}
      </div>
    </div>
  );
}
