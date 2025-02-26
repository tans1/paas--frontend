import Sidebar from "./Sidebar";
import Overview from "./OverviewComponent";
import RepositoriesList from "./RepositoriesList";
import DeployModal from "./DeployModal"; 
import { useDashboardStore } from "../store/dashboardStore";
import { Route, Routes } from "react-router-dom";
import ProjectsPage from "./Projects";
import ProjectDetailPage from "./ProjectDetail";

const Dashboard: React.FC = () => {
  const { activeTab } = useDashboardStore();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="projectsList" element={<RepositoriesList />} />
          <Route path="repo" element={<DeployModal />} />
          <Route path="projectsPage" element={<ProjectsPage />} />
          <Route path="ProjectsPage/ProjectDetailPage" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
