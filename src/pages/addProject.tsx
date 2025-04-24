import PagesTitle from "../components/atoms/pagesTitle";
import UserRepositoryListItem from "../components/molecules/userRepositoryListItem";

import { Table, TableBody } from "@/components/ui/table";

export default function AddProject() {
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <UserRepositoryListItem
                key={index}
                repoName="Repository name"
                defaultBranch="main"
                recentCommitMessage="Initial commit"
                recentCommitDate="2023-10-01"
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
