import { TableCell, TableRow } from "@/components/ui/table";
import dateFormat from "dateformat";
import normalizeUrl from "normalize-url";
import { useNavigate } from "react-router";

interface Props {
  framework: Framework;
  projectName: string;
  lastDeploymentDate: string;
  deployedUrl: string;
  githublink: string;
  repoId: number;
  branch: string;
}
type Framework = "Next" | "React" | "Vue" | "Angular";

const frameworksImageMap: Record<Framework, string> = {
  Next: "https://images.prismic.io/turing/652ec31afbd9a45bcec81965_Top_Features_in_Next_js_13_7f9a32190f.webp",
  React:
    "https://miro.medium.com/v2/resize:fit:522/1*NJSv6DGoKTloI8d8im98zg.png",
  Vue: "https://miro.medium.com/v2/resize:fit:900/1*OrjCKmou1jT4It5so5gvOA.jpeg",
  Angular:
    "https://miro.medium.com/v2/resize:fit:1400/1*R1mfXLP9edcArZXwmGbGag.jpeg",
};

export default function ActiveProjectsListItem({
  framework,
  projectName,
  lastDeploymentDate,
  deployedUrl,
  githublink,
  repoId,
  branch,
}: Props) {
  const navigate = useNavigate();
  // const normalizeUrl = (url: string) => {
  //   if (/^https?:\/\//i.test(url)) {
  //     return url;
  //   }
  //   return "https://" + url;
  // };

  const handleDetails = () => {
    navigate(`/dashboard/project/details/${branch}/${repoId}`);
  };
  return (
    <TableRow className="hover:bg-white">
      <TableCell
        className="font-bold flex items-center pr-40 hover:cursor-pointer"
        onClick={handleDetails}>
        {projectName && (<><img
          src={frameworksImageMap[framework]}
          alt={framework}
          className="w-15 h-10 rounded-full mr-2"
        />
          <p>{projectName}</p></>)}
      </TableCell>
      <TableCell
        className=" pr-40 hover:cursor-pointer"
        onClick={handleDetails}>
        {dateFormat(lastDeploymentDate, "dddd, mmmm dS, yyyy, h:MM TT")}
      </TableCell>
      <TableCell className="">
        {deployedUrl && (<a
          href={normalizeUrl(deployedUrl)}
          className="text-blue-600"
          target="_blank">
          {deployedUrl}
        </a>)}
      </TableCell>

      <TableCell className="">
        {githublink && (<a
          href={normalizeUrl(githublink)}
          className="text-blue-600"
          target="_blank">
          {githublink}
        </a>)}
      </TableCell>
    </TableRow>
  );
}
