import { Route, Routes } from "react-router-dom";
import AppSidebar from "../molecules/sidebar";
import Dashboard from "../../pages/dashboard";
import ProjectsList from "../../pages/projectsList";
import Navbar from "../molecules/navbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import AddProject from "../../pages/addProject";
import ProjectDetail from "../../pages/projectDetail";
import LogsPage from "../../pages/logs";
import RunTimeLog from "../../pages/runtimeLog";
import DeployProject from "../../pages/deployProject";

const DashboardStructure: React.FC = () => {
  // const { activeTab } = useDashboardStore();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <div>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="projects" element={<ProjectsList />} />
              <Route path="project/add" element={<AddProject />} />
              <Route
                path="project/details/:branch/:repoId"
                element={<ProjectDetail />}
              />
              <Route
                path="project/details/:branch/:repoId/logs/:deploymentId?"
                element={<LogsPage />}
              />
              <Route
                path="project/details/:repoId/runtimeLog"
                element={<RunTimeLog />}
              />
              <Route path="deploy" element={<DeployProject />} />
            </Routes>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardStructure;
