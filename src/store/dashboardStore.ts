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
  updated_at: string;
  branches: string[];
}

interface Log {
  id: number;
  message: string;
  deploymentId: number;
  logType: "build" | "runtime";
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
  projectDescription: string;
  lastCommitMessage?: string;
}

interface Project {
  id: number;
  repoId: number;
  name: string;
  url: string;
  projectDescription: string;
  branch: string;
  linkedByUserId: number;
  createdAt: string;
  deployedIp?: string;
  deployedPort?: number;
  deployedUrl: string;
  deployments?: Deployment[];
  status: "STOPPED" | "RUNNING" | "PENDING";
  lastCommitMessage?: string;
  activeDeploymentId?: number;
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
  connectGithub: () => Promise<string>;

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

  sockets: {
    build: Socket | null;
    runtime: Socket | null;
    deployment: Socket | null;
  };
  createWebSocketConnection: (
    repositoryId: number,
    branch: string,
    type: "build" | "runtime" | "deployment"
  ) => Promise<void>;

  deploy: (
    owner: string,
    repoName: string,
    githubUsername: string
  ) => Promise<void>;

  toBeDeployedProject: ProjectToBeDeployed | null;
  setToBeDeployedProject: (project: ProjectToBeDeployed) => void;

  // Project management functions
  startProject: (projectId: number) => Promise<void>;
  stopProject: (projectId: number) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
  rollbackProject: (projectId: number, deploymentId: number) => Promise<void>;
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
            updated_at: repo.updated_at,
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

      sockets: {
        build: null,
        runtime: null,
        deployment: null,
      },
      createWebSocketConnection: async (
        repositoryId: number,
        branch: string,
        type: "build" | "runtime" | "deployment"
      ) => {
        const token = localStorage.getItem("authToken");

        console.log(`Creating ${type} socket connection:`, {
          repositoryId,
          branch,
          type,
          existingSocket: get().sockets[type] ? "exists" : "none",
        });

        // Close existing socket if it exists
        const existingSocket = get().sockets[type];
        if (existingSocket) {
          console.log(`Closing existing ${type} socket`);
          existingSocket.close();
        }

        // Determine the namespace based on the type
        const namespace =
          type === "deployment" ? "/deployments" : "/build-logs";

        const socket = io(`${import.meta.env.VITE_BACK_END_URL}${namespace}`, {
          query: {
            repositoryId: repositoryId.toString(),
            branch,
            type,
          },
          transports: ["websocket"],
          autoConnect: true,
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Add connection event listeners
        socket.on("connect", () => {
          console.log(`${type} socket connected successfully to ${namespace}`);
        });

        socket.on("connect_error", (error: Error) => {
          console.error(`${type} socket connection error:`, error);
        });

        socket.on("disconnect", (reason: string) => {
          console.log(`${type} socket disconnected:`, reason);
        });

        // Set the new socket in the appropriate slot
        set((state) => ({
          sockets: {
            ...state.sockets,
            [type]: socket,
          },
        }));
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
      setToBeDeployedProject: (project) => {
        console.log("Store: Setting project to be deployed:", project);
        set({ toBeDeployedProject: project });
      },

      startProject: async (projectId: number) => {
        try {
          await api.post("/projects/start-project", { id: projectId });
          // Refresh project data after starting
          const currentProject = get().fetchedProject;
          if (currentProject) {
            get().fetchProject(currentProject.branch, currentProject.repoId);
          }
        } catch (error: any) {
          console.error("Error starting project:", error.message);
          set({ error: error.message });
        }
      },

      stopProject: async (projectId: number) => {
        try {
          await api.post("/projects/stop-project", { id: projectId });
          // Refresh project data after stopping
          const currentProject = get().fetchedProject;
          if (currentProject) {
            get().fetchProject(currentProject.branch, currentProject.repoId);
          }
        } catch (error: any) {
          console.error("Error stopping project:", error.message);
          set({ error: error.message });
        }
      },

      deleteProject: async (projectId: number) => {
        try {
          await api.post("/projects/delete-project", { id: projectId });
          // Clear current project and redirect to projects list
          set({ fetchedProject: null, currentProject: null });
        } catch (error: any) {
          console.error("Error deleting project:", error.message);
          set({ error: error.message });
        }
      },

      rollbackProject: async (projectId: number, deploymentId: number) => {
        try {
          const response = await api.post("/projects/rollback-project", {
            projectId,
            deploymentId,
          });

          if (response.data.success) {
            // Refresh project data after rollback
            const currentProject = get().fetchedProject;
            if (currentProject) {
              await get().fetchProject(
                currentProject.branch,
                currentProject.repoId
              );
            }
          }
        } catch (error: any) {
          console.error("Error rolling back project:", error.message);
          set({ error: error.message });
        }
      },

      connectGithub: async () => {
        try {
          const { data } = await api.get("/repositories/connect/github");
          console.log("data", data);
          return data.url;
        } catch (error) {
          console.error("Error connecting to GitHub:", error);
          throw error;
        }
      },
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
