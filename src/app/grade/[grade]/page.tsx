"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  ClipboardList,
  FlaskConical,
  Video,
  ArrowLeft,
  Beaker,
  Calculator,
  Sigma,
  BookType,
  CalendarRange,
  Download,
  Sparkles,
} from "lucide-react";
import { useParams, notFound } from "next/navigation";
import { getLevelByGradeParam, levelToDistributionLabel } from "@/lib/levels";

const sections = [
  { id: "resumes", label: "الملخصات", icon: BookOpen, desc: "ملخصات شاملة لجميع دروس الوحدة" },
  { id: "exercises", label: "التمارين والحلول", icon: FileText, desc: "تمارين متنوعة مع حلول مفصلة" },
  { id: "devoirs", label: "الفروض والاختبارات", icon: ClipboardList, desc: "نماذج فروض واختبارات مع الحلول" },
  { id: "tp", label: "الأعمال التطبيقية", icon: FlaskConical, desc: "تقارير وملخصات الأعمال التطبيقية", onlyScientific: true },
  { id: "videos", label: "الفيديوهات التعليمية", icon: Video, desc: "فيديوهات تعليمية مختارة" },
];

const scientificStreams = [
  { id: "sc", label: "علوم تجريبية", icon: Beaker },
  { id: "tm", label: "تقني رياضي", icon: Calculator },
  { id: "mt", label: "رياضيات", icon: Sigma },
];

export default function GradePage() {
  const params = useParams();
  const grade = params?.grade as string;
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [showSections, setShowSections] = useState(false);

  const level = getLevelByGradeParam(grade);
  if (!level) notFound();

  const handleStreamClick = (streamId: string) => {
    setSelectedStream(streamId);
    setShowSections(true);
  };

  const isScientific = !selectedStream || selectedStream !== "literary";
  const isBEM = level.key === "bem"; // middle school → no scientific/literary split

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-14 sm:pt-16">
      <div className={`bg-gradient-to-br ${level.gradient} text-white py-12 sm:py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            {" / "}
            <span className="text-white font-semibold">{level.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">{level.title}</h1>
            <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full">{level.badge}</span>
          </div>
          <p className="text-white/85 text-sm sm:text-lg max-w-2xl">{level.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Annual distribution banner (level colored) */}
        <Link
          href={`/distributions?level=${encodeURIComponent(levelToDistributionLabel[level.key])}`}
          className={`group flex items-center gap-4 mb-10 rounded-2xl p-5 bg-gradient-to-l ${level.gradient} text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <CalendarRange size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-lg">التوزيع السنوي — {level.title}</h3>
            <p className="text-white/85 text-sm">حمّل التوزيع السنوي الرسمي لمادة العلوم الفيزيائية بصيغة PDF مباشرة.</p>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 bg-white/20 group-hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0">
            <Download size={15} /> تحميل
          </span>
        </Link>

        {isBEM ? (
          /* ---- BEM / الرابعة متوسط: no streams, direct real content ---- */
          <BemSections level={level} />
        ) : !showSections ? (
          <>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">اختر الشعبة</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 sm:mb-8">اختر شعبتك للوصول إلى المحتوى المخصص</p>

            {grade === "1" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { id: "scientific", label: "الشعب العلمية", icon: Beaker, desc: "محتوى مخصص للشعب العلمية - فيزياء وكيمياء" },
                  { id: "literary", label: "الشعب الأدبية", icon: BookType, desc: "محتوى مخصص للشعب الأدبية" },
                ].map((stream) => (
                  <motion.button
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleStreamClick(stream.id)}
                    className={`group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-right hover:shadow-2xl ${level.border.replace("border-", "hover:border-")} transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]`}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center mb-5 text-white`}>
                      <stream.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{stream.label}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stream.desc}</p>
                    <div className={`flex items-center gap-1 ${level.text} text-sm font-semibold mt-4`}>اختر الشعبة <ArrowLeft size={14} /></div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <Beaker size={18} className={level.text} />
                  الشعب العلمية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
                  {scientificStreams.map((stream) => {
                    const Icon = stream.icon;
                    return (
                      <motion.button
                        key={stream.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleStreamClick(stream.id)}
                        className={`group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-6 text-right hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]`}
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center mb-4 text-white`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">{stream.label}</h3>
                        <p className="text-gray-400 text-sm">محتوى مخصص لشعبة {stream.label}</p>
                        <div className={`flex items-center gap-1 ${level.text} text-sm font-semibold mt-3`}>اختر <ArrowLeft size={14} /></div>
                      </motion.button>
                    );
                  })}
                </div>

                {grade === "2" && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <BookType size={20} className="text-gray-500 dark:text-gray-400" />
                      الشعب الأدبية
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleStreamClick("literary")}
                        className="group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-6 text-right hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center mb-4 text-white">
                          <BookType size={24} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">الشعب الأدبية</h3>
                        <p className="text-gray-400 text-sm">محتوى مخصص للشعب الأدبية</p>
                        <div className={`flex items-center gap-1 ${level.text} text-sm font-semibold mt-3`}>اختر <ArrowLeft size={14} /></div>
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <button
                onClick={() => { setShowSections(false); setSelectedStream(null); }}
                className={`flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:${level.text.split(" ")[0]} transition-colors`}
              >
                <ArrowLeft size={16} className="rotate-180" />
                الرجوع للشعب
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">
              {selectedStream === "literary" ? "المحتوى الدراسي - شعبة أدبية" : "المحتوى الدراسي - شعبة علمية"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 sm:mb-8">اختر القسم الذي تريد تصفحه</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
              {sections
                .filter((s) => isScientific || !s.onlyScientific)
                .map((section) => {
                  const Icon = section.icon;
                  return (
                    <Link
                      key={section.id}
                      href={`/grade/${grade}/${section.id}`}
                      className={`group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col gap-3 sm:gap-4`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${level.soft} flex items-center justify-center transition-colors`}>
                        <Icon size={22} className={level.text} />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1 transition-colors">
                          {section.label}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{section.desc}</p>
                      </div>
                      <div className={`flex items-center gap-1 ${level.text} text-sm font-semibold mt-auto`}>
                        استكشف
                        <ArrowLeft size={14} />
                      </div>
                    </Link>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// BEM has real content in videos + distributions (no PDF sections yet).
function BemSections({ level }: { level: ReturnType<typeof getLevelByGradeParam> }) {
  if (!level) return null;
  const cards = [
    { icon: Video, label: "الدروس التعليمية", desc: "جميع دروس الرابعة متوسط بالفيديو من قناة الأستاذ.", href: "/videos?level=bem" },
    { icon: Sparkles, label: "المكتسبات القبلية", desc: "مراجعة الأساسيات قبل انطلاق برنامج شهادة التعليم المتوسط.", href: "/videos?level=bem" },
    { icon: CalendarRange, label: "التوزيع السنوي", desc: "التوزيع الرسمي لمادة العلوم الفيزيائية والتكنولوجيا (PDF).", href: `/distributions?level=${encodeURIComponent(levelToDistributionLabel.bem)}` },
  ];
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3">محتوى شهادة التعليم المتوسط</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 sm:mb-8">اختر القسم الذي تريد تصفحه</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${level.soft} flex items-center justify-center`}>
                <Icon size={22} className={level.text} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1">{c.label}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{c.desc}</p>
              </div>
              <div className={`flex items-center gap-1 ${level.text} text-sm font-semibold mt-auto`}>
                استكشف <ArrowLeft size={14} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
