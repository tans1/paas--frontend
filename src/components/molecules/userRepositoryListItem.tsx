import { TableCell, TableRow } from "@/components/ui/table";
import { GitBranch, GitCommitHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboardStore } from "../../store/dashboardStore";

interface Props {
  repoName: string;
  default_branch: string;
  created_at: string;
  language: string;
  description: string;
  html_url: string;
  branches: string[];
}

export default function UserRepositoryListItem({
  repoName,
  default_branch,
  created_at,
  language,
  description,
  html_url,
  branches,
}: Props) {
  const navigate = useNavigate();
  const { setToBeDeployedProject } = useDashboardStore();
  const handleDeployment = () => {
    setToBeDeployedProject({
      repoName,
      default_branch,
      created_at,
      language,
      description,
      html_url,
      branches,
    });
    navigate("/dashboard/deploy");
  };
  return (
    <TableRow className="cursor-pointer" onClick={handleDeployment}>
      <TableCell className="font-bold">{repoName}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-3">
          <p className="text-sm flex items-center">
            <span>
              <GitBranch className="w-4 mr-1" />
            </span>
            {default_branch}
          </p>

          {/* <p className="text-sm flex items-center">
            <span>
              <GitCommitHorizontal className="w-5" />
            </span>
            {recentCommitMessage}
          </p> */}
        </div>
      </TableCell>

      {/* <TableCell>
        <span className="flex items-center">
          <GitCommitHorizontal className="w-4 mr-1" />
          {default_branch}
        </span>
      </TableCell> */}

      <TableCell>
        <span className="flex items-center">
          <GitCommitHorizontal className="w-4 mr-1" />
          {language}
        </span>
      </TableCell>

      <TableCell className="text-end">
        <span> created at </span>
        {created_at}
      </TableCell>
    </TableRow>
  );
}
