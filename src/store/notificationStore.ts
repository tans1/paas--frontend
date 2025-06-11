import { create } from "zustand";
import api from "../api/axios";

export interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  sseConnection: EventSource | null;
  initializeSSE: () => void;
  closeSSE: () => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchUnreadNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  sseConnection: null,

  initializeSSE: () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No auth token found, skipping SSE initialization");
      return;
    }

    const sseUrl = `${
      import.meta.env.VITE_BACK_END_URL
    }/notifications/sse?token=${token}`;
    console.log("Initializing SSE connection to:", sseUrl);

    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      console.log("SSE connection opened successfully");
    };

    eventSource.onmessage = (event) => {
      console.log("Received SSE message:", event.data);
      try {
        const notification = JSON.parse(event.data);
        console.log("Parsed notification:", notification);
        get().addNotification(notification);
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
      set({ sseConnection: null });
    };

    set({ sseConnection: eventSource });
  },

  closeSSE: () => {
    const { sseConnection } = get();
    if (sseConnection) {
      console.log("Closing SSE connection");
      sseConnection.close();
      set({ sseConnection: null });
    }
  },

  addNotification: (notification) => {
    console.log("Adding new notification:", notification);
    set((state) => {
      const newState = {
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
      console.log("Updated notification state:", newState);
      return newState;
    });
  },

  markAsRead: async (id) => {
    try {
      await api.post(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n: Notification) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.post("/notifications/read-all");
      set((state) => ({
        notifications: state.notifications.map((n: Notification) => ({
          ...n,
          isRead: true,
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter(
          (n: Notification) => n.id !== id
        ),
        unreadCount: state.notifications.find((n: Notification) => n.id === id)
          ?.isRead
          ? state.unreadCount
          : Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  },

  fetchNotifications: async () => {
    try {
      console.log("Fetching notifications...");
      const { data } = await api.get<Notification[]>("/notifications");
      console.log("Fetched notifications:", data);
      set({
        notifications: data,
        unreadCount: data.filter((n: Notification) => !n.isRead).length,
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  },

  fetchUnreadNotifications: async () => {
    try {
      const { data } = await api.get<Notification[]>("/notifications/unread");
      set({
        notifications: data,
        unreadCount: data.length,
      });
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
    }
  },
}));
