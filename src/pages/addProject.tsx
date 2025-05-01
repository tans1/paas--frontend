import PagesTitle from "../components/atoms/pagesTitle";
import UserRepositoryListItem from "../components/molecules/userRepositoryListItem";

import { Table, TableBody } from "@/components/ui/table";
import { useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";

export default function AddProject() {
  const { fetchRepositories, repositories } = useDashboardStore();
  useEffect(() => {
    const fetchAllRepositories = async () => {
      try {
        await fetchRepositories();
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchAllRepositories();
  }, []);

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
          />
        </div>
      </div>
      <div>
        <Table>
          <TableBody>
            {repositories.map((repository, index) => (
              <UserRepositoryListItem
                key={index}
                repoName={repository.name}
                default_branch={repository.default_branch}
                // recentCommitMessage="Initial commit"
                language={repository.language}
                created_at={repository.created_at}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
