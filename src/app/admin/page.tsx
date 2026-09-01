"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, FileText, ClipboardList, Video, BookMarked, Cpu,
  Megaphone, Plus, Edit3, Trash2, BarChart2, Users, Eye, TrendingUp,
  Search, Upload, Save, X
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  { id: "dashboard", label: "لوحة التحكم", icon: BarChart2 },
  { id: "resumes", label: "الملخصات", icon: BookOpen },
  { id: "exercises", label: "التمارين", icon: FileText },
  { id: "devoirs", label: "الفروض", icon: ClipboardList },
  { id: "videos", label: "الفيديوهات", icon: Video },
  { id: "courses", label: "الدورات", icon: BookMarked },
  { id: "apps", label: "التطبيقات", icon: Cpu },
  { id: "announcements", label: "الإعلانات", icon: Megaphone },
];

const stats = [
  { icon: BookOpen, value: "58", label: "ملخص", color: "bg-blue-50 text-blue-600", trend: "+5 هذا الشهر" },
  { icon: Users, value: "5,234", label: "طالب", color: "bg-green-50 text-green-600", trend: "+120 هذا الأسبوع" },
  { icon: Eye, value: "24,891", label: "مشاهدة", color: "bg-orange-50 text-orange-600", trend: "+1,200 اليوم" },
  { icon: TrendingUp, value: "94%", label: "رضا الطلاب", color: "bg-purple-50 text-purple-600", trend: "↑ 2% هذا الشهر" },
];

const mockItems = [
  { id: "1", title: "ملخص الحركة المستقيمة المنتظمة", grade: "السنة الأولى", subject: "الميكانيكا", date: "2026-06-10", status: "منشور" },
  { id: "2", title: "تمارين محلولة - الكهرباء", grade: "السنة الثانية", subject: "الكهرباء", date: "2026-06-08", status: "منشور" },
  { id: "3", title: "فرض الفصل الثاني - ميكانيكا", grade: "السنة الثالثة", subject: "الميكانيكا", date: "2026-06-05", status: "مسودة" },
];

interface FormData {
  title: string;
  grade: string;
  subject: string;
  description: string;
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<typeof mockItems[0] | null>(null);
  const [items, setItems] = useState(mockItems);
  const [formData, setFormData] = useState<FormData>({ title: "", grade: "السنة الأولى", subject: "", description: "" });
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    setEditItem(null);
    setFormData({ title: "", grade: "السنة الأولى", subject: "", description: "" });
    setShowForm(true);
  };

  const handleEdit = (item: typeof mockItems[0]) => {
    setEditItem(item);
    setFormData({ title: item.title, grade: item.grade, subject: item.subject, description: "" });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    if (editItem) {
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, title: formData.title, grade: formData.grade, subject: formData.subject } : i));
    } else {
      setItems((prev) => [...prev, { id: Date.now().toString(), title: formData.title, grade: formData.grade, subject: formData.subject, date: new Date().toISOString().split("T")[0], status: "مسودة" }]);
    }
    setShowForm(false);
  };

  const filtered = items.filter((i) => i.title.includes(search) || i.subject.includes(search));

  return (
    <div className="min-h-screen bg-gray-100 pt-16 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="logo" width={32} height={32} sizes="32px" className="object-contain" />
              </div>
            <span className="font-black text-lg">
              <span className="text-orange-500">Dz</span>Phy
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1">لوحة التحكم</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-sm">م</div>
            <div>
              <p className="text-sm font-semibold text-white">الأستاذ بيكا</p>
              <p className="text-xs text-gray-500">مشرف</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-gray-900">
                {sidebarItems.find((s) => s.id === activeSection)?.label}
              </h1>
              <p className="text-gray-500 text-sm">إدارة محتوى موقع DzPhy</p>
            </div>
            {activeSection !== "dashboard" && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-orange-200 hover:shadow-md"
              >
                <Plus size={16} />
                إضافة جديد
              </button>
            )}
          </div>

          {/* Dashboard Stats */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all"
                    >
                      <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <Icon size={20} />
                      </div>
                      <div className="text-3xl font-black text-gray-900 mb-0.5">{stat.value}</div>
                      <div className="text-gray-500 text-sm mb-2">{stat.label}</div>
                      <div className="text-xs text-green-600 font-semibold">{stat.trend}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">آخر الإضافات</h2>
                <div className="space-y-3">
                  {mockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.grade} • {item.subject} • {item.date}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.status === "منشور" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Sections */}
          {activeSection !== "dashboard" && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث..."
                  className="w-full pr-10 pl-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-right px-5 py-3 font-bold text-gray-600">العنوان</th>
                        <th className="text-right px-5 py-3 font-bold text-gray-600">المستوى</th>
                        <th className="text-right px-5 py-3 font-bold text-gray-600">المادة</th>
                        <th className="text-right px-5 py-3 font-bold text-gray-600">التاريخ</th>
                        <th className="text-right px-5 py-3 font-bold text-gray-600">الحالة</th>
                        <th className="text-right px-5 py-3 font-bold text-gray-600">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4 font-medium text-gray-900">{item.title}</td>
                          <td className="px-5 py-4 text-gray-500">{item.grade}</td>
                          <td className="px-5 py-4 text-gray-500">{item.subject}</td>
                          <td className="px-5 py-4 text-gray-400">{item.date}</td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.status === "منشور" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                <Edit3 size={15} />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-400">لا توجد عناصر</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-black text-gray-900">{editItem ? "تعديل العنصر" : "إضافة عنصر جديد"}</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">العنوان</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="عنوان المحتوى"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">المستوى</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option>السنة الأولى</option>
                      <option>السنة الثانية</option>
                      <option>السنة الثالثة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">المادة</label>
                    <input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="مثال: الميكانيكا"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="وصف المحتوى..."
                  />
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">انقر لرفع ملف PDF</p>
                </div>
              </div>

              <div className="flex gap-3 p-5 border-t border-gray-100">
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all">
                  <Save size={15} />
                  حفظ
                </button>
                <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-sm transition-all">
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
