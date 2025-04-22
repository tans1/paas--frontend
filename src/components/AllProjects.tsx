import React from "react";
import Card from "./molecules/projectCard";

const AllProjects: React.FC = () => {
  const projects = [
    { id: 1, name: "Project Alpha", status: "Active" },
    { id: 2, name: "Project Beta", status: "Inactive" },
    // Add more projects as needed
  ];

  return (
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
        </Card>
      ))} */}
    </div>
  );
};

export default AllProjects;
