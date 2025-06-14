import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";
type UserRole = "ADMIN" | "USER";

interface User {
  id?: number;
  githubUsername?: string;
  email?: string;
  avatarUrl?: string;
  status?: UserStatus;
  role?: UserRole;
  name?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  setGithubUsername: (username: string) => void;
  refreshUserStatus: () => Promise<void>;
  // User management functions
  fetchAllUsers: () => Promise<void>;
  addUser: (userData: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }) => Promise<void>;
  updateUserRole: (userId: number, newRole: UserRole) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  id: number;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
}

interface UserActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  refreshUserStatus: () => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  addUser: (userData: {
    email: string;
    password: string;
    name: string;
    role: "ADMIN" | "USER";
  }) => Promise<void>;
  updateUserRole: (userId: number, newRole: "ADMIN" | "USER") => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<{ message: string }>;
  resetPassword: (data: ResetPasswordData) => Promise<{ message: string }>;
  updatePassword: (data: UpdatePasswordData) => Promise<{ message: string }>;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem("authToken"),
      users: [],
      isLoading: false,

      login: async (token: string) => {
        localStorage.setItem("authToken", token);
        set({ isAuthenticated: true });
        await get().fetchUserProfile();
      },

      logout: () => {
        localStorage.removeItem("authToken");
        set({ isAuthenticated: false, user: null });
      },

      fetchUserProfile: async () => {
        try {
          const token = localStorage.getItem("authToken");
          if (!token) return;

          const { data } = await axios.get<User>(
            `${import.meta.env.VITE_BACK_END_URL}/user/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("the incoming data is", data);
          set((state) => ({
            user: { ...state.user, ...data } as User,
          }));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          get().logout();
        }
      },

      setGithubUsername: (username: string) => {
        set((state) => ({
          user: { ...state.user, githubUsername: username } as User,
        }));
      },

      refreshUserStatus: async () => {
        try {
          const token = localStorage.getItem("authToken");
          if (!token) return;

          const { data } = await axios.get<User>(
            `${import.meta.env.VITE_BACK_END_URL}/user/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set((state) => ({
            user: { ...state.user, ...data } as User,
          }));
        } catch (error) {
          console.error("Failed to refresh user status:", error);
          // Don't logout on status refresh failure
        }
      },

      // User management functions
      fetchAllUsers: async () => {
        set({ isLoading: true });
        try {
          const token = localStorage.getItem("authToken");
          const { data } = await axios.get<User[]>(
            `${import.meta.env.VITE_BACK_END_URL}/user/all`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({ users: data });
        } catch (error) {
          console.error("Failed to fetch users:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addUser: async (userData) => {
        try {
          const token = localStorage.getItem("authToken");
          await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/auth/signup`,
            userData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          await get().fetchAllUsers();
        } catch (error) {
          console.error("Failed to add user:", error);
          throw error;
        }
      },

      updateUserRole: async (userId, newRole) => {
        try {
          const token = localStorage.getItem("authToken");
          await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/user/update`,
            { id: userId, role: newRole },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          await get().fetchAllUsers();
        } catch (error) {
          console.error("Failed to update user role:", error);
          throw error;
        }
      },

      deleteUser: async (userId) => {
        try {
          const token = localStorage.getItem("authToken");
          await axios.delete(
            `${import.meta.env.VITE_BACK_END_URL}/user/delete`,
            {
              headers: { Authorization: `Bearer ${token}` },
              data: { id: userId },
            }
          );
          await get().fetchAllUsers();
        } catch (error) {
          console.error("Failed to delete user:", error);
          throw error;
        }
      },

      updatePassword: async (data: UpdatePasswordData) => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/user/update`,
            {
              id: data.id,
              currentPassword: data.currentPassword,
              newPassword: data.newPassword,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return response.data;
        } catch (error) {
          console.error("Error updating password:", error);
          throw error;
        }
      },

      forgotPassword: async (data: ForgotPasswordData) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/auth/forgot-password`,
            data
          );
          return response.data;
        } catch (error) {
          console.error("Error sending reset link:", error);
          throw error;
        }
      },

      resetPassword: async (data: ResetPasswordData) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACK_END_URL}/auth/reset-password`,
            data
          );
          return response.data;
        } catch (error) {
          console.error("Error resetting password:", error);
          throw error;
        }
      },
    }),
    { name: "user-storage" }
  )
);
