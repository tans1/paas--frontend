import { create } from "zustand";
import axios from "axios";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "SYSTEM" | "ALERT" | "INFO";
  priority: "HIGH" | "MEDIUM" | "LOW";
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchUnreadNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: async (id) => {
    try {
      await axios.post(`/api/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  markAllAsRead: async () => {
    try {
      await axios.post("/api/notifications/read-all");
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id && !n.read)
          ? state.unreadCount - 1
          : state.unreadCount,
      }));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },

  fetchNotifications: async () => {
    try {
      const response = await axios.get("/api/notifications");
      const notifications = response.data;
      set((state) => ({
        notifications,
        unreadCount: notifications.filter((n: Notification) => !n.read).length,
      }));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },

  fetchUnreadNotifications: async () => {
    try {
      const response = await axios.get("/api/notifications/unread");
      const unreadNotifications = response.data;
      set((state) => ({
        unreadCount: unreadNotifications.length,
      }));
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  },
}));

export const initializeNotificationSSE = (userId: number) => {
  const eventSource = new EventSource(`/api/notifications/sse`);

  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    useNotificationStore.getState().addNotification(notification);
  };

  eventSource.onerror = (error) => {
    console.error("SSE Error:", error);
    eventSource.close();
    // Attempt to reconnect after 5 seconds
    setTimeout(() => initializeNotificationSSE(userId), 5000);
  };

  return eventSource;
};
