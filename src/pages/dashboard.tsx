import { FolderDot, Cpu, Github } from "lucide-react";
import ActiveProjectsListItem from "../components/molecules/activeProjectsListItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { useUserStore } from "../store/userStore";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const { fetchProjects, projects, loading } = useDashboardStore();
  const { user } = useUserStore();
  const [showLoader, setShowLoader] = useState(true);

  console.log("Dashboard render:", {
    loading,
    showLoader,
    projectsLength: projects?.length,
  });

  const handleProjectClick = () => {
    navigate("/dashboard/projects");
  };

  const handleGithubConnect = () => {
    window.location.href = `${import.meta.env.VITE_BACK_END_URL}/oauth/github`;
  };

  useEffect(() => {
    console.log("Dashboard useEffect triggered");
    const fetchAllProjects = async () => {
      console.log("Starting to fetch projects");
      try {
        await fetchProjects();
        console.log("Projects fetched successfully");
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        console.log("Setting showLoader to false");
        setTimeout(() => setShowLoader(false), 2000);
      }
    };
    fetchAllProjects();
  }, [fetchProjects]);

  if (loading || showLoader) {
    console.log("Showing loader:", { loading, showLoader });
    return (
      <div className="w-full h-[90vh] flex justify-center items-center ">
        <div className="w-[10%] h-full m-auto flex flex-col justify-center">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" bg-[#0057D9] pt-10  h-52 flex flex-col justify-between gap-10">
        <div className="flex justify-between items-center px-10">
          <div className="text-3xl font-bold text-white">Dashboard</div>
          <div className="flex gap-4">
            {!user?.githubUsername && (
              <button
                onClick={handleGithubConnect}
                className="flex items-center gap-2 bg-[#24292F] text-white px-6 py-2 rounded-md hover:bg-[#1B1F23] transition-colors shadow-sm"
              >
                <Github className="w-5 h-5" />
                Connect GitHub
              </button>
            )}
            <button
              className="text-black font-semibold bg-white px-10 py-2 rounded cursor-pointer shadow-sm"
              onClick={handleProjectClick}
            >
              All Projects
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 pl-5">
          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold"> Projects</div>
              <div>
                <FolderDot />
              </div>
            </div>
            <div className="text-5xl font-semibold">{projects.length}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Active Projects</div>
              <div>
                <FolderDot className="text-blue-400" />
              </div>
            </div>
            <div className="text-5xl font-semibold">{projects.length}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Max CPU </div>
              <div>
                <Cpu className="text-green-500" />
              </div>
            </div>
            <div className="text-5xl font-semibold">76%</div>
          </div>
        </div>
      </div>

      <div className="mt-30 px-10">
        <div className="flex justify-between bg-white shadow-sm rounded py-5 px-5 mb-5">
          <div className="font-semibold">Active Projects</div>
        </div>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Deployed at</TableHead>
              <TableHead className="">Link</TableHead>
              <TableHead className="">Github</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.slice(0, 5).map((project, index) => (
              <ActiveProjectsListItem
                key={index}
                framework="React"
                projectName={project.name}
                lastDeploymentDate={project.createdAt}
                deployedUrl={project.deployedUrl}
                githublink={project.url}
                repoId={project.repoId}
                branch={project.branch}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
