"use client";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import ZoomableImage from "@/components/ui/ZoomableImage";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/191btmBHho/", color: "hover:bg-blue-600" },
  { label: "YouTube", href: "https://www.youtube.com/@ProfPica", color: "hover:bg-red-600" },
  { label: "Instagram", href: "https://www.instagram.com/prof_pica/", color: "hover:bg-pink-600" },
  { label: "TikTok", href: "https://www.tiktok.com/@profpica", color: "hover:bg-gray-900" },
  { label: "Telegram", href: "https://t.me/addlist/zyYD4lHlYudlNzQ8", color: "hover:bg-sky-600" },
];

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            ✍️ الأستاذ بيكا 🎓
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-4">
            من هو <span className="text-orange-500">الأستاذ بيكا</span>؟
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="relative">
                <ZoomableImage
                  src="/about/cv.png"
                  alt="السيرة الذاتية - الأستاذ بيكا"
                  width={440}
                  height={620}
                  sizes="(max-width: 640px) 288px, (max-width: 768px) 340px, 380px"
                  className="w-72 h-[26rem] sm:w-[21rem] sm:h-[30rem] rounded-2xl overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 shadow-2xl"
                  imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <p className="mt-3 text-center text-xs font-semibold text-gray-400 dark:text-gray-500">
                  اضغط على الصورة لتكبيرها وقراءة السيرة بوضوح
                </p>
                <div className="absolute top-2 -right-3 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                  <Award size={20} className="text-white" />
                </div>
              </div>

              <div className="space-y-3 text-right w-full">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white text-center">
                  خريج المدرسة العليا للأساتذة
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-bold text-center text-base sm:text-lg">
                  أبسّط الفيزياء بطريقة سهلة وممتعة 💡
                </p>
                <div className="bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-5 text-center space-y-2">
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    📝 ملخصات منظمة وشاملة
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    📚 حلول تمارين محلولة خطوة بخطوة
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    💡 أفكارٌ لن تجدها في الكتب
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  🔗👇 تابعونا عبر الروابط
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-xl border border-gray-100 dark:border-gray-600 hover:text-white transition-all ${s.color}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 sm:p-6 text-white mt-4 sm:mt-6 text-center"
          >
            <Sparkles size={24} className="mx-auto mb-3" />
            <h4 className="font-black text-lg mb-2">رسالتنا</h4>
            <p className="text-orange-100 text-sm leading-relaxed">
              جعل تعلم الفيزياء تجربة ممتعة وميسرة لكل طالب جزائري، من خلال توفير أفضل المحتويات التعليمية والأدوات الذكية المجانية.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
