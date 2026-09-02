import Link from "next/link";
import { BookOpen, FileText, ClipboardList, ArrowLeft } from "lucide-react";
import ZoomableImage from "@/components/ui/ZoomableImage";

const teacherResources = [
  { icon: BookOpen, title: "خطط الدروس", description: "خطط دروس جاهزة وفق المنهاج الرسمي الجزائري", href: "#" },
  { icon: FileText, title: "نماذج الفروض", description: "نماذج فروض جاهزة قابلة للتعديل والطباعة", href: "#" },
  { icon: ClipboardList, title: "اختبارات التقييم", description: "اختبارات متنوعة لتقييم مستوى الطلاب", href: "#" },
];

export default function TeacherPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-3">حقيبة الأستاذ</h1>
          <p className="text-gray-400 text-lg max-w-2xl">موارد تعليمية متكاملة لأساتذة الفيزياء</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {teacherResources.map((r, i) => {
            const Icon = r.icon;
            return (
              <Link key={i} href={r.href} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">{r.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{r.description}</p>
                <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
                  استكشف <ArrowLeft size={14} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6 text-center">
            📱 تواصل مع الأستاذ عبر تلغرام
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            انضم إلى قناة التلغرام للحصول على آخر التحديثات والملفات والتمارين
          </p>
          <div className="flex flex-col items-center gap-6">
            <ZoomableImage
              src="/about/telegram.png"
              alt="قناة التلغرام - الأستاذ بيكا"
              width={640}
              height={640}
              sizes="(max-width: 640px) 320px, 400px"
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 shadow-2xl"
              imgClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <a
              href="https://t.me/addlist/zyYD4lHlYudlNzQ8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              انضم إلى القناة
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
