import { Route, Routes } from "react-router-dom";
import AppSidebar from "../molecules/sidebar";
import Dashboard from "../../pages/dashboard";
import ProjectsList from "../../pages/projectsList";
import Navbar from "../molecules/navbar";
import Chatbot from "../Chatbot";
import { useUserStatusCheck } from "../../hooks/useUserStatusCheck";

import { SidebarProvider } from "@/components/ui/sidebar";
import AddProject from "../../pages/addProject";
import ProjectDetail from "../../pages/projectDetail";
import LogsPage from "../../pages/logs";
import RunTimeLog from "../../pages/runtimeLog";
import DeployProject from "../../pages/deployProject";
import NameServerInstructions from "../../pages/NameServerInstructions";
import AdminDashboard from "../../pages/adminDashboard";
import UserManagement from "../../pages/admin/UserManagement";
import AdminRoute from "../../routes/admin.routes";

const DashboardStructure: React.FC = () => {
  // Check user status every 30 seconds
  useUserStatusCheck(30000);

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
              <Route
                path="project/nameserver-instructions"
                element={<NameServerInstructions />}
              />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <AdminRoute>
                    <UserManagement />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
          <Chatbot />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardStructure;
