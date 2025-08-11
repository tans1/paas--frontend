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
    <TableRow
      className="cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800" // Added hover effect
      onClick={handleDeployment}
    >
      <TableCell className="font-semibold text-base w-[45%] py-3"> {/* Slightly larger and bolder */}
        {repoName}
      </TableCell>

      <TableCell className="w-[18%] py-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400"> {/* Smaller text, subtle color */}
          <GitBranch className="w-4 h-4 mr-1 text-blue-500" /> {/* Icon color for emphasis */}
          {default_branch}
        </div>
      </TableCell>

      <TableCell className="w-[18%] py-3">
        <span className="flex items-center text-sm text-gray-600 dark:text-gray-400"> {/* Smaller text, subtle color */}
          <GitCommitHorizontal className="w-4 h-4 mr-1 text-purple-500" /> {/* Icon color for emphasis */}
          {language}
        </span>
      </TableCell>

      <TableCell className="text-right text-sm text-gray-600 dark:text-gray-400 py-3"> {/* Aligned right for dates, smaller text */}
        {dateFormat(created_at, "mmm d, yyyy")} {/* Simplified date format for readability */}
      </TableCell>
    </TableRow>
  );
}