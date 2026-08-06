"use client";
import { motion } from "framer-motion";
import { Award, BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61587746175552", color: "hover:bg-blue-600" },
  { label: "YouTube", href: "https://www.youtube.com/@Dr.abdelhadi", color: "hover:bg-red-600" },
  { label: "TikTok", href: "https://www.tiktok.com/@profpica", color: "hover:bg-gray-900" },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            من نحن؟
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
            التيم وراء <span className="text-orange-500">DzPhy</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 shadow-xl">
                  <Image
                    src="/about/teacher.jpg"
                    alt="Medjahed Abdelhadi"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                  <Award size={16} className="text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Medjahed Abdelhadi</h3>
              <p className="text-orange-500 font-bold mb-1">الأستاذ بيكا</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                مطور موقع DzPhy وأستاذ الفيزياء
              </p>

              <div className="bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-5 text-right mb-6">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  هدفي هو تقديم منصة جزائرية حديثة تساعد الطلبة على تعلم الفيزياء بطريقة ممتعة ومنظمة، وتوفير كل الموارد التعليمية في مكان واحد.
                </p>
              </div>

              <div className="flex items-center gap-2">
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
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white mt-6 text-center"
          >
            <Zap size={24} className="mx-auto mb-3" />
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
