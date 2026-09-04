"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  ThumbsUp,
  ExternalLink,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";
import { useBookmarks } from "@/components/ui/Bookmarks";
import { useLanguage } from "@/context/LanguageContext";

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [liked, setLiked] = useState(false);

  const videoId = params?.videoId as string;
  const bookmarked = isBookmarked(videoId || "");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`dzphy-video-notes-${videoId}`);
      if (stored) setNotes(stored);
    } catch {
      // ignore
    }
  }, [videoId]);

  const saveNotes = (value: string) => {
    setNotes(value);
    try {
      localStorage.setItem(`dzphy-video-notes-${videoId}`, value);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "درس فيزيياء - منصة الأستاذ بيكا",
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="درس فيزيياء"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Video Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5"
            >
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-4">
                درس فيزيياء
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => toggleBookmark({
                    id: videoId,
                    title: "درس فيزيياء",
                    url: `/watch/${videoId}`,
                    type: "video",
                  })}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    bookmarked
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:text-orange-600"
                  }`}
                >
                  {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  {bookmarked ? "محفوظ" : "حفظ"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-500/20 hover:text-green-600 transition-all"
                >
                  <Share2 size={16} />
                  مشاركة
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    liked
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-600"
                  }`}
                >
                  <ThumbsUp size={16} />
                  {liked ? "أعجبني" : "إعجاب"}
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
                >
                  <ExternalLink size={16} />
                  يوتيوب
                </a>
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-violet-500" />
                  <h3 className="font-bold text-gray-900 dark:text-white">ملاحظاتي</h3>
                </div>
                {showNotes ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {showNotes && (
                <div className="px-5 pb-5">
                  <textarea
                    value={notes}
                    onChange={(e) => saveNotes(e.target.value)}
                    placeholder="اكتب ملاحظاتك عن هذا الدرس هنا..."
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 dark:text-white resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">الملاحظات محفوظة في متصفحك</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">نصائح للمشاهدة</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">✦</span>
                  شاهد الدرس كاملًا قبل الانتقال للتمرين
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">✦</span>
                  دوّن ملاحظاتك أثناء المشاهدة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">✦</span>
                  أعد المشاهدة للأجزاء الصعبة
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">✦</span>
                  اختبر نفسك بعد الدرس
                </li>
              </ul>
              <button
                onClick={() => router.push("/quizzes")}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
              >
                ابدأ الاختبار
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
