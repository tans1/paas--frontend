import { useState, useEffect } from "react";
import { Search, Github, GitBranch, Calendar, Star, Code2 } from "lucide-react";
import { useUserStore } from "../store/userStore";
import { useDashboardStore } from "../store/dashboardStore";
import PagesTitle from "../components/atoms/pagesTitle";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";

export default function AddProject() {
  const { fetchRepositories, repositories, loading } = useDashboardStore();
  const { user } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<typeof repositories>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchAllRepositories = async () => {
      try {
        await fetchRepositories();
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setTimeout(() => setShowLoader(false), 2000);
      }
    };
    fetchAllRepositories();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    setFilteredRepos(
      repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(term) ||
          repo.description?.toLowerCase().includes(term)
      )
    );
  }, [repositories, searchTerm]);

  const handleProjectSelect = (projectName: string) => {
    console.log("Deploy project:", projectName);
    // Navigation or deployment logic here
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-100 text-yellow-800",
      Python: "bg-blue-100 text-blue-800",
      CSS: "bg-purple-100 text-purple-800",
      Dart: "bg-cyan-100 text-cyan-800",
      Unknown: "bg-gray-100 text-gray-800",
    };
    return colors[language] || colors["Unknown"];
  };

  if (!user?.githubUsername) {
    return (
      <div className="p-8">
        <PagesTitle title="Add Project" subtitle="Repositories" />
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-medium text-yellow-800">
                GitHub Account Required
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Please connect your GitHub account to add projects. You can do
                this in the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading || showLoader) {
    return (
      <div className="w-full h-[40vh] flex justify-center items-center ">
        <div className="w-[10%] h-full m-auto flex flex-col justify-center">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Add Project</h1>
        <p className="text-gray-600">
          Select a repository to deploy from your GitHub account
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="pt-6 px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 pb-4">
          <div className="text-lg font-medium flex items-center">
            <Github className="w-5 h-5 mr-2" />
            Repositories ({filteredRepos.length})
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {filteredRepos.map((repo, index) => (
              <div
                key={index}
                className="group border border-gray-200 rounded-lg p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {repo.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {/* <span className="text-sm text-gray-500">
                          {repo.stars ?? 0}
                        </span> */}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">
                          {repo.default_branch}
                        </span>
                      </div>
                      <span
                        className={`border px-2 py-0.5 rounded text-xs flex items-center ${getLanguageColor(
                          repo.language || "Unknown"
                        )}`}
                      >
                        <Code2 className="w-3 h-3 mr-1" />
                        {repo.language || "Unknown"}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(repo.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      View
                    </a>
                    <button
                      onClick={() => handleProjectSelect(repo.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Deploy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRepos.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No repositories found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
