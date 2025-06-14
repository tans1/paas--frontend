import { TableCell, TableRow } from "@/components/ui/table";
import dateFormat from "dateformat";
import normalizeUrl from "normalize-url";
import { useNavigate } from "react-router";
import { Framework, frameworksImageMap } from "@/types/frameworks";

interface Props {
  framework: Framework;
  projectName: string;
  lastDeploymentDate: string;
  deployedUrls: string[];
  githublink: string;
  repoId: number;
  branch: string;
}

export default function ActiveProjectsListItem({
  framework,
  projectName,
  lastDeploymentDate,
  deployedUrls,
  githublink,
  repoId,
  branch,
}: Props) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/dashboard/project/details/${branch}/${repoId}`);
  };

  return (
    <TableRow className="hover:bg-white">
      <TableCell
        className="font-bold flex items-center pr-40 hover:cursor-pointer"
        onClick={handleDetails}
      >
        <img
          src={frameworksImageMap[framework]}
          alt={framework}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        {projectName}
      </TableCell>
      <TableCell className="pr-40 hover:cursor-pointer" onClick={handleDetails}>
        {dateFormat(lastDeploymentDate, "dddd, mmmm dS, yyyy, h:MM TT")}
      </TableCell>
      <TableCell className="">
        {deployedUrls && deployedUrls.length > 0 ? (
          deployedUrls.map((url, idx) => (
            <span key={url}>
              <a
                href={normalizeUrl(url)}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
              {idx < deployedUrls.length - 1 && ", "}
            </span>
          ))
        ) : (
          <span className="text-gray-400">No domains</span>
        )}
      </TableCell>

      <TableCell className="">
        <a
          href={normalizeUrl(githublink)}
          className="text-blue-600"
          target="_blank"
        >
          {githublink}
        </a>
      </TableCell>
    </TableRow>
  );
}
