import axios from "axios";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";

// Existing interface for repositories
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  lastUpdated?: string;
}

// New interfaces for projects and deployments based on your schema
interface Deployment {
  id: number;
  projectId: number;
  status: string;
  branch: string;
  environmentVariables?: any;
  rollbackToId?: number;
  rollbackedDeployments?: Deployment[];
  createdAt: string;
  logs?: any[];
}

interface Project {
  id: number;
  repoId: number;
  name: string;
  url: string;
  linkedByUserId: number;
  createdAt: string;
  deployedIp?: string;
  deployedPort?: number;
  deployments?: Deployment[];
}

// Updated Dashboard state interface to include projects
interface DashboardState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  repositories: Repo[];
  selectedRepo: Repo | null;
  setSelectedRepo: (repo: Repo) => void;
  
  loading: boolean;
  error: string | null;
  
  fetchRepositories: (githubUsername: string) => Promise<void>;
  
  // New properties for projects
  projects: Project[];
  fetchProjects: () => Promise<void>;
  setCurrentProject: (project: Project) => void;
  currentProject : Project | null;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  
  socket: Socket | null;
  createWebSocketConnection: (repositoryId: number) => Promise<void>;
  
  deploy: (owner: string, repoName: string, githubUsername: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),

  repositories: [],
  selectedRepo: null,
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),

  loading: false,
  error: null,

  fetchRepositories: async (githubUsername: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<Repo[]>(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      const repositories = data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description available",
        html_url: repo.html_url,
        language: repo.language || "Unknown",
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
      }));
      set({ repositories });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // New action to fetch projects via the backend endpoint
  projects: [],
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get<Project[]>(
        `${process.env.REACT_APP_BACK_END_URL}/projects/my-projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ projects: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),

  socket: null,
  createWebSocketConnection: async (repositoryId: number) => {
    const socket = io(process.env.REACT_APP_BACK_END_URL, {
      query: { repositoryId }, // Send repositoryId in query params
      transports: ["websocket"],
    });
    set({ socket });
  },

  deploy: async (owner: string, repo: string, githubUsername: string) => {
    const selectedRepo = get().selectedRepo;
    if (!selectedRepo) return;
    try {
      await axios.post(`${process.env.REACT_APP_BACK_END_URL}/repositories/deploy`, {
        owner,
        repo,
        githubUsername,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  },
}));
