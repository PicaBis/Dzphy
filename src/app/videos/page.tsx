"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  MonitorPlay,
  ChevronLeft,
  ListVideo,
  Calendar,
  Eye,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { type PlaylistLevelKey } from "@/data/playlists";
import type { PlaylistResponse } from "@/app/api/playlists/route";
import { PlaylistCardSkeleton } from "@/components/ui/Skeletons";

const YT = ({ s = 18 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const levelFilters: { key: PlaylistLevelKey | "all"; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "bac", label: "البكالوريا" },
  { key: "3as", label: "السنة الثالثة ثانوي" },
  { key: "2as", label: "السنة الثانية ثانوي" },
  { key: "1as", label: "السنة الأولى ثانوي" },
  { key: "bem", label: "السنة الرابعة متوسط" },
  { key: "general", label: "أفكار ودورات" },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ar-DZ", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function VideosPage() {
  const [level, setLevel] = useState<PlaylistLevelKey | "all">("all");
  const [data, setData] = useState<PlaylistResponse[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async (lv: string) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/playlists${lv !== "all" ? `?level=${lv}` : ""}`);
      if (!res.ok) throw new Error("failed");
      const json = (await res.json()) as PlaylistResponse[];
      setData(json);
    } catch {
      setError(true);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(level);
  }, [level]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-orange-600 py-14 pt-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <span className="text-white font-semibold">الفيديوهات التعليمية</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><MonitorPlay size={26} /></div>
            <h1 className="text-3xl sm:text-4xl font-black">قوائم التشغيل</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            جميع دروس ومكتسبات مادة العلوم الفيزيائية مرتبة في قوائم تشغيل حسب المستوى — يُحدَّث المحتوى تلقائيًا
            عند إضافة أي فيديو جديد على قناة يوتيوب.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Level filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          {levelFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setLevel(f.key)}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                level === f.key
                  ? "bg-red-500 text-white border-red-500 shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-3">
            <RefreshCw size={32} className="text-red-400 animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm sm:text-base">جارٍ جلب أحدث الفيديوهات من يوتيوب...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <AlertCircle size={48} className="mx-auto text-red-300 dark:text-red-500/40 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-bold mb-2">تعذّر الاتصال بقوائم التشغيل</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">تأكد من اتصال الإنترنت ثم أعد المحاولة</p>
            <button
              onClick={() => load(level)}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition-all"
            >
              <RefreshCw size={16} /> إعادة المحاولة
            </button>
          </div>
        )}

        {!loading && !error && data && data.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <ListVideo size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg font-semibold">لا توجد قوائم في هذا المستوى بعد</p>
          </div>
        )}

        {/* Playlists */}
        {!loading && !error && data && (
          <div className="space-y-16">
            {data.map((pl) => (
              <section key={pl.id}>
                {/* Playlist header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className={`w-full sm:w-auto sm:min-w-0 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-3 shadow-sm`}>
                    <div className={`relative w-40 h-24 sm:w-52 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${pl.gradient}`}>
                      <img
                        src={`https://i.ytimg.com/vi/${pl.videoId}/mqdefault.jpg`}
                        alt={pl.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play size={18} className="text-red-600 ms-0.5" fill="currentColor" />
                        </span>
                      </div>
                      <span className="absolute bottom-1.5 right-1.5 text-[10px] font-black bg-black/70 text-white px-2 py-0.5 rounded-lg">
                        {pl.videos.length > 0 ? `${pl.videos.length} فيديو` : "قائمة تشغيل"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className={`inline-block text-[11px] font-black ${pl.accent} mb-1`}>{pl.badge}</span>
                      <h2 className="font-black text-gray-900 dark:text-white text-lg sm:text-xl leading-snug">{pl.title}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">{pl.stream}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{pl.description}</p>
                      <a
                        href={pl.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 text-xs font-bold text-red-500 hover:text-red-600"
                      >
                        <YT s={14} /> فتح القائمة الكاملة على يوتيوب
                      </a>
                    </div>
                  </div>
                </div>

                 {/* Videos grid — or a friendly note when the live feed is momentarily empty */}
                {pl.videos.length === 0 && (
                  <a
                    href={pl.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-8 bg-white dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-red-500 hover:text-red-600 hover:border-red-300 transition-all"
                  >
                    <YT s={16} /> شاهد كل فيديوهات هذه القائمة على يوتيوب
                  </a>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {pl.videos.map((v, i) => (
                    <motion.a
                      key={v.id}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-video bg-gray-900 overflow-hidden">
                        {v.thumbnail ? (
                          <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center">
                            <YT s={40} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Play size={22} className="text-red-600 ms-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                          {v.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                          {v.views && <span className="flex items-center gap-1"><Eye size={11} />{v.views}</span>}
                          <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(v.published)}</span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
