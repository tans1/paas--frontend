import Sidebar from "../Sidebar";
import Overview from "../OverviewComponent";
import RepositoriesList from "../RepositoriesList";
import DeployModal from "../DeployModal";
import { useDashboardStore } from "../../store/dashboardStore";
import { Route, Routes } from "react-router-dom";
import ProjectsPage from "../Projects";
import ProjectDetailPage from "../ProjectDetail";
import ProjectsList from "../../pages/projectsList";
import Navbar from "../home/header/navbar";

const Dashboard: React.FC = () => {
  const { activeTab } = useDashboardStore();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow ml-72">
        <Navbar />
        <div className="pl-10 pr-40">
          <Routes>
            <Route path="/" element={<Overview />} />
            {/* <Route path="projectsList" element={<RepositoriesList />} />
          <Route path="repo" element={<DeployModal />} />
          <Route path="projectsPage" element={<ProjectsPage />} />
          <Route path="ProjectsPage/ProjectDetailPage" element={<ProjectDetailPage />} /> */}
            <Route path="projects" element={<ProjectsList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
