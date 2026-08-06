"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, FileText, ClipboardList, FlaskConical, Video, ArrowLeft, Beaker, Calculator, Sigma, BookType, CalendarRange, Download } from "lucide-react";
import { useParams, notFound } from "next/navigation";

const gradeInfo: Record<string, { label: string; gradient: string; lightGrad: string; description: string }> = {
  "1": { label: "السنة الأولى ثانوي", gradient: "from-blue-500 to-blue-700", lightGrad: "from-blue-50 to-blue-100", description: "ملخصات، تمارين، وفروض السنة الأولى ثانوي - مقدمة في الفيزياء والكيمياء" },
  "2": { label: "السنة الثانية ثانوي", gradient: "from-orange-500 to-orange-700", lightGrad: "from-orange-50 to-orange-100", description: "قوانين نيوتن، الطاقة، الدوائر الكهربائية والتفاعلات الكيميائية" },
  "3": { label: "السنة الثالثة ثانوي", gradient: "from-purple-500 to-purple-700", lightGrad: "from-purple-50 to-purple-100", description: "الإعداد للباكالوريا - الميكانيكا، الموجات، الكيمياء الكهربائية والنووية" },
};

const sections = [
  { id: "resumes", label: "الملخصات", icon: BookOpen, desc: "ملخصات شاملة لجميع دروس الوحدة" },
  { id: "exercises", label: "التمارين والحلول", icon: FileText, desc: "تمارين متنوعة مع حلول مفصلة" },
  { id: "devoirs", label: "الفروض والاختبارات", icon: ClipboardList, desc: "نماذج فروض واختبارات مع الحلول" },
  { id: "tp", label: "الأعمال التطبيقية", icon: FlaskConical, desc: "تقارير وملخصات الأعمال التطبيقية", onlyScientific: true },
  { id: "videos", label: "الفيديوهات التعليمية", icon: Video, desc: "فيديوهات تعليمية مختارة" },
];

const scientificStreams = [
  { id: "sc", label: "علوم تجريبية", icon: Beaker, color: "from-green-500 to-green-700", lightColor: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" },
  { id: "tm", label: "تقني رياضي", icon: Calculator, color: "from-blue-500 to-blue-700", lightColor: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30" },
  { id: "mt", label: "رياضيات", icon: Sigma, color: "from-orange-500 to-orange-700", lightColor: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30" },
];

export default function GradePage() {
  const params = useParams();
  const grade = params?.grade as string;
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [showSections, setShowSections] = useState(false);

  const info = gradeInfo[grade];
  if (!info) notFound();

  const handleStreamClick = (streamId: string) => {
    setSelectedStream(streamId);
    setShowSections(true);
  };

  const isScientific = !selectedStream || selectedStream !== "literary";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className={`bg-gradient-to-br ${info.gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            {" / "}
            <span className="text-white font-semibold">{info.label}</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">{info.label}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{info.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Annual distribution banner */}
        <Link
          href={`/distributions?level=${encodeURIComponent(info.label)}`}
          className="group flex items-center gap-4 mb-10 rounded-2xl p-5 bg-gradient-to-l from-orange-500 to-orange-600 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <CalendarRange size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-lg">التوزيع السنوي — {info.label}</h3>
            <p className="text-white/80 text-sm">حمّل التوزيع السنوي الرسمي لمادة العلوم الفيزيائية بصيغة PDF مباشرة.</p>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 bg-white/20 group-hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex-shrink-0">
            <Download size={15} /> تحميل
          </span>
        </Link>

        {!showSections ? (
          <>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">اختر الشعبة</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">اختر شعبتك للوصول إلى المحتوى المخصص</p>

            {/* Grade 1: Scientific + Literary only */}
            {grade === "1" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: "scientific", label: "الشعب العلمية", icon: Beaker, color: "from-blue-500 to-blue-600", desc: "محتوى مخصص للشعب العلمية - فيزياء وكيمياء" },
                  { id: "literary", label: "الشعب الأدبية", icon: BookType, color: "from-gray-500 to-gray-700", desc: "محتوى مخصص للشعب الأدبية" },
                ].map((stream) => (
                  <motion.button
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleStreamClick(stream.id)}
                    className={`group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 text-right hover:shadow-2xl hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stream.color} flex items-center justify-center mb-5 text-white`}>
                      <stream.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{stream.label}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stream.desc}</p>
                    <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold mt-4">اختر الشعبة <ArrowLeft size={14} /></div>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Grade 2 & 3: Scientific sub-streams + Literary */
              <>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Beaker size={20} className="text-orange-500" />
                  الشعب العلمية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                  {scientificStreams.map((stream) => {
                    const Icon = stream.icon;
                    return (
                      <motion.button
                        key={stream.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleStreamClick(stream.id)}
                        className={`group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-right hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1`}
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stream.color} flex items-center justify-center mb-4 text-white`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">{stream.label}</h3>
                        <p className="text-gray-400 text-sm">محتوى مخصص لشعبة {stream.label}</p>
                        <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold mt-3">اختر <ArrowLeft size={14} /></div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleStreamClick("literary")}
                        className="group bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-right hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center mb-4 text-white">
                          <BookType size={24} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">الشعب الأدبية</h3>
                        <p className="text-gray-400 text-sm">محتوى مخصص للشعب الأدبية</p>
                        <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold mt-3">اختر <ArrowLeft size={14} /></div>
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => { setShowSections(false); setSelectedStream(null); }}
                className="flex items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                <ArrowLeft size={16} className="rotate-180" />
                الرجوع للشعب
              </button>
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
              {selectedStream === "literary" ? "المحتوى الدراسي - شعبة أدبية" : "المحتوى الدراسي - شعبة علمية"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">اختر القسم الذي تريد تصفحه</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sections
                .filter((s) => isScientific || !s.onlyScientific)
                .map((section) => {
                  const Icon = section.icon;
                  return (
                    <Link
                      key={section.id}
                      href={`/grade/${grade}/${section.id}`}
                      className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 transition-colors">
                        <Icon size={22} className="text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {section.label}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{section.desc}</p>
                      </div>
                      <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold mt-auto">
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
