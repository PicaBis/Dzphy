"use client";
import { motion } from "framer-motion";
import { ExternalLink, Link2, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";
import { socialLinks, communityGroups, organizedCommunities, siteConfig } from "@/data/site";
import { socialIconMap } from "@/components/icons/SocialIcons";
import { SocialGallery } from "@/components/home/SocialGallery";

export default function FollowPage() {
  const [copied, setCopied] = useState(false);

  const copyPayment = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.payment);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black mb-3">تابعونا</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto mb-6">
            كل منصات الأستاذ بيكا في مكان واحد — ابق على اطلاع بأحدث الدروس والملفات والتحديثات اليومية.
          </p>
          <a
            href={siteConfig.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
          >
            <Link2 size={18} /> الرابط الشامل — linktr.ee/profpica
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main platforms */}
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">المنصات الرسمية</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-6">قنوات المتابعة اليومية للأستاذ بيكا</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {socialLinks.map((p, i) => {
            const Icon = socialIconMap[p.platform];
            return (
              <motion.a
                key={p.platform}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`group bg-gradient-to-br ${p.gradient} rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"><Icon className="w-8 h-8" /></div>
                  <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-black text-2xl mb-1">{p.label}</h3>
                <p className="text-white/80 text-sm mb-3">{p.description}</p>
                <div className="text-lg font-black" dir="ltr">{p.handle}</div>
              </motion.a>
            );
          })}
        </div>

        {/* Organized communities (Telegram folder + Messenger/WhatsApp communities) */}
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">المجتمعات المنظمة</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-6">مجلدات القنوات ومجتمعات النقاش — ملفات وروح فريق واحد</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {organizedCommunities.map((p, i) => {
            const Icon = socialIconMap[p.platform];
            return (
              <motion.a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`group bg-gradient-to-br ${p.gradient} rounded-2xl p-6 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"><Icon className="w-8 h-8" /></div>
                  <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-black text-2xl mb-1">{p.label}</h3>
                <p className="text-white/80 text-sm mb-3">{p.description}</p>
                <div className="text-lg font-black" dir="ltr">{p.handle}</div>
              </motion.a>
            );
          })}
        </div>

        {/* TikTok + Instagram highlights */}
        <SocialGallery />

        {/* Community chat groups */}
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">مجموعات التواصل حسب مستواك</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-6">دردشات مباشرة على إنستغرام وماسنجر حسب القسم الدراسي</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {communityGroups.map((group, gi) => (
            <motion.div
              key={group.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.08 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className={`h-2 bg-gradient-to-r ${group.accent}`} />
              <div className="p-5">
                <h3 className="font-black text-gray-900 dark:text-white mb-4">{group.level}</h3>
                <div className="space-y-2.5">
                  {group.channels.map((ch) => {
                    const Icon = socialIconMap[ch.platform];
                    return (
                      <a
                        key={ch.url}
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 text-sm font-semibold transition-all"
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" /> {ch.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support / payment */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center"><CreditCard size={24} className="text-orange-400" /></div>
            <div>
              <h3 className="font-black text-xl">دعم المحتوى والدفع السريع ⚡</h3>
              <p className="text-gray-400 text-sm">ساهم في استمرار المحتوى التعليمي المجاني</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 bg-black/30 rounded-xl p-3">
            <code dir="ltr" className="flex-1 text-orange-300 font-mono text-sm sm:text-base tracking-wider">{siteConfig.payment}</code>
            <button
              onClick={copyPayment}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              {copied ? <><Check size={15} /> تم النسخ</> : <><Copy size={15} /> نسخ</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
