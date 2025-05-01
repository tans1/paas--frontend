import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PagesTitle from "../components/atoms/pagesTitle";
import ProjectCard from "../components/molecules/projectCard";
import { useDashboardStore } from "../store/dashboardStore";

export default function ProjectsList() {
  const navigate = useNavigate();
  const { projects } = useDashboardStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
  );

  const handleAddProject = () => {
    navigate("/dashboard/project/add");
  };

  return (
    <div className="mt-10 pl-10 pr-40">
      <PagesTitle title="All Projects" subtitle="Dashboard" />

      <div className="flex items-center justify-between bg-white rounded-md mt-10 mb-10">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full max-w-md ">
          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
          <input
            type="text"
            placeholder="Search projects..."
            className="outline-none w-full text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="ml-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          onClick={handleAddProject}>
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.name}
            link={project.url}
            status="active"
            githubUrl="https://github.com/me"
          />
        ))}
      </div>
    </div>
  );
}
