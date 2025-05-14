import { TableCell, TableRow } from "@/components/ui/table";
import { GitBranch, GitCommitHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboardStore } from "../../store/dashboardStore";
import dateFormat from "dateformat";

interface Props {
  id: number;
  repoName: string;
  default_branch: string;
  created_at: string;
  language: string;
  description: string;
  html_url: string;
  branches: string[];
}

export default function UserRepositoryListItem({
  id,
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
      id,
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
    <TableRow className="cursor-pointer w-full" onClick={handleDeployment}>
      <TableCell className="font-bold w-[50%]">{repoName}</TableCell>
      <TableCell className="w-[15%]">
        <div className="flex flex-col gap-3">
          <p className="text-sm flex items-center">
            <span>
              <GitBranch className="w-4 mr-1" />
            </span>
            {default_branch}
          </p>
        </div>
      </TableCell>

      <TableCell className="w-[15%]">
        <span className="flex items-center">
          <GitCommitHorizontal className="w-4 mr-1" />
          {language}
        </span>
      </TableCell>

      <TableCell className="text-start">
        {/* <span>Created at : </span> */}
        {dateFormat(created_at, "mmmm dS, yyyy")}
      </TableCell>
    </TableRow>
  );
}
