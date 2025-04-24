import { useParams } from "react-router";
import PagesTitle from "../components/atoms/pagesTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Log from "../components/molecules/log";

// interface LogEntry {
//   message: string;
// }

export default function BuildLog() {
  const { id } = useParams();
  const headerBreadCrumb = (
    <Breadcrumb className="text-xl font-semibold">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/project/details/${id}`}>
            Details
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Build Log</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const exampleLogs: string[] = [
    "Application started",
    "Connected to database",
    "Warning: High memory usage detected",
    "Error: Failed to fetch data from API",
    "Processing user request...",
    "Request completed successfully",
  ];

  return (
    <div className="mt-10 pl-10 pr-40">
      <PagesTitle title="Project 1" component={headerBreadCrumb} />

      <div className="w-full pt-2 h-[80vh]">
        <Log logs={exampleLogs} />
      </div>
    </div>
  );
}
