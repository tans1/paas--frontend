import { FolderDot, Cpu } from "lucide-react";
import ActiveProjectsListItem from "../components/molecules/activeProjectsListItem";
import { Table, TableBody } from "@/components/ui/table";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate("/dashboard/projects");
  };
  return (
    <div className="">
      <div className=" bg-[#0057D9] pt-10  h-52 flex flex-col justify-between gap-10">
        <div className="flex justify-between items-center px-10">
          <div className="text-3xl font-bold text-white">Dashboard</div>
          <div>
            <button
              className="text-black font-semibold bg-white px-10 py-2 rounded cursor-pointer shadow-sm"
              onClick={handleProjectClick}>
              All Projects
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 pl-5">
          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold"> Projects</div>
              <div>
                <FolderDot />
              </div>
            </div>
            <div className="text-5xl font-semibold">18</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Active Projects</div>
              <div>
                <FolderDot className="text-blue-400" />
              </div>
            </div>
            <div className="text-5xl font-semibold">4</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md w-80 h-40 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Max CPU </div>
              <div>
                <Cpu className="text-green-500" />
              </div>
            </div>
            <div className="text-5xl font-semibold">76%</div>
          </div>
        </div>
      </div>

      <div className="mt-30 px-10">
        <div className="flex justify-between bg-white shadow-sm rounded py-5 px-5 mb-5">
          <div className="font-semibold">Active Projects</div>
          {/* <div className="text-blue-400 cursor-pointer">View All Projects</div> */}
        </div>
        <Table>
          <TableBody>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <ActiveProjectsListItem
                key={index}
                framework="React"
                projectName="Project 1"
                lastDeploymentDate="2023-10-01"
                deployedUrl="https://example.com"
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
