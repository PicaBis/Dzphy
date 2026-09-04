"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Assignment {
  id: string;
  title: string;
  description: string;
  grade: number;
  topic: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade_received?: number;
  maxGrade: number;
  feedback?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "a1",
    title: "تمارين الميكانيكا — الحركة المستقيمة",
    description: "حل التمارين 1-5 من صفحة 23 في الكتاب المدرسي. يجب إظهار جميع الخطوات.",
    grade: 1,
    topic: "الميكانيكا",
    dueDate: "2026-09-15",
    status: "pending",
    maxGrade: 20,
  },
  {
    id: "a2",
    title: "تقرير عملي — الدارة الكهربائية",
    description: "قم بتركيب دارة كهربائية بسيطة على التوالي وقياس التوتر وشدة التيار. اكتب تقريرًا مع الرسم.",
    grade: 2,
    topic: "الكهرباء",
    dueDate: "2026-09-20",
    status: "submitted",
    maxGrade: 20,
  },
  {
    id: "a3",
    title: "اختبار الموجات — الفصل الأول",
    description: "اختبار شامل يغطي: سرعة الموجة، الحيود، التداخل، ظاهرة دوبلر.",
    grade: 3,
    topic: "الموجات",
    dueDate: "2026-09-10",
    status: "graded",
    grade_received: 17,
    maxGrade: 20,
    feedback: "أداء ممتاز! راجع فقط حساب فرق المسار في التداخل.",
  },
];

export default function AssignmentsPage() {
  const { lang, t } = useLanguage();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const pendingCount = assignments.filter((a) => a.status === "pending").length;
  const submittedCount = assignments.filter((a) => a.status === "submitted").length;
  const gradedCount = assignments.filter((a) => a.status === "graded").length;

  const handleUpload = () => {
    if (!selectedAssignment) return;
    const updated = assignments.map((a) =>
      a.id === selectedAssignment.id ? { ...a, status: "submitted" as const } : a
    );
    setAssignments(updated);
    setShowUpload(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <FileText size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الواجبات والتسليم</h1>
          <p className="text-teal-100 text-sm sm:text-base">تصفح الواجبات وسلم حلولك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-orange-500">{pendingCount}</p>
            <p className="text-xs text-gray-500">قيد الانتظار</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-blue-500">{submittedCount}</p>
            <p className="text-xs text-gray-500">تم التسليم</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-green-500">{gradedCount}</p>
            <p className="text-xs text-gray-500">تم التصحيح</p>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-3">
          {assignments.map((a) => {
            const isOverdue = new Date(a.dueDate) < new Date() && a.status === "pending";
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        a.status === "pending" ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" :
                        a.status === "submitted" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" :
                        "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                      }`}>
                        {a.status === "pending" ? "قيد الانتظار" : a.status === "submitted" ? "تم التسليم" : "تم التصحيح"}
                      </span>
                      {isOverdue && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle size={10} />
                          متأخر
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{a.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{a.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        آخر تسليم: {new Date(a.dueDate).toLocaleDateString("ar-DZ")}
                      </span>
                      <span>السنة {a.grade}</span>
                      <span>{a.topic}</span>
                    </div>
                    {a.status === "graded" && a.grade_received !== undefined && (
                      <div className="mt-3 bg-green-50 dark:bg-green-500/10 rounded-lg p-3">
                        <p className="text-sm font-bold text-green-700 dark:text-green-400">
                          النتيجة: {a.grade_received}/{a.maxGrade}
                        </p>
                        {a.feedback && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{a.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    {a.status === "pending" && (
                      <button
                        onClick={() => { setSelectedAssignment(a); setShowUpload(true); }}
                        className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        <Upload size={12} />
                        تسليم
                      </button>
                    )}
                    {a.status === "submitted" && (
                      <span className="flex items-center gap-1.5 text-blue-500 text-xs font-bold">
                        <CheckCircle size={12} />
                        في انتظار التصحيح
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upload Modal */}
        {showUpload && selectedAssignment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl"
            >
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white">تسليم الواجب</h2>
                <p className="text-xs text-gray-400 mt-1">{selectedAssignment.title}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-teal-400 transition-colors cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">اضغط لرفع ملف PDF أو صورة</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — حد أقصى 10MB</p>
                </div>
                <textarea
                  placeholder="ملاحظات إضافية (اختياري)..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 dark:text-white resize-none"
                />
              </div>
              <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleUpload}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
                >
                  تأكيد التسليم
                </button>
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
