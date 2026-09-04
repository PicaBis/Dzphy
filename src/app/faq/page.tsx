"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const faqsAr = [
  {
    category: "عام",
    questions: [
      {
        q: "ما هي منصة الأستاذ بيكا للفيزياء؟",
        a: "منصة تعليمية جزائرية متخصصة في الفيزياء، تقدم ملخصات وتمارين محلولة وفروض واختبارات ودورات تعليمية وتطبيقات ذكية لطلاب الثانوي والمتوسط.",
      },
      {
        q: "هل المنصة مجانية؟",
        a: "نعم! معظم المحتوى متاح مجانًا، بما في ذلك الملخصات والتمارين والفيديوهات. هناك بعض الدورات المتقدمة المدفوعة بأسعار رمزية.",
      },
      {
        q: "هل المحتوى مطابق للمنهاج الجزائري؟",
        a: "نعم، جميع المحتويات مصممة وفق المنهاج الرسمي لوزارة التربية الوطنية الجزائرية ومحدثة باستمرار.",
      },
    ],
  },
  {
    category: "الفيديوهات والدروس",
    questions: [
      {
        q: "أين أجد فيديوهات الدروس؟",
        a: "يمكنك الوصول إلى جميع الفيديوهات من صفحة 'الفيديوهات' في القائمة الرئيسية، أو من خلال اختيار مستواك الدراسي ثم قسم الدروس التعليمية.",
      },
      {
        q: "هل الفيديوهات مرتبة حسب المستوى؟",
        a: "نعم، الفيديوهات مرتبة في قوائم تشغيل حسب المستوى الدراسي والشعبة، وتُحدَّث تلقائيًا من قناة يوتيوب.",
      },
    ],
  },
  {
    category: "الملفات والتحميل",
    questions: [
      {
        q: "كيف أحمل الملفات PDF؟",
        a: "اذهب إلى صفحة 'التوزيعات' أو اختر مستواك الدراسي وستجد روابط تحميل مباشرة بصيغة PDF لكل ملف.",
      },
      {
        q: "هل يمكنني طباعة الملخصات؟",
        a: "بالطبع! جميع الملفات بصيغة PDF ويمكنك طباعتها أو حفظها على جهازك.",
      },
    ],
  },
  {
    category: "الحساب والمفضلة",
    questions: [
      {
        q: "كيف أحفظ المحتوى المفضل؟",
        a: "اضغط على أيقونة المرجعية (Bookmark) على أي فيديو أو ملخص أو تمرين لحفظه. يمكنك الوصول إلى جميع محفوظاتك من صفحة 'المفضلة'.",
      },
      {
        q: "هل المفضلة محفوظة بشكل دائم؟",
        a: "المفضلة محفوظة في متصفحك الحالي. إذا مسحت بيانات المتصفح ستفقد المحفوظات.",
      },
    ],
  },
  {
    category: "التواصل والدعم",
    questions: [
      {
        q: "كيف أتواصل مع الأستاذ بيكا؟",
        a: "يمكنك التواصل عبر صفحة 'اتصل بنا' أو عبر منصات التواصل الاجتماعي (يوتيوب، تلغرام، إنستغرام، فيسبوك) الموجودة في صفحة 'تابعونا'.",
      },
      {
        q: "هل يمكنني اقتراح محتوى جديد؟",
        a: "نعم! نرحب بجميع الاقتراحات عبر صفحة 'اتصل بنا' أو عبر قنوات التواصل الاجتماعي.",
      },
    ],
  },
];

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqsAr
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <HelpCircle size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">الأسئلة الشائعة</h1>
          <p className="text-indigo-100 text-sm sm:text-base">
            إجابات سريعة على أكثر الأسئلة تكرارًا — إذا لم تجد إجابتك، تواصل معنا
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في الأسئلة..."
            className="w-full pr-12 pl-4 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 dark:text-white"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filtered.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="w-2 h-6 rounded-full bg-indigo-500" />
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((faq, idx) => {
                  const key = `${catIdx}-${idx}`;
                  const isOpen = openIndex === key;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج لـ &quot;{search}&quot;</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-10 text-center bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-6 border-2 border-indigo-100 dark:border-indigo-500/20">
          <p className="text-gray-900 dark:text-white font-bold mb-2">لم تجد إجابتك؟</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">تواصل معنا مباشرة وسنساعدك</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            اتصل بنا
          </a>
        </div>
      </div>
    </div>
  );
}
