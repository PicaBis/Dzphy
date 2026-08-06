"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const TK = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" /></svg>
);
const FB = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
);
const YT = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);

const platforms = [
  { name: "Facebook", Icon: FB, url: "https://www.facebook.com/profile.php?id=61587746175552", color: "from-blue-600 to-blue-700", followers: "الأستاذ بيكا", description: "منشورات يومية ونصائح ومستجدات تعليمية" },
  { name: "YouTube", Icon: YT, url: "https://www.youtube.com/@Dr.abdelhadi", color: "from-red-500 to-red-700", followers: "@Dr.abdelhadi", description: "شروحات مفصلة وحلول تمارين بالفيديو" },
  { name: "TikTok", Icon: TK, url: "https://www.tiktok.com/@profpica", color: "from-gray-800 to-gray-900", followers: "@profpica", description: "نصائح سريعة وشرح مبسط في ثواني" },
];

export default function FollowPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black mb-3">تابعونا</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">ابق على اطلاع بأحدث المحتويات التعليمية عبر منصاتنا</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {platforms.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group bg-gradient-to-br ${p.color} rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"><Icon /></div>
                  <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-black text-2xl mb-1">{p.name}</h3>
                <p className="text-white/80 text-sm mb-3">{p.description}</p>
                <div className="text-xl font-black">{p.followers}</div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
