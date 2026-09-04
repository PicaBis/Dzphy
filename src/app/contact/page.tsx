"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 2000));
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-600 dark:to-teal-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">اتصل بنا</h1>
          <p className="text-teal-100 text-sm sm:text-base">
            نحب أن نسمع منك — أرسل لنا استفسارك أو اقتراحك وسنرد في أقرب وقت
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-teal-500" />
                معلومات التواصل
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">البريد الإلكتروني</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">contact@dzphy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">الهاتف</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white" dir="ltr">+213 XX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">الموقع</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">الجزائر</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">وقت الرد</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">خلال 24-48 ساعة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">روابط سريعة</h3>
              <div className="space-y-2">
                <a href="https://linktr.ee/profpica" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  <AlertCircle size={14} />
                  الرابط الشامل — كل المنصات
                </a>
                <a href="/faq" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  <AlertCircle size={14} />
                  الأسئلة الشائعة
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">أرسل رسالة</h2>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">تم الإرسال بنجاح!</h3>
                    <p className="text-gray-500 dark:text-gray-400">شكرًا لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">الاسم الكامل</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:text-white"
                          placeholder="اسمك"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">البريد الإلكتروني</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:text-white"
                          placeholder="example@email.com"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">الموضوع</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:text-white"
                        placeholder="موضوع الرسالة"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">الرسالة</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 dark:text-white resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          إرسال الرسالة
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
