"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowLeft, FileText, ClipboardList, FlaskConical, Video } from "lucide-react";

const grades = [
  { level: "1", title: "السنة الأولى ثانوي", description: "مقدمة في الفيزياء والكيمياء - أسس الميكانيكا والكهرباء", color: "from-blue-500 to-blue-600", lightColor: "bg-blue-50 dark:bg-blue-500/10", iconColor: "text-blue-500", borderColor: "border-blue-200 dark:border-blue-500/30", topics: ["الميكانيكا", "الكهرباء", "الكيمياء"], href: "/grade/1" },
  { level: "2", title: "السنة الثانية ثانوي", description: "قوانين نيوتن، الطاقة الحركية، الدوائر الكهربائية", color: "from-orange-500 to-orange-600", lightColor: "bg-orange-50 dark:bg-orange-500/10", iconColor: "text-orange-500", borderColor: "border-orange-200 dark:border-orange-500/30", topics: ["قوانين نيوتن", "الطاقة", "الكهرباء"], href: "/grade/2", featured: true },
  { level: "3", title: "السنة الثالثة ثانوي", description: "الإعداد للباكالوريا - الموجات، الميكانيكا المتقدمة", color: "from-purple-500 to-purple-600", lightColor: "bg-purple-50 dark:bg-purple-500/10", iconColor: "text-purple-500", borderColor: "border-purple-200 dark:border-purple-500/30", topics: ["الموجات", "النووي", "الباك"], href: "/grade/3" },
];

const subItems = [
  { icon: BookOpen, label: "ملخصات" }, { icon: FileText, label: "تمارين" }, { icon: ClipboardList, label: "فروض" }, { icon: FlaskConical, label: "عملي" }, { icon: Video, label: "فيديو" },
];

export default function GradeCards() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">المراحل الدراسية</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4">اختر <span className="text-orange-500">مستواك الدراسي</span></h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">محتوى مخصص لكل سنة دراسية يغطي جميع وحدات المنهاج الجزائري</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {grades.map((grade, i) => (
            <motion.div key={grade.level} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15, ease: "easeOut" }}
              className={`relative group bg-white dark:bg-gray-800 rounded-3xl border-2 ${grade.borderColor} overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-[0.98] ${grade.featured ? "ring-2 ring-orange-400 ring-offset-2 dark:ring-offset-gray-900" : ""}`}
            >
              {grade.featured && <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">الأكثر طلبا</div>}
              <div className={`bg-gradient-to-br ${grade.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-black opacity-20">{grade.level}</span>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><BookOpen size={22} className="text-white" /></div>
                </div>
                <h3 className="text-xl font-black">{grade.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">{grade.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {grade.topics.map((t) => (
                    <span key={t} className={`text-xs font-semibold ${grade.lightColor} ${grade.iconColor} px-3 py-1 rounded-full`}>{t}</span>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-1 mb-6">
                  {subItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-xl ${grade.lightColor} flex items-center justify-center`}><Icon size={14} className={grade.iconColor} /></div>
                        <span className="text-[9px] text-gray-500 dark:text-gray-400 text-center leading-tight">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                <Link href={grade.href} className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 bg-gradient-to-r ${grade.color} text-white hover:shadow-lg hover:scale-[1.02]`}>
                  استكشف القسم <ArrowLeft size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
