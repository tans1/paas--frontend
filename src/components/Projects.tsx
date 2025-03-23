import { useEffect, useState } from 'react'; 
import { useDashboardStore } from '../store/dashboardStore';
import { redirect } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function ProjectsPage() {
  const { projects, fetchProjects,setCurrentProject} = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-5xl py-10 px-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search Repositories and Projects..."
              className="w-full rounded-md bg-gray-50 py-2 px-3 text-sm outline-none ring-1 ring-gray-300 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <a href="projectsList">
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Add Project
            </button>
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-lg  cursor-pointer"
              onClick={() => {
                setCurrentProject(project);
                navigate('ProjectDetailPage'); 

              }}

            >
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block w-fit text-sm text-indigo-500 hover:underline"
                >
                  {project.url.replace('https://', '')}
                </a>
              )}

              {project.deployedUrl && (
                <a
                  href={`${project.deployedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block w-fit text-sm text-indigo-500 hover:underline"
                >
                  {project.deployedIp}:{project.deployedPort}
                </a>
              )}
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No projects found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
