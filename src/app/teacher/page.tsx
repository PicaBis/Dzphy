import { ArrowLeft } from "lucide-react";
import ZoomableImage from "@/components/ui/ZoomableImage";

export default function TeacherPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-3">حقيبة الأستاذ</h1>
          <p className="text-gray-400 text-lg max-w-2xl">موارد تعليمية متكاملة لأساتذة الفيزياء</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-10 border-2 border-gray-200 dark:border-gray-700 shadow-md">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3 text-center">
            حقيبة الأستاذ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-10 max-w-2xl mx-auto text-lg">
            انضم إلى قناة التلغرام للحصول على آخر التحديثات والملفات والتمارين والموارد التعليمية
          </p>
          <div className="flex flex-col items-center gap-8">
            <ZoomableImage
              src="/about/telegram.png"
              alt="قناة التلغرام - الأستاذ بيكا"
              width={640}
              height={640}
              sizes="(max-width: 768px) 380px, 500px"
              className="w-96 h-96 sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] rounded-2xl overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 shadow-2xl hover:shadow-xl transition-all"
              imgClassName="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            <a
              href="https://t.me/addlist/zyYD4lHlYudlNzQ8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              انضم إلى القناة
              <ArrowLeft size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
