import api from "../api/axios";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Existing interface for repositories
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  default_branch: string;
  forks_count: number;
  created_at: string;
  branches: string[];
  // lastUpdated?: string;
}

interface Log {
  id: number;
  message: string;
  deploymentId: number;
}

// New interfaces for projects and deployments based on your schema
interface EnvVar {
  key: string;
  value: string;
}

interface Deployment {
  id: number;
  projectId: number;
  status: string;
  branch: string;
  environmentVariables?: EnvVar[];
  rollbackToId?: number;
  rollbackedDeployments?: Deployment[];
  createdAt: string;
  logs?: Log[];
}

interface Project {
  id: number;
  repoId: number;
  name: string;
  url: string;
  description: string;
  branch: string;
  linkedByUserId: number;
  createdAt: string;
  deployedIp?: string;
  deployedPort?: number;
  deployedUrl: string;
  deployments?: Deployment[];
}

interface ProjectToBeDeployed {
  id: number;
  repoName: string;
  default_branch: string;
  created_at: string;
  language: string;
  description: string;
  html_url: string;
  branches: string[];
}

interface DashboardState {
  activeTab: string;
  setActiveTab: (tab: string) => void;

  repositories: Repo[];
  selectedRepo: Repo | null;
  setSelectedRepo: (repo: Repo) => void;

  loading: boolean;
  error: string | null;

  fetchRepositories: () => Promise<void>;

  // Properties for projects
  projects: Project[];
  fetchProjects: () => Promise<void>;

  // currentProject is used elsewhere (e.g., when a user clicks on a project)
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;

  // New function to fetch a single project and its corresponding state
  fetchProject: (branch: string, projectId: number) => Promise<void>;
  fetchedProject: Project | null;

  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;

  socket: Socket | null;
  createWebSocketConnection: (repositoryId: number) => Promise<void>;

  deploy: (
    owner: string,
    repoName: string,
    githubUsername: string
  ) => Promise<void>;

  toBeDeployedProject: ProjectToBeDeployed | null;
  setToBeDeployedProject: (project: ProjectToBeDeployed) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      activeTab: "overview",
      setActiveTab: (tab) => set({ activeTab: tab }),

      repositories: [],
      selectedRepo: null,
      setSelectedRepo: (repo) => set({ selectedRepo: repo }),

      loading: false,
      error: null,

      fetchRepositories: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get<{ data: Repo[] }>(
            "/repositories/user"
          );
          const repositories = data.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || "No description available",
            html_url: repo.html_url,
            language: repo.language || "Unknown",
            default_branch: repo.default_branch,
            forks_count: repo.forks_count,
            created_at: repo.created_at,
            branches: repo.branches,
          }));
          set({ repositories });
        } catch (error: any) {
          console.error("Error fetching repositories:", error.message);
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },

      // Projects related state and actions
      // TODO: add list of branches and default branch to Reo interface
      projects: [],
      fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get<Project[]>("/projects/my-projects");
          set({ projects: data });
        } catch (error: any) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },

      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),

      fetchedProject: null,
      fetchProject: async (branch: string, repoId: number) => {
        set({ loading: true, error: null });

        try {
          const { data } = await api.get<Project>("/projects/my-project", {
            params: { repoId: repoId, branch },
          });
          set({ fetchedProject: data });
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
        const token = localStorage.getItem("authToken");
        const socket = io(import.meta.env.VITE_BACK_END_URL, {
          query: { repositoryId: repositoryId.toString() },
          transports: ["websocket"],
          autoConnect: true,
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        set({ socket });
      },

      deploy: async (owner: string, repo: string, githubUsername: string) => {
        const selectedRepo = get().selectedRepo;
        if (!selectedRepo) return;
        try {
          await api.post("/repositories/deploy", {
            owner,
            repo,
            githubUsername,
          });
        } catch (error: any) {
          console.error(error.message);
        }
      },
      toBeDeployedProject: null,
      setToBeDeployedProject: (project) =>
        set({ toBeDeployedProject: project }),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        toBeDeployedProject: state.toBeDeployedProject,
      }),
    }
  )
);
