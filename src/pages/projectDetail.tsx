import PagesTitle from "../components/atoms/pagesTitle";
import {
  Github,
  GitBranch,
  GitCommitHorizontal,
  Pause,
  Play,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import normalizeUrl from "normalize-url";
import dateFormat from "dateformat";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";
import type { AxiosResponse } from "axios";
import { useUserStore } from "../store/userStore";
import StatusBanner from "../components/molecules/StatusBanner";

interface EnvVar {
  key: string;
  value: string;
}

// Type for the expected API response from /dns
interface NameServerResponse {
  message: string;
  nameservers: string[];
  next_steps: string[];
  documentation_url: string;
}

// Type for API error responses
interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Type guard to check if error is an API error
function isApiError(error: unknown): error is ApiErrorResponse {
  return typeof error === "object" && error !== null && "response" in error;
}

export default function ProjectDetail() {
  const { repoId, branch } = useParams();
  const navigate = useNavigate();
  const [newDomainName, setNewDomainName] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState<number | null>(null);
  const [showRollbackConfirm, setShowRollbackConfirm] = useState<number | null>(
    null
  );
  const [isRollbackLoading, setIsRollbackLoading] = useState(false);
  const [addDomainError, setAddDomainError] = useState<string>("");
  const [isAddDomainDialogOpen, setIsAddDomainDialogOpen] = useState(false);
  const [showDeploymentBanner, setShowDeploymentBanner] = useState(false);

  const {
    fetchProject,
    fetchedProject,
    loading,
    createWebSocketConnection,
    sockets,
    startProject,
    stopProject,
    deleteProject,
    rollbackProject,
    addDomain,
    updateProject,
  } = useDashboardStore();

  const { user } = useUserStore();

  const isUserActive = user?.status === "ACTIVE";

  // Initial project fetch
  useEffect(() => {
    try {
      if (!repoId) return;

      const parsedRepoId = parseInt(repoId, 10);
      if (isNaN(parsedRepoId)) {
        console.error("Invalid repoId:", repoId);
        return;
      }

      fetchProject(branch ?? "", parsedRepoId);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setTimeout(() => setShowLoader(false), 1000);
    }
  }, [repoId, branch, fetchProject]);

  // Set up deployment WebSocket connection
  useEffect(() => {
    if (!repoId || !branch) return;

    console.log("Setting up WebSocket connection:", { repoId, branch });
    const parsedRepoId = parseInt(repoId, 10);

    // Close any existing deployment socket before creating a new one
    if (sockets.deployment) {
      sockets.deployment.close();
    }

    createWebSocketConnection(parsedRepoId, branch, "deployment");

    return () => {
      console.log("Cleaning up WebSocket connection");
      if (sockets.deployment) {
        sockets.deployment.close();
      }
    };
  }, [repoId, branch, createWebSocketConnection]);

  // Handle real-time deployment updates
  useEffect(() => {
    if (!sockets.deployment) return;

    const handleNewDeployment = async () => {
      if (repoId && branch) {
        const parsedRepoId = parseInt(repoId, 10);
        await fetchProject(branch, parsedRepoId);
        // Show deployment banner for new deployments
        setShowDeploymentBanner(true);
        // Auto-hide banner after 5 seconds
        setTimeout(() => setShowDeploymentBanner(false), 5000);
      }
    };

    const handleDeploymentUpdate = async () => {
      if (repoId && branch) {
        const parsedRepoId = parseInt(repoId, 10);
        await fetchProject(branch, parsedRepoId);
      }
    };

    sockets.deployment.on("newDeployment", handleNewDeployment);
    sockets.deployment.on("deploymentUpdate", handleDeploymentUpdate);

    return () => {
      sockets.deployment?.off("newDeployment", handleNewDeployment);
      sockets.deployment?.off("deploymentUpdate", handleDeploymentUpdate);
    };
  }, [sockets.deployment, repoId, branch, fetchProject]);

  const handleStartProject = async () => {
    if (!fetchedProject) return;
    setIsStarting(true);
    try {
      await startProject(fetchedProject.id);
    } catch (error) {
      console.error("Error starting project:", error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleStopProject = async () => {
    if (!fetchedProject) return;
    setIsStopping(true);
    try {
      await stopProject(fetchedProject.id);
    } catch (error) {
      console.error("Error stopping project:", error);
    } finally {
      setIsStopping(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!fetchedProject) return;
    setIsDeleting(true);
    try {
      await deleteProject(fetchedProject.id);
      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddDomainName = async () => {
    if (!fetchedProject || !newDomainName) return;
    setAddDomainError("");
    try {
      const response: AxiosResponse<NameServerResponse> = await addDomain(
        newDomainName,
        fetchedProject.id
      );
      setNewDomainName("");
      if (response.status === 201) {
        setIsAddDomainDialogOpen(false);
        navigate("/dashboard/project/nameserver-instructions", {
          state: response.data,
        });
      }
    } catch (error: unknown) {
      const message = isApiError(error)
        ? error.response?.data?.message ||
          "Failed to add domain. Please try again."
        : "Failed to add domain. Please try again.";
      setAddDomainError(message);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [originalEnvVars, setOriginalEnvVars] = useState<EnvVar[]>([]);

  const [envVars, setEnvVars] = useState<EnvVar[]>(() => {
    const existing: EnvVar[] = fetchedProject?.environmentVariables
      ? Object.entries(fetchedProject.environmentVariables).map(
          ([key, value]) => ({
            key,
            value: value as string,
          })
        )
      : [];
    return [...existing];
  });

  const handleEditClick = () => {
    const updated = envVars;
    setOriginalEnvVars(JSON.parse(JSON.stringify(updated)));
    setEnvVars([...updated, { key: "", value: "" }]);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEnvVars(originalEnvVars);
    setEditMode(false);
  };

  const handleChange = (idx: number, field: string, val: string) => {
    setEnvVars((prev) => {
      const next = prev.map((e, i) => (i === idx ? { ...e, [field]: val } : e));
      if (
        idx === prev.length - 1 &&
        (next[idx].key.trim() || next[idx].value.trim())
      ) {
        next.push({ key: "", value: "" });
      }
      return next;
    });
  };

  const handleSave = async () => {
    const payload = envVars
      .filter(
        (env: { key: string; value: string }) =>
          env.key !== "" && env.value !== ""
      )
      .map((e) => ({ key: e.key.trim(), value: e.value }));

    // Convert array to Record<string, string>
    const envVarsRecord = payload.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    try {
      if (fetchedProject) {
        await updateProject(fetchedProject.id, {
          environmentVariables: envVarsRecord,
        });
        setEditMode(false);
        setEnvVars(payload);
      }
    } catch (error) {
      console.error("Error saving environment variables:", error);
    }
  };

  const handleRemoveEnvironment = (indexToRemove: number) => {
    setEnvVars((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleRollback = async (deploymentId: number) => {
    if (!fetchedProject) return;

    try {
      setIsRollingBack(deploymentId);
      setIsRollbackLoading(true);
      await rollbackProject(fetchedProject.id, deploymentId);
    } catch (error) {
      console.error("Rollback failed:", error);
    } finally {
      setIsRollingBack(null);
      setIsRollbackLoading(false);
      setShowRollbackConfirm(null);
    }
  };

  if (loading || showLoader) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center ">
        <div className="w-[10%] h-full m-auto flex flex-col justify-center">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pl-10 pr-10 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <StatusBanner />

      {/* Deployment Banner */}
      {showDeploymentBanner && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="text-blue-900 font-semibold">
                  New Deployment Started
                </h3>
                <p className="text-blue-700 text-sm">
                  Your project is being deployed. You can monitor the progress
                  in the logs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/dashboard/project/details/${branch}/${repoId}/logs`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-terminal"></i>
                View Logs
              </Link>
              <button
                onClick={() => setShowDeploymentBanner(false)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <PagesTitle title={fetchedProject?.name || ""} subtitle="Details" />

      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          {fetchedProject?.status === "RUNNING" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full border border-green-200 shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Running</span>
            </div>
          )}
          {fetchedProject?.status === "STOPPED" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 rounded-full border border-red-200 shadow-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-semibold">Stopped</span>
            </div>
          )}
          {fetchedProject?.status === "PENDING" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 rounded-full border border-yellow-200 shadow-sm">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Pending</span>
            </div>
          )}
        </div>
        {fetchedProject?.deployedUrl && (
          <a
            href={normalizeUrl(fetchedProject.deployedUrl, {
              defaultProtocol: "https",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
          >
            <i className="fa-solid fa-external-link-alt"></i>
            View Live Site
          </a>
        )}
      </div>

      <div className="flex justify-between items-start mt-10 gap-8">
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {fetchedProject?.name}
          </h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {fetchedProject?.projectDescription ?? "No description found"}
          </p>
          <div className="flex items-center gap-3">
            {fetchedProject?.status === "STOPPED" && (
              <button
                onClick={handleStartProject}
                disabled={isStarting || !isUserActive}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isStarting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-play text-xs"></i>
                    <span>Start</span>
                  </>
                )}
              </button>
            )}

            {fetchedProject?.status === "RUNNING" && (
              <button
                onClick={handleStopProject}
                disabled={isStopping || !isUserActive}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isStopping ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                    <span>Stopping...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-stop text-xs"></i>
                    <span>Stop</span>
                  </>
                )}
              </button>
            )}

            {fetchedProject?.status === "PENDING" && (
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg cursor-not-allowed shadow-lg"
              >
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                <span>Pending...</span>
              </button>
            )}

            <Dialog>
              <DialogTrigger className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <i className="fa-solid fa-trash text-xs"></i>
                <span>Delete</span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Delete Project
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 mt-2">
                    Are you sure you want to delete this project? This action
                    cannot be undone and will permanently remove all project
                    data.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4 mt-6">
                  <DialogClose asChild>
                    <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    onClick={handleDeleteProject}
                    disabled={isDeleting}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete Project</span>
                      </>
                    )}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            target="_blank"
            href={
              fetchedProject?.deployedUrl
                ? normalizeUrl(fetchedProject?.url, {
                    defaultProtocol: "https",
                  })
                : ""
            }
          >
            <Github className="w-5 h-5" />
            <span>Repository</span>
          </a>

          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <i className="fa-solid fa-chart-line"></i>
            <span>Usage</span>
          </button>
          <Dialog
            open={isAddDomainDialogOpen}
            onOpenChange={setIsAddDomainDialogOpen}
          >
            <DialogTrigger
              className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              onClick={() => {
                setAddDomainError("");
                setIsAddDomainDialogOpen(true);
              }}
            >
              <i className="fa-solid fa-globe"></i>
              <span>Add Domain</span>
            </DialogTrigger>
            <DialogContent className="min-h-[250px]">
              <DialogHeader>
                <DialogDescription>
                  <div className="mt-5">
                    <div className="mb-10 flex items-center">
                      <label
                        htmlFor="domainName"
                        className="text-black font-semibold mr-5 text-base"
                      >
                        Domain Name :
                      </label>
                      <input
                        type="text"
                        name="domainName"
                        className="outline-none border border-blue-500 px-2 py-2 w-[60%] text-black"
                        placeholder="example.com"
                        value={newDomainName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setNewDomainName(e.target.value);
                          setAddDomainError("");
                        }}
                      />
                    </div>
                    {addDomainError && (
                      <div className="mb-4 text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded p-2">
                        {addDomainError}
                      </div>
                    )}
                    <div className="flex justify-end gap-10">
                      <DialogClose asChild>
                        <button
                          className="border px-3 py-1 border-gray-300 text-black rounded hover:cursor-pointer"
                          onClick={() => {
                            setAddDomainError("");
                            setIsAddDomainDialogOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                      </DialogClose>
                      <button
                        className={`px-4 py-1 ${
                          newDomainName === "" ? "bg-blue-300" : "bg-blue-500"
                        } rounded hover:cursor-pointer text-white font-semibold`}
                        onClick={handleAddDomainName}
                        disabled={newDomainName === ""}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Link
            className="flex items-center gap-2 px-4 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            to={`/dashboard/project/details/${branch}/${repoId}/logs/${
              fetchedProject?.activeDeploymentId ?? null
            }`}
          >
            <i className="fa-solid fa-terminal"></i>
            <span>Logs</span>
          </Link>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Details
            </h3>
          </div>
          <ul className="space-y-6">
            <li>
              <p className="text-gray-500 font-medium mb-2">Deployed URL</p>
              <div className="grid gap-1">
                {fetchedProject?.deployedUrl ? (
                  <a
                    href={normalizeUrl(fetchedProject.deployedUrl, {
                      defaultProtocol: "https",
                    })}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                  >
                    {normalizeUrl(fetchedProject.deployedUrl, {
                      defaultProtocol: "https",
                    })}
                  </a>
                ) : (
                  <span className="text-gray-400">No deployed URL found</span>
                )}
              </div>
            </li>
            <li>
              <p className="text-gray-500 font-medium mb-2">Custom Domains</p>
              <div className="grid gap-1">
                {fetchedProject?.customDomains &&
                fetchedProject.customDomains.length > 0 ? (
                  fetchedProject.customDomains.map((customDomain, idx) => (
                    <div key={idx}>
                      <a
                        href={normalizeUrl(customDomain.domain, {
                          defaultProtocol: "https",
                        })}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                      >
                        {normalizeUrl(customDomain.domain, {
                          defaultProtocol: "https",
                        })}
                      </a>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400">No custom domains found</span>
                )}
              </div>
            </li>
            <li>
              <div className="flex gap-10">
                <div className="flex-shrink-0">
                  <p className="text-gray-500 font-medium mb-1">Created</p>
                  <p className="text-gray-900">
                    {dateFormat(
                      fetchedProject?.createdAt,
                      "dddd, mmmm dS, yyyy, h:MM TT"
                    )}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <p className="text-gray-500 font-medium mb-2">Source</p>
              <p className="flex items-center whitespace-nowrap my-2 text-gray-900">
                <GitBranch className="w-4 mr-2 text-blue-600" />
                {fetchedProject?.branch}
              </p>
              <p className="flex items-center whitespace-nowrap text-gray-900">
                <GitCommitHorizontal className="w-5 mr-2 text-blue-600" />
                {fetchedProject?.lastCommitMessage || "No commit message"}
              </p>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Deployments
            </h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {[...(fetchedProject?.deployments ?? [])]
              .sort((a, b) => {
                // Always put active deployment at the top
                if (a.id === fetchedProject?.activeDeploymentId) return -1;
                if (b.id === fetchedProject?.activeDeploymentId) return 1;
                // Sort remaining deployments by creation date
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .map((deployment, i) => (
                <div
                  className={`flex items-center px-6 py-4 justify-between border-b border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300 ${
                    deployment.id === fetchedProject?.activeDeploymentId
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500"
                      : deployment.status === "in-progress"
                      ? "bg-gradient-to-r from-purple-50 to-orange-50 border-l-4 border-l-purple-500"
                      : ""
                  }`}
                  key={i}
                >
                  <div className="flex w-[30%]">
                    {deployment.status === "deployed" ? (
                      <Play className="text-green-500 mr-3" fill="lightblue" />
                    ) : deployment.status === "in-progress" ? (
                      <div className="flex items-center gap-2 mr-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                        <i className="fa-solid fa-cog fa-spin text-purple-500"></i>
                      </div>
                    ) : (
                      <Pause className="text-red-500 mr-3" fill="red" />
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={`capitalize font-medium ${
                          deployment.status === "in-progress"
                            ? "text-purple-700"
                            : ""
                        }`}
                      >
                        {deployment.status === "in-progress"
                          ? "Building..."
                          : deployment.status}
                      </span>
                    </div>
                  </div>
                  <div className="pl-2 flex-1">
                    <p className="text-gray-900 font-medium">
                      {deployment.lastCommitMessage || "No commit message"}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {dateFormat(deployment.createdAt, "mmmm dS, yyyy, h:MM TT")}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-4 text-center cursor-pointer">
                      <i className="fa-solid fa-ellipsis-vertical text-black"></i>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg font-semibold w-32">
                      <Link
                        to={`/dashboard/project/details/${branch}/${repoId}/logs/${deployment.id}`}
                      >
                        <DropdownMenuItem className="p-2 px-4 hover:cursor-pointer hover:bg-gray-100">
                          Logs
                        </DropdownMenuItem>
                      </Link>
                      {i !== 0 &&
                        deployment.status === "deployed" &&
                        isUserActive && (
                          <DropdownMenuItem
                            className="p-2 px-4 hover:cursor-pointer hover:bg-gray-100 text-blue-600"
                            onClick={() =>
                              setShowRollbackConfirm(deployment.id)
                            }
                          >
                            Rollback to this version
                          </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {showRollbackConfirm === deployment.id && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-gray-100">
                        <h3 className="text-xl font-semibold mb-2">
                          Confirm Rollback
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Are you sure you want to rollback to this version?
                          This will make this deployment the current version.
                        </p>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => setShowRollbackConfirm(null)}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRollback(deployment.id)}
                            disabled={
                              isRollingBack === deployment.id ||
                              isRollbackLoading
                            }
                            className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isRollingBack === deployment.id ||
                            isRollbackLoading ? (
                              <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                <span>Rolling back...</span>
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-rotate-left"></i>
                                <span>Rollback</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8 mb-12">
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-xl border border-gray-200 shadow-lg"
        >
          <AccordionItem value="item-1" className="px-6">
            <AccordionTrigger className="hover:no-underline cursor-pointer text-xl pb-5 font-semibold text-gray-900">
              Environment variables
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-base mb-7">
                {envVars.map((env: { key: string; value: string }, i) => (
                  <div key={i} className="flex gap-5 mb-4">
                    <input
                      type="text"
                      placeholder="KEY"
                      disabled={!editMode}
                      value={env.key}
                      onChange={(e) => handleChange(i, "key", e.target.value)}
                      className={`p-2 outline-none rounded border ${
                        editMode
                          ? "border-gray-400 focus:border-blue-500"
                          : "border-gray-200"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="VALUE"
                      disabled={!editMode}
                      value={env.value}
                      onChange={(e) => handleChange(i, "value", e.target.value)}
                      className={`p-2 outline-none rounded border ${
                        editMode
                          ? "border-gray-400 focus:border-blue-500"
                          : "border-gray-200"
                      }`}
                    />
                    {editMode && (
                      <button
                        className="text-red-500 text-xl hover:cursor-pointer hover:bg-red-100 px-2 rounded transition-colors"
                        onClick={() => handleRemoveEnvironment(i)}
                      >
                        x
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {!editMode &&
                envVars.filter(
                  (env: { key: string; value: string }) =>
                    env.key !== "" && env.value !== ""
                ).length === 0 ? (
                  <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={handleEditClick}
                  >
                    Add
                  </button>
                ) : !editMode ? (
                  <button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-5">
                    <button
                      className="bg-gray-200 text-black px-6 py-2.5 rounded-lg font-semibold hover:cursor-pointer hover:bg-gray-300 transition-all duration-300"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:cursor-pointer hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
