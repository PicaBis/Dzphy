"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, Send, MapPin, Phone, CreditCard } from "lucide-react";
import { socialLinks, siteConfig } from "@/data/site";
import { socialIconMap, LinktreeIcon } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

const quickLinks = [
  { key: "home", href: "/" },
  { key: "distributions", href: "/distributions" },
  { key: "grade1", href: "/grade/1" },
  { key: "grade2", href: "/grade/2" },
  { key: "grade3", href: "/grade/3" },
  { key: "courses", href: "/courses" },
  { key: "teacherBag", href: "/teacher" },
  { key: "follow", href: "/follow" },
  { key: "quizzes", href: "/quizzes" },
  { key: "flashcards", href: "/flashcards" },
  { key: "formulas", href: "/formulas" },
  { key: "bookmarks", href: "/bookmarks" },
  { key: "progress", href: "/progress" },
  { key: "calendar", href: "/calendar" },
  { key: "certificates", href: "/certificates" },
  { key: "assignments", href: "/assignments" },
  { key: "live", href: "/live" },
  { key: "profile", href: "/profile" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="DzPhy Logo" width={40} height={40} sizes="40px" className="object-contain" />
              </div>
              <span className="text-xl font-black">
                <span className="text-orange-500">Dz</span>
                <span className="text-white">Phy</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("footer.aboutText")}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.platform];
                return (
                  <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={t(social.label)}
                    className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 ${social.hover} hover:bg-gray-700 transition-all duration-200 hover:scale-110`}
                  ><Icon className="w-5 h-5" /></a>
                );
              })}
            </div>
            <a href={siteConfig.linktree} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors">
              <LinktreeIcon className="w-4 h-4" /> {t("footer.linktree")}
            </a>
          </div>

          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-5 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 bg-orange-500 rounded-full inline-block" />
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-400 text-sm flex items-center gap-2 transition-colors duration-200 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-500 transition-colors flex-shrink-0" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-5 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 bg-orange-500 rounded-full inline-block" />
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-orange-500 flex-shrink-0" />
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  {t("footer.contact")} بنا
                </Link>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{t(siteConfig.contact.location)}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-5 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-5 bg-orange-500 rounded-full inline-block" />
              {t("footer.sendMessage")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("footer.emailPh")} required
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("footer.messagePh")} required rows={3}
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none" />
              <button type="submit"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${sent ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-900/30"}`}
              >
                {sent ? t("footer.sent") : <><Send size={14} />{t("footer.send")}</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-gray-500 text-xs sm:text-sm">© 2026 <span className="text-orange-500 font-semibold">{t("splash.logoTitle")}</span> - {t("footer.rights")}</p>
          <p className="text-gray-600 text-xs">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
