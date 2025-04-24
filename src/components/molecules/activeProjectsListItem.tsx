import { TableCell, TableRow } from "@/components/ui/table";

interface Props {
  framework: Framework;
  projectName: string;
  lastDeploymentDate: string;
  deployedUrl: string;
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
}: Props) {
  return (
    <TableRow className="hover:bg-white">
      <TableCell className="font-bold flex items-center">
        <img
          src={frameworksImageMap[framework]}
          alt={framework}
          className="w-15 h-10 rounded-full mr-2"
        />
        {projectName}
      </TableCell>
      <TableCell className="text-center">{lastDeploymentDate}</TableCell>
      <TableCell className="text-end">{deployedUrl}</TableCell>
    </TableRow>
  );
}
