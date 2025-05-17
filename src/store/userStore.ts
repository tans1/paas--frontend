import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface User {
  id?: number;
  githubUsername?: string;
  email?: string;
  avatarUrl?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  setGithubUsername: (username: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem("authToken"),

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
    }),
    { name: "user-storage" }
  )
);
