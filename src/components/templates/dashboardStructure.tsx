import { Route, Routes } from "react-router-dom";
import AppSidebar from "../molecules/sidebar";
import Dashboard from "../../pages/dashboard";
import ProjectsList from "../../pages/projectsList";
import Navbar from "../molecules/navbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import AddProject from "../../pages/addProject";
import ProjectDetail from "../../pages/projectDetail";
import BuildLog from "../../pages/buildLog";
import RunTimeLog from "../../pages/runtimeLog";

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
              <Route path="project/details/:id" element={<ProjectDetail />} />
              <Route
                path="project/details/:id/buildLog"
                element={<BuildLog />}
              />
              <Route
                path="project/details/:id/runtimeLog"
                element={<RunTimeLog />}
              />
            </Routes>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardStructure;
