export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'new_content' | 'new_course' | 'update' | 'announcement';
  icon?: string;
  link?: string;
  createdAt: Date;
  expiresAt: Date; // 3 days later
  read: boolean;
}

export interface NotificationCategory {
  id: string;
  name: string;
  items: Notification[];
}
