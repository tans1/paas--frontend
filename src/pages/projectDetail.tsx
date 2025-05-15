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

import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import normalizeUrl from "normalize-url";
import dateFormat from "dateformat";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";

interface EnvVar {
  key: string;
  value: string;
}

interface DeploymentUpdate {
  deploymentId: number;
  status: string;
  timestamp: string;
}

interface NewDeployment {
  deploymentId: number;
  branch: string;
  timestamp: string;
}

export default function ProjectDetail() {
  const { repoId, branch } = useParams();
  const [newDomainName, setNewDomainName] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [lastDeploymentId, setLastDeploymentId] = useState(-1);

  const {
    fetchProject,
    fetchedProject,
    loading,
    createWebSocketConnection,
    sockets,
  } = useDashboardStore();

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

    const parsedRepoId = parseInt(repoId, 10);
    createWebSocketConnection(parsedRepoId, branch, "deployment");

    return () => {
      // Cleanup socket on component unmount
      if (sockets.deployment) {
        sockets.deployment.close();
      }
    };
  }, [repoId, branch, createWebSocketConnection]);

  // Handle real-time deployment updates
  useEffect(() => {
    if (!sockets.deployment) return;

    const handleNewDeployment = (_data: NewDeployment) => {
      // Refresh project data when a new deployment is created
      if (repoId && branch) {
        const parsedRepoId = parseInt(repoId, 10);
        fetchProject(branch, parsedRepoId);
      }
    };

    const handleDeploymentUpdate = (_data: DeploymentUpdate) => {
      // Refresh project data when a deployment status changes
      if (repoId && branch) {
        const parsedRepoId = parseInt(repoId, 10);
        fetchProject(branch, parsedRepoId);
      }
    };

    sockets.deployment.on("newDeployment", handleNewDeployment);
    sockets.deployment.on("deploymentUpdate", handleDeploymentUpdate);

    return () => {
      sockets.deployment?.off("newDeployment", handleNewDeployment);
      sockets.deployment?.off("deploymentUpdate", handleDeploymentUpdate);
    };
  }, [sockets.deployment, repoId, branch, fetchProject]);

  // Update lastDeploymentId when fetchedProject changes
  useEffect(() => {
    if (fetchedProject && fetchedProject.deployments) {
      if (fetchedProject.deployments.length > 0) {
        setLastDeploymentId(fetchedProject.deployments[0].id);
      }
    }
  }, [fetchedProject]);

  const handleStopDeployment = () => {};

  const handleRollBack = () => {};

  const handleAddDomainName = () => {};

  const [editMode, setEditMode] = useState(false);
  const [originalEnvVars, setOriginalEnvVars] = useState<EnvVar[]>([]);

  const [envVars, setEnvVars] = useState<EnvVar[]>(() => {
    const existing: EnvVar[] =
      fetchedProject?.deployments?.[0]?.environmentVariables ?? [];

    return [...existing.map((v) => ({ key: v.key, value: v.value }))];
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

  const handleSave = () => {
    const payload = envVars
      .filter(
        (env: { key: string; value: string }, _) =>
          env.key !== "" && env.value !== ""
      )
      .map((e) => ({ key: e.key.trim(), value: e.value }));

    console.log(payload);
    setEditMode(false);
    setEnvVars(payload);
  };

  const handleRemoveEnvironment = (indexToRemove: number) => {
    setEnvVars((prev) => prev.filter((_, i) => i !== indexToRemove));
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
    <div className="mt-10 pl-10 pr-40">
      <PagesTitle title={fetchedProject?.name || ""} subtitle="Details" />

      <div className="flex justify-between items-center mt-10">
        <div>
          <p>{fetchedProject?.projectDescription ?? "No description found"}</p>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <a
              className="flex items-center cursor-pointer  bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2"
              target="_blank"
              href={
                fetchedProject?.deployedUrl
                  ? normalizeUrl(fetchedProject?.url, {
                      defaultProtocol: "https",
                    })
                  : ""
              }
            >
              <span>
                <Github className="w-5 mr-1" />
              </span>
              Repository
            </a>
          </div>

          <div>
            <button className="cursor-pointer bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2 ">
              Usage
            </button>
          </div>

          <div>
            <Dialog>
              <DialogTrigger className="cursor-pointer bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2">
                Add Domain Name
              </DialogTrigger>
              <DialogContent>
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewDomainName(e.target.value)
                          }
                        />
                      </div>
                      <div className="flex justify-end gap-10">
                        <DialogClose asChild>
                          <button className="border px-3 py-1 border-gray-300 text-black rounded hover:cursor-pointer">
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
          </div>

          <div>
            <Link
              className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md shadow-sm px-5 py-2 "
              to={`/dashboard/project/details/${branch}/${repoId}/logs/${
                lastDeploymentId ? lastDeploymentId : null
              }`}
            >
              Logs
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-8">
        <div className=" col-span-3  border p-5">
          <div>
            <p className="text-2xl font-bold pt-0 pb-2">Details</p>
          </div>
          <ul>
            <li className="mb-5">
              <p className="text-gray-500">Domains</p>
              <div className="grid gap-1">
                <div>
                  <a
                    href={
                      fetchedProject?.deployedUrl
                        ? normalizeUrl(fetchedProject?.deployedUrl, {
                            defaultProtocol: "https",
                          })
                        : ""
                    }
                    target="_blank"
                    className="text-blue-600"
                  >
                    {fetchedProject?.deployedUrl
                      ? normalizeUrl(fetchedProject?.deployedUrl, {
                          defaultProtocol: "https",
                        })
                      : ""}
                  </a>
                </div>
              </div>
            </li>
            <li className="mb-5">
              <div className="flex gap-10">
                <div className="flex-shrink-0">
                  <p className="text-gray-500 mb-1">Created</p>
                  <p>
                    {dateFormat(
                      fetchedProject?.createdAt,
                      "dddd, mmmm dS, yyyy, h:MM TT"
                    )}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <p className="text-gray-500">Source</p>
              <p className="flex items-center whitespace-nowrap my-2">
                <GitBranch className="w-4 mr-1" />
                {fetchedProject?.branch}
              </p>
              <p className="flex items-center whitespace-nowrap">
                <GitCommitHorizontal className="w-5" />
                last commit message
              </p>
            </li>
          </ul>
        </div>
        <div className="col-span-1"></div>
        <div className=" col-span-4 shadow-sm ">
          <div>
            <p className="text-2xl font-bold pt-0 pb-2 pl-5">Deployments</p>
          </div>
          {(fetchedProject?.deployments ?? []).map((deployment, i) => (
            <div
              className="flex items-center px-5 py-4 justify-between border-b border-gray-200 text-gray-600"
              key={i}
            >
              <div className="flex w-[30%]">
                {deployment.status === "deployed" ? (
                  <Play className="text-green-500 mr-3" fill="lightblue" />
                ) : (
                  <Pause className="text-red-500 mr-3" fill="red" />
                )}
                {deployment.status}

                {i === 0 && (
                  <div className="border border-blue-500 rounded-2xl px-1 pr-2 text-[11px] text-blue-500 flex items-center ml-2">
                    + current
                  </div>
                )}
              </div>
              <div className="pl-2">commit message</div>
              <div className="">
                {dateFormat(deployment.createdAt, " mmmm dS, yyyy, h:MM TT")}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-4 text-center  cursor-pointer">
                  <i className="fa-solid fa-ellipsis-vertical text-black"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg font-semibold w-32">
                  <Link
                    className=""
                    to={`/dashboard/project/details/${branch}/${repoId}/logs/${deployment.id}`}
                  >
                    <DropdownMenuItem className="p-2 px-4 hover:cursor-pointer hover:bg-gray-100 ">
                      Logs
                    </DropdownMenuItem>
                  </Link>
                  {deployment.status === "deployed" ? (
                    <DropdownMenuItem
                      className="p-2 px-4 hover:cursor-pointer hover:bg-gray-100"
                      onClick={handleStopDeployment}
                    >
                      Stop
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="p-2 px-4 hover:cursor-pointer hover:bg-gray-100"
                      onClick={handleRollBack}
                    >
                      Roll back
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Accordion type="single" collapsible className="bg-gray-100 mt-5 px-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline cursor-pointer text-xl pb-5">
              Environment variables
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-base mb-7">
                {envVars
                  // .filter(
                  //   (env: { key: string; value: string }, _) =>
                  //     env.key !== "" && env.value !== ""
                  // )
                  .map((env: { key: string; value: string }, i) => (
                    <div key={i} className="flex gap-5 mb-4">
                      <input
                        type="text"
                        placeholder="KEY"
                        disabled={!editMode}
                        value={env.key}
                        onChange={(e) => handleChange(i, "key", e.target.value)}
                        className={`p-1 outline-none ${
                          editMode ? "border border-gray-400" : ""
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="VALUE"
                        disabled={!editMode}
                        value={env.value}
                        onChange={(e) =>
                          handleChange(i, "value", e.target.value)
                        }
                        className={`p-1 outline-none ${
                          editMode ? "border border-gray-400" : ""
                        }`}
                      />
                      {editMode && (
                        <button
                          className="text-red-500 text-xl hover:cursor-pointer hover:bg-blue-100 px-1 rounded"
                          onClick={() => handleRemoveEnvironment(i)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                {!editMode &&
                  envVars.filter(
                    (env: { key: string; value: string }, _) =>
                      env.key !== "" && env.value !== ""
                  ).length === 0 && <div>No environment variables added</div>}
              </div>
              <div>
                {!editMode &&
                envVars.filter(
                  (env: { key: string; value: string }, _) =>
                    env.key !== "" && env.value !== ""
                ).length === 0 ? (
                  <button
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                    onClick={handleEditClick}
                  >
                    Add
                  </button>
                ) : !editMode ? (
                  <button
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-5">
                    <button
                      className="bg-gray-200 text-black px-5 py-2 rounded hover:cursor-pointer"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600 text-white px-5 py-2 rounded hover:cursor-pointer"
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
