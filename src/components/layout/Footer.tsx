"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, Send, MapPin, Phone } from "lucide-react";

const FB = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
);
const YT = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
);
const IG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const TK = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" /></svg>
);

const socialLinks = [
  { icon: FB, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587746175552", color: "hover:text-blue-500" },
  { icon: YT, label: "YouTube", href: "https://www.youtube.com/@Dr.abdelhadi", color: "hover:text-red-500" },
  { icon: IG, label: "Instagram", href: "https://www.instagram.com/", color: "hover:text-pink-500" },
  { icon: TK, label: "TikTok", href: "https://www.tiktok.com/@profpica", color: "hover:text-white" },
];

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "السنة الأولى ثانوي", href: "/grade/1" },
  { label: "السنة الثانية ثانوي", href: "/grade/2" },
  { label: "السنة الثالثة ثانوي", href: "/grade/3" },
  { label: "الدورات التعليمية", href: "/courses" },
  { label: "التطبيقات والبرامج", href: "/apps" },
  { label: "من نحن؟", href: "/about" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
    setMessage("");
  };

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="DzPhy Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-black">
                <span className="text-orange-500">Dz</span>
                <span className="text-white">Phy</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              منصة الفيزياء الجزائرية الأولى التي تجمع كل ما يحتاجه الطالب في مكان واحد.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-200 hover:scale-110`}
                  ><Icon /></a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
              روابط سريعة
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-400 text-sm flex items-center gap-2 transition-colors duration-200 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-orange-500 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
              تواصل معنا
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-orange-500 flex-shrink-0" />
                <span>contact@dzphy.dz</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-orange-500 flex-shrink-0" />
                <span dir="ltr">+213 541 912 597</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <span>الجزائر</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full inline-block" />
              أرسل رسالة
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="رسالتك..." required rows={3}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none" />
              <button type="submit"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${sent ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-900/30"}`}
              >
                {sent ? "✓ تم الإرسال بنجاح!" : <><Send size={14} />إرسال</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2026 <span className="text-orange-500 font-semibold">DzPhy</span> - جميع الحقوق محفوظة</p>
          <p className="text-gray-600 text-xs">صُمِّم ب ❤️ للطالب الجزائري</p>
        </div>
      </div>
    </footer>
  );
}
