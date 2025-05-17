import PagesTitle from "../components/atoms/pagesTitle";
import UserRepositoryListItem from "../components/molecules/userRepositoryListItem";
import { useUserStore } from "../store/userStore";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";

import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";

export default function AddProject() {
  const { fetchRepositories, repositories, loading } = useDashboardStore();
  const { user } = useUserStore();
  const [showLoader, setShowLoader] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<typeof repositories>([]);

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
      repositories.filter((repo) => repo.name.toLowerCase().startsWith(term))
    );
  }, [repositories, searchTerm]);

  if (!user?.githubUsername) {
    return (
      <div className="w-full mt-10 pl-10 pr-40">
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

  return (
    <div className="w-full mt-10 pl-10 pr-40">
      <PagesTitle title="Add Project" subtitle="Repositories" />

      <div className="flex items-center justify-between bg-white rounded-md mt-10 mb-10">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full max-w-md ">
          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
          <input
            type="text"
            placeholder="Search repository..."
            className="outline-none w-full text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading || showLoader ? (
        <div className="w-full h-[40vh] flex justify-center items-center ">
          <div className="w-[10%] h-full m-auto flex flex-col justify-center">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow className="hover:cursor-default hover:bg-white">
                <TableHead className="">Repo Name</TableHead>
                <TableHead className="">Default branch</TableHead>
                <TableHead className="">Language</TableHead>
                <TableHead className="">Created at</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRepos.map((repository, index) => (
                <UserRepositoryListItem
                  key={index}
                  id={repository.id}
                  repoName={repository.name}
                  default_branch={repository.default_branch}
                  language={repository.language}
                  created_at={repository.created_at}
                  description={repository.description}
                  html_url={repository.html_url}
                  branches={repository.branches}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
