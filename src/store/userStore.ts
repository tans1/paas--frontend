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
  setGithubUsername: (username: string) => void; // ✅ New method
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem("authToken"),

      login: async (token: string) => {
        localStorage.setItem("authToken", token);
        set({ isAuthenticated: true });
        await get().
        fetchUserProfile();
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
            `${process.env.REACT_APP_BACK_END_URL}/auth/me`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({ user: data });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          get().logout(); // Logout if token is invalid
        }
      },

      setGithubUsername: (username: string) => {
        set((state) => ({
          user: { ...state.user, githubUsername: username } as User,
        }));
      },
    }),
    { name: "user-storage" } // Stores in localStorage
  )
);
