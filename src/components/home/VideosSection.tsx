"use client";
import { motion } from "framer-motion";
import { Play, ArrowLeft } from "lucide-react";

const YT = ({ s = 16, c = "" }: { s?: number; c?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s} className={c}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);

const TK = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" /></svg>
);

const yt = [
  { t: "شرح الميكانيكا للباكالوريا", u: "https://www.youtube.com/@ProfPica" },
  { t: "الكهرباء من الصفر للإحتراف", u: "https://www.youtube.com/@ProfPica" },
  { t: "قوانين نيوتن بطريقة مبسطة", u: "https://www.youtube.com/@ProfPica" },
  { t: "الموجات الميكانيكية", u: "https://www.youtube.com/@ProfPica" },
  { t: "الكيمياء الكهربائية للباك", u: "https://www.youtube.com/@ProfPica" },
  { t: "تمارين الباكالوريا مع الحل", u: "https://www.youtube.com/@ProfPica" },
];

const tk = [
  { t: "نصيحة سريعة في الميكانيكا", u: "https://www.tiktok.com/@profpica" },
  { t: "خطأ شائع في الكهرباء", u: "https://www.tiktok.com/@profpica" },
  { t: "حل تمرين باك في دقيقة", u: "https://www.tiktok.com/@profpica" },
  { t: "شرح مبسط للطاقة الحركية", u: "https://www.tiktok.com/@profpica" },
  { t: "كيف تحفظ القوانين بسهولة", u: "https://www.tiktok.com/@profpica" },
];

export default function VideosSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="inline-block bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-3">الفيديوهات التعليمية</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">تعلم بالفيديو <span className="text-orange-500">مجانا</span></h2>
        </motion.div>

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center"><YT s={16} c="text-white" /></div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              آخر فيديوهات YouTube -{" "}
              <a href="https://www.youtube.com/@ProfPica" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">@ProfPica</a>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {yt.map((v, i) => (
              <motion.a key={i} href={v.u} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group block bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-video bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 flex items-center justify-center">
                  <YT s={48} c="text-red-500/30" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><Play size={24} className="text-red-600" fill="currentColor" /></div>
                  </div>
                </div>
                <div className="p-4"><h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2">{v.t}</h4></div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.youtube.com/@ProfPica" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-red-200 hover:shadow-red-300">
              <YT s={18} />
              مشاهدة المزيد على YouTube
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center"><TK /></div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              آخر فيديوهات TikTok -{" "}
              <a href="https://www.tiktok.com/@profpica" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white hover:underline">@profpica</a>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {tk.map((v, i) => (
              <motion.a key={i} href={v.u} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white"><TK /><p className="text-xs text-center px-2 leading-tight opacity-80 mt-2">{v.t}</p></div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play size={20} fill="white" className="text-white" /></div>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.tiktok.com/@profpica" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl">
              <TK /> مشاهدة المزيد على TikTok <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
