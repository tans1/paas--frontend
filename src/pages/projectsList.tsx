import PagesTitle from "../components/atoms/pagesTitle";
import ProjectCard from "../components/molecules/projectCard";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const navigate = useNavigate();

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
          />
        </div>

        <button
          className="ml-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          onClick={handleAddProject}>
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1].map((_, index) => (
          <ProjectCard
            key={index}
            title="Project 1"
            link="https://example.com"
            status="active"
            githubUrl="https://github.com/me"
          />
        ))}
      </div>
    </div>
  );
}
