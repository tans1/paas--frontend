import React from "react";
import Card from "./molecules/projectCard";

const ActiveProjects: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      status: "Active",
      lastUpdated: "5 minutes ago",
    },
    {
      id: 2,
      name: "Project Beta",
      status: "Active",
      lastUpdated: "10 minutes ago",
    },
    // Add more projects as needed
  ];

  const handleAddProject = () => {
    // Logic for adding a new project
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Active Projects</h2>
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add New Project
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {/* {projects.map((project) => (
          <Card key={project.id} title={project.name}>
            <div className="flex items-center space-x-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  project.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}></span>
              <span
                className={`text-${
                  project.status === "Active" ? "green-600" : "red-600"
                }`}>
                {project.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Last updated {project.lastUpdated}
            </p>
          </Card>
        ))} */}
      </div>
    </div>
  );
};

export default ActiveProjects;
