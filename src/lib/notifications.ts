import { Notification } from "@/types/notifications";

const NOTIFICATIONS_STORAGE_KEY = "dzphy_notifications";
const NOTIFICATIONS_EXPIRY_DAYS = 3;

// إنشاء إشعار جديد
export function createNotification(
  title: string,
  description: string,
  type: "new_content" | "new_course" | "update" | "announcement",
  link?: string
): Notification {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + NOTIFICATIONS_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    type,
    link,
    createdAt: now,
    expiresAt,
    read: false,
  };
}

// حفظ الإشعارات في localStorage
export function saveNotifications(notifications: Notification[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error("Failed to save notifications:", error);
  }
}

// تحميل الإشعارات من localStorage
export function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!stored) return [];

    const notifications: Notification[] = JSON.parse(stored);

    // تصفية الإشعارات المنتهية الصلاحية
    const now = new Date();
    const validNotifications = notifications.filter((n) => {
      const expiresAt = new Date(n.expiresAt);
      return expiresAt > now;
    });

    // حفظ الإشعارات الصالحة فقط
    if (validNotifications.length !== notifications.length) {
      saveNotifications(validNotifications);
    }

    return validNotifications;
  } catch (error) {
    console.error("Failed to load notifications:", error);
    return [];
  }
}

// إضافة إشعار جديد
export function addNotification(
  title: string,
  description: string,
  type: "new_content" | "new_course" | "update" | "announcement",
  link?: string
): void {
  const notifications = loadNotifications();
  const newNotification = createNotification(title, description, type, link);
  notifications.unshift(newNotification);
  saveNotifications(notifications);
}

// وضع علامة على إشعار كمقروء
export function markNotificationAsRead(notificationId: string): void {
  const notifications = loadNotifications();
  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
    saveNotifications(notifications);
  }
}

// وضع علامة على جميع الإشعارات كمقروءة
export function markAllAsRead(): void {
  const notifications = loadNotifications();
  notifications.forEach((n) => (n.read = true));
  saveNotifications(notifications);
}

// حذف إشعار
export function deleteNotification(notificationId: string): void {
  const notifications = loadNotifications().filter((n) => n.id !== notificationId);
  saveNotifications(notifications);
}

// حذف جميع الإشعارات
export function clearAllNotifications(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear notifications:", error);
  }
}

// الحصول على عدد الإشعارات غير المقروءة
export function getUnreadCount(): number {
  return loadNotifications().filter((n) => !n.read).length;
}

// تنبيهات تلقائية لأنواع محتوى معينة
export function notifyNewContent(
  itemType: "resume" | "exercise" | "devoir" | "video",
  title: string,
  grade: string
): void {
  const typeLabels: Record<string, string> = {
    resume: "ملخص جديد",
    exercise: "تمارين جديدة",
    devoir: "فرض جديد",
    video: "فيديو جديد",
  };

  addNotification(
    typeLabels[itemType],
    `${title} - السنة ${grade}`,
    "new_content",
    `/grade/${grade}`
  );
}

export function notifyNewCourse(courseTitle: string, level: string): void {
  addNotification(
    "دورة جديدة",
    courseTitle,
    "new_course",
    "/courses"
  );
}
