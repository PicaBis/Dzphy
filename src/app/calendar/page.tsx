"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  BookOpen,
  Video,
  Zap,
  Layers,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "dzphy-study-calendar";

interface StudyEvent {
  id: string;
  date: string;
  time: string;
  type: "lesson" | "video" | "quiz" | "review" | "exam";
  title: string;
  completed: boolean;
}

function getEvents(): StudyEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEvents(events: StudyEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // ignore
  }
}

const typeConfig = {
  lesson: { icon: BookOpen, color: "bg-blue-500", label: "درس" },
  video: { icon: Video, color: "bg-red-500", label: "فيديو" },
  quiz: { icon: Zap, color: "bg-purple-500", label: "اختبار" },
  review: { icon: Layers, color: "bg-cyan-500", label: "مراجعة" },
  exam: { icon: Calendar, color: "bg-orange-500", label: "امتحان" },
};

export default function CalendarPage() {
  const { lang, t } = useLanguage();
  const [events, setEvents] = useState<StudyEvent[]>(getEvents());
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<StudyEvent, "id" | "completed">>({
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "lesson",
    title: "",
  });

  const addEvent = () => {
    if (!newEvent.title.trim()) return;
    const event: StudyEvent = {
      ...newEvent,
      id: Date.now().toString(),
      completed: false,
    };
    const updated = [...events, event].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    setEvents(updated);
    saveEvents(updated);
    setShowForm(false);
    setNewEvent({ date: new Date().toISOString().split("T")[0], time: "09:00", type: "lesson", title: "" });
  };

  const toggleComplete = (id: string) => {
    const updated = events.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e));
    setEvents(updated);
    saveEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
  };

  const completedCount = events.filter((e) => e.completed).length;
  const today = new Date().toISOString().split("T")[0];
  const todayEvents = events.filter((e) => e.date === today);
  const upcomingEvents = events.filter((e) => e.date >= today && !e.completed);

  // Group by date
  const grouped: Record<string, StudyEvent[]> = {};
  events.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 py-12 sm:py-16 rounded-3xl text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Calendar size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الجدول الدراسي</h1>
          <p className="text-pink-100 text-sm sm:text-base">نظم وقتك وخطط لدراستك بذكاء</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-gray-900 dark:text-white">{events.length}</p>
            <p className="text-xs text-gray-500">إجمالي المهام</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-green-500">{completedCount}</p>
            <p className="text-xs text-gray-500">مكتملة</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 p-4 text-center">
            <p className="text-2xl font-black text-orange-500">{todayEvents.length}</p>
            <p className="text-xs text-gray-500">اليوم</p>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold text-sm transition-all mb-6"
        >
          <Plus size={16} />
          إضافة مهمة جديدة
        </button>

        {/* Add Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 p-5 mb-6 space-y-4"
          >
            <input
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="عنوان المهمة..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:text-white"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(typeConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setNewEvent({ ...newEvent, type: key as StudyEvent["type"] })}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    newEvent.type === key
                      ? `${config.color} text-white`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <config.icon size={12} />
                  {config.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={addEvent}
                disabled={!newEvent.title.trim()}
                className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}

        {/* Events by Date */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">لا توجد مهام بعد — أضف مهمتك الأولى!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, dateEvents]) => {
              const isToday = date === today;
              const dateObj = new Date(date);
              const dayName = dateObj.toLocaleDateString("ar-DZ", { weekday: "long" });
              const dateStr = dateObj.toLocaleDateString("ar-DZ", { month: "long", day: "numeric" });

              return (
                <div key={date}>
                  <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isToday ? "text-pink-500" : "text-gray-500 dark:text-gray-400"}`}>
                    {isToday && <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />}
                    {isToday ? "اليوم" : dayName} — {dateStr}
                    <span className="text-xs font-normal text-gray-400">({dateEvents.length} مهام)</span>
                  </h3>
                  <div className="space-y-2">
                    {dateEvents.map((event) => {
                      const config = typeConfig[event.type];
                      const Icon = config.icon;
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border-2 p-3 transition-all ${
                            event.completed
                              ? "border-green-200 dark:border-green-500/30 opacity-60"
                              : "border-gray-100 dark:border-gray-700"
                          }`}
                        >
                          <button
                            onClick={() => toggleComplete(event.id)}
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              event.completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-green-100 dark:hover:bg-green-500/20 hover:text-green-500"
                            }`}
                          >
                            {event.completed ? <CheckCircle size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                          </button>
                          <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={14} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${event.completed ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={10} />
                              {event.time}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
