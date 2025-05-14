import { useParams } from "react-router";
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
  const [buildLogs, setbuildLogs] = useState<string[]>([]);
  const [runtimeLogs, setruntimeLogs] = useState<string[]>([]);
  const [tab, setTab] = useState<string>("buildLog");

  const { socket, createWebSocketConnection, fetchProject, fetchedProject } =
    useDashboardStore();

  useEffect(() => {
    if (!repoId) return;
    fetchProject(branch ?? "", parseInt(repoId, 10));
  }, [repoId, branch, fetchProject]);

  useEffect(() => {
    if (!fetchedProject || !deploymentId) return;

    const matchingDeployment = fetchedProject.deployments?.find(
      (deployment) => deployment.id === Number(deploymentId)
    );
    console.log(matchingDeployment);
    setruntimeLogs(matchingDeployment?.logs?.map((log) => log.message) ?? []);
  }, [fetchedProject, deploymentId]);

  useEffect(() => {
    if (!socket && repoId) {
      createWebSocketConnection(parseInt(repoId, 10));
    }
  }, [socket, repoId, createWebSocketConnection]);

  useEffect(() => {
    if (!socket) return;
    const handleLog = (data: string) => {
      setruntimeLogs((prev) => [...prev, data]);
    };

    socket.on("deploymentLog", handleLog);
    return () => {
      socket.off("deploymentLog", handleLog);
    };
  }, [socket]);

  const headerBreadCrumb = (
    <Breadcrumb className="text-xl font-semibold">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/dashboard/project/details/${branch}/${repoId}`}>
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
    <div className="mt-10 pl-10 pr-20">
      <PagesTitle
        title={fetchedProject?.name ?? ""}
        component={headerBreadCrumb}
      />
      <Tabs value={tab} onValueChange={(v: string) => setTab(v)} className="">
        <TabsList className="py-7 mt-2 w-96">
          <TabsTrigger
            value="buildLog"
            className=" py-5 px-10 mr-3 cursor-pointer">
            BuildLogs
          </TabsTrigger>
          <TabsTrigger value="runtimeLog" className="py-5 px-10 cursor-pointer">
            Runtime Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buildLog" className="w-full">
          <div className="w-full h-[70vh]">
            <Log logs={buildLogs} />
          </div>
        </TabsContent>
        <TabsContent value="runtimeLog" className="w-full">
          <div className="w-full h-[70vh]">
            <Log logs={runtimeLogs} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
