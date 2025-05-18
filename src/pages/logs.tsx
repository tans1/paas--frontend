import { useParams, useNavigate } from "react-router";
import PagesTitle from "../components/atoms/pagesTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Log from "../components/molecules/log";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LogsPage() {
  const { repoId, branch, deploymentId } = useParams<{
    repoId: string;
    branch: string;
    deploymentId: string | undefined;
  }>();
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [runtimeLogs, setRuntimeLogs] = useState<string[]>([]);
  const [tab, setTab] = useState<string>("buildLog");
  const [isBuilding, setIsBuilding] = useState(false);
  const [showBuildComplete, setShowBuildComplete] = useState(false);
  const navigate = useNavigate();

  const { sockets, createWebSocketConnection, fetchProject, fetchedProject } =
    useDashboardStore();

  // Fetch project and deployment data
  useEffect(() => {
    if (!repoId) return;
    fetchProject(branch ?? "", parseInt(repoId, 10));
  }, [repoId, branch, fetchProject]);

  // Handle deployment logs and socket connection
  useEffect(() => {
    if (!fetchedProject) return;

    // If no deploymentId is provided, we're waiting for the initial deployment
    if (!deploymentId) {
      setIsBuilding(true);
      if (repoId) {
        createWebSocketConnection(parseInt(repoId, 10), branch ?? "", "build");
        createWebSocketConnection(
          parseInt(repoId, 10),
          branch ?? "",
          "runtime"
        );
      }
      return;
    }

    const matchingDeployment = fetchedProject.deployments?.find(
      (deployment) => deployment.id === Number(deploymentId)
    );

    if (matchingDeployment) {
      // Set initial logs from deployment, filtered by logType
      const allLogs = matchingDeployment.logs ?? [];
      setBuildLogs(
        allLogs
          .filter((log) => log.logType === "build")
          .map((log) => log.message)
      );
      setRuntimeLogs(
        allLogs
          .filter((log) => log.logType === "runtime")
          .map((log) => log.message)
      );

      // Check if deployment is still building
      const isCurrentlyBuilding = matchingDeployment.status === "in-progress";
      setIsBuilding(isCurrentlyBuilding);

      // Create socket connections if deployment is in progress
      if (isCurrentlyBuilding && repoId) {
        createWebSocketConnection(parseInt(repoId, 10), branch ?? "", "build");
        createWebSocketConnection(
          parseInt(repoId, 10),
          branch ?? "",
          "runtime"
        );
      }
    }
  }, [fetchedProject, deploymentId, repoId, branch, createWebSocketConnection]);

  // Handle real-time build logs
  useEffect(() => {
    if (!isBuilding || !sockets.build) return;

    const handleBuildLog = (data: string) => {
      setBuildLogs((prev) => [...prev, data]);
    };

    const handleBuildComplete = (message: string) => {
      console.log("Build completed:", message);
      // Add the completion message to the logs
      setBuildLogs((prev) => [...prev, message]);
      setIsBuilding(false);
      // Switch to runtime tab when build is complete
      setTab("runtimeLog");
      // Show build complete notification
      setShowBuildComplete(true);
      // Optionally close the build socket
      sockets.build?.close();
    };

    sockets.build.on("buildLog", handleBuildLog);
    sockets.build.on("buildComplete", handleBuildComplete);

    return () => {
      sockets.build?.off("buildLog", handleBuildLog);
      sockets.build?.off("buildComplete", handleBuildComplete);
    };
  }, [sockets.build, isBuilding]);

  // Handle real-time runtime logs
  useEffect(() => {
    if (!sockets.runtime) return;

    const handleRuntimeLog = (data: string) => {
      setRuntimeLogs((prev) => [...prev, data]);
    };

    sockets.runtime.on("runtimeLog", handleRuntimeLog);
    return () => {
      sockets.runtime?.off("runtimeLog", handleRuntimeLog);
    };
  }, [sockets.runtime]);

  const headerBreadCrumb = (
    <Breadcrumb className="text-xl font-semibold">
      <BreadcrumbList>
        <BreadcrumbItem>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <BreadcrumbLink
            href={`/dashboard/project/details/${branch}/${repoId}`}
          >
            Details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Logs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <div className="mt-10 pl-10 pr-40">
      <PagesTitle
        title={fetchedProject?.name ?? ""}
        component={headerBreadCrumb}
      />
      {showBuildComplete && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-green-500"></i>
            <span className="text-green-700">
              Build completed successfully!
            </span>
          </div>
          <button
            onClick={() =>
              navigate(`/dashboard/project/details/${branch}/${repoId}`)
            }
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            <span>Go to Project Details</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="buildLog">Build Logs</TabsTrigger>
          <TabsTrigger value="runtimeLog">Runtime Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="buildLog">
          <div className="w-full h-[70vh]">
            <Log logs={buildLogs} />
          </div>
        </TabsContent>
        <TabsContent value="runtimeLog">
          <div className="w-full h-[70vh]">
            <Log logs={runtimeLogs} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
