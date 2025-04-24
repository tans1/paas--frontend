import { TableCell, TableRow } from "@/components/ui/table";
import { GitBranch, GitCommitHorizontal } from "lucide-react";

interface Props {
  repoName: string;
  defaultBranch: string;
  recentCommitMessage: string;
  recentCommitDate: string;
}

export default function UserRepositoryListItem({
  repoName,
  defaultBranch,
  recentCommitMessage,
  recentCommitDate,
}: Props) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="font-bold">{repoName}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-3">
          <p className="text-sm flex items-center">
            <span>
              <GitBranch className="w-4 mr-1" />
            </span>
            {defaultBranch}
          </p>

          {/* <p className="text-sm flex items-center">
            <span>
              <GitCommitHorizontal className="w-5" />
            </span>
            {recentCommitMessage}
          </p> */}
        </div>
      </TableCell>

      <TableCell>
        <span className="flex items-center">
          <GitCommitHorizontal className="w-4 mr-1" />
          {recentCommitMessage}
        </span>
      </TableCell>

      <TableCell className="text-end">
        <span> last commit on </span>
        {recentCommitDate}
      </TableCell>
    </TableRow>
  );
}
