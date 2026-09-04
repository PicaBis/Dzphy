"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  Clock,
  Bell,
  Play,
  ExternalLink,
  CheckCircle,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LiveClass {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  topic: string;
  grade: number;
  platform: "zoom" | "meet" | "youtube";
  url: string;
  status: "upcoming" | "live" | "recorded";
  recordingUrl?: string;
  attendees?: number;
}

const liveClasses: LiveClass[] = [
  {
    id: "lc1",
    title: "مراجعة شاملة — الميكانيكا",
    date: "2026-09-10",
    time: "14:00",
    duration: "90 دقيقة",
    topic: "الميكانيكا",
    grade: 1,
    platform: "zoom",
    url: "https://zoom.us/j/example1",
    status: "recorded",
    recordingUrl: "https://youtube.com/watch?v=example1",
    attendees: 45,
  },
  {
    id: "lc2",
    title: "حل تمارين — الكهرباء",
    date: "2026-09-12",
    time: "16:00",
    duration: "60 دقيقة",
    topic: "الكهرباء",
    grade: 2,
    platform: "meet",
    url: "https://meet.google.com/example2",
    status: "upcoming",
  },
  {
    id: "lc3",
    title: "بث مباشر — تحضير للباك",
    date: "2026-09-15",
    time: "20:00",
    duration: "120 دقيقة",
    topic: "الموجات",
    grade: 3,
    platform: "youtube",
    url: "https://youtube.com/@profpica/live",
    status: "upcoming",
  },
  {
    id: "lc4",
    title: "مراجعة البصريات — الجزء 1",
    date: "2026-09-08",
    time: "15:00",
    duration: "75 دقيقة",
    topic: "البصريات",
    grade: 3,
    platform: "zoom",
    url: "https://zoom.us/j/example4",
    status: "recorded",
    recordingUrl: "https://youtube.com/watch?v=example4",
    attendees: 38,
  },
];

const platformConfig = {
  zoom: { name: "Zoom", icon: "🔵", color: "bg-blue-500" },
  meet: { name: "Google Meet", icon: "🟢", color: "bg-green-500" },
  youtube: { name: "YouTube Live", icon: "🔴", color: "bg-red-500" },
};

export default function LiveClassesPage() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "upcoming" | "recorded">("all");

  const filtered = liveClasses.filter((lc) => {
    if (filter === "all") return true;
    return lc.status === filter;
  });

  const upcomingCount = liveClasses.filter((lc) => lc.status === "upcoming").length;
  const recordedCount = liveClasses.filter((lc) => lc.status === "recorded").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-500 to-red-700 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Video size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الحصص المباشرة</h1>
          <p className="text-red-100 text-sm sm:text-base">
            بثوث مباشرة ومراجعات جماعية مع الأستاذ بيكا
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-green-500">{upcomingCount}</p>
            <p className="text-xs text-gray-500">حصص قادمة</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-blue-500">{recordedCount}</p>
            <p className="text-xs text-gray-500">تسجيلات متاحة</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "upcoming", "recorded"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f ? "bg-red-500 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {f === "all" ? "الكل" : f === "upcoming" ? "قادمة" : "تسجيلات"}
            </button>
          ))}
        </div>

        {/* Classes List */}
        <div className="space-y-3">
          {filtered.map((lc) => {
            const platform = platformConfig[lc.platform];
            const isLive = lc.status === "live";
            const isUpcoming = lc.status === "upcoming";
            const isRecorded = lc.status === "recorded";

            return (
              <motion.div
                key={lc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      {isLive && (
                        <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-white" />
                          مباشر الآن
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
                          قادمة
                        </span>
                      )}
                      {isRecorded && (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full">
                          تسجيل متاح
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{lc.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(lc.date).toLocaleDateString("ar-DZ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {lc.time}
                      </span>
                      <span>{lc.duration}</span>
                      <span>السنة {lc.grade}</span>
                      <span>{lc.topic}</span>
                      {lc.attendees && (
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {lc.attendees} حاضر
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {isLive && (
                      <a
                        href={lc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        <Play size={12} />
                        دخول البث
                      </a>
                    )}
                    {isUpcoming && (
                      <>
                        <a
                          href={lc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                        >
                          <ExternalLink size={12} />
                          رابط الدخول
                        </a>
                        <button className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                          <Bell size={12} />
                          تذكير
                        </button>
                      </>
                    )}
                    {isRecorded && lc.recordingUrl && (
                      <a
                        href={lc.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        <Play size={12} />
                        مشاهدة التسجيل
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Video size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد حصص في هذا التصنيف</p>
          </div>
        )}
      </div>
    </div>
  );
}
