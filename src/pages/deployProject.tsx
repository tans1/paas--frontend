import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { useDashboardStore } from "../store/dashboardStore";
import { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";
import deployProject from "../api/deploy";

interface EnvPair {
  key: string;
  value: string;
}

interface DeployedProject {
  envVars: EnvPair[];
  envFile: File | null;
  owner: string | undefined;
  repo: string | undefined;
  githubUsername: string | undefined;
  branch: string | undefined;
}

export default function DeployProject() {
  const navigate = useNavigate();
  const { toBeDeployedProject } = useDashboardStore();
  const { user } = useUserStore();
  const [branch, setBranch] = useState(toBeDeployedProject?.default_branch);
  const [framework, setFramework] = useState("React");

  const frameworks = [
    "React",
    "Next.js",
    "Vue.js",
    "Angular",

    "Nuxt.js",
    "Express.js",
    "Nestjs",
  ];

  const [tab, setTab] = useState<string>("file");

  const [envFile, setEnvFile] = useState<File | null>(null);

  const [envVars, setEnvVars] = useState<EnvPair[]>([{ key: "", value: "" }]);

  const onDrop = (accepted: File[]) => {
    if (accepted.length > 0) {
      handleFileChange({ target: { files: accepted } } as any);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "text/plain": [".env"] },
  });

  const handleManualChange =
    (idx: number, field: keyof EnvPair) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const updated = envVars.map((pair, i) =>
        i === idx ? { ...pair, [field]: e.target.value } : pair
      );

      const nonBlank = updated.filter(
        (p, i) => i === updated.length - 1 || p.key.trim() || p.value.trim()
      );

      const last = nonBlank[nonBlank.length - 1];
      if (last.key.trim() || last.value.trim()) {
        nonBlank.push({ key: "", value: "" });
      }

      setEnvVars(nonBlank);
    };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setEnvFile(e.target.files[0]);
  };

  const handleCancel = () => {
    navigate("/dashboard/add");
  };

  const handleDeploy = async () => {
    const project: DeployedProject = {
      envVars: envVars
        .filter((p) => p.key.trim() !== "" && p.value.trim() !== "")
        .map((p) => ({ key: p.key.trim(), value: p.value.trim() })),
      envFile,
      branch,
      repo: toBeDeployedProject?.repoName,
      owner: user?.githubUsername,
      githubUsername: user?.githubUsername,
    };
    console.log("project to be deploed is...", project);
    try {
      const { data } = await deployProject(project);
      console.log("the returned data after deployment is", data);
      const newProject = data;
      navigate(`/dashboard/project/details/${branch}/${newProject.repoId}/logs`);
    } catch (error) {
      console.error("Deployment failed:", error);
    }
  };

  return (
    <div className="w-full mt-10 pl-10 pr-40">
      <div className="bt-5">
        <p className="text-black text-4xl font-bold mb-4">
          {toBeDeployedProject?.repoName}
        </p>
      </div>
      <p className="text-gray-500">{toBeDeployedProject?.description}</p>
      <div className="grid grid-cols-2 shadow-sm pb-5 pl-4 mt-5">
        <div>
          <div className="my-5">
            <p>Framework</p>
            <Accordion
              type="single"
              collapsible
              className="px-2 w-[400px] shadow-sm text-start my-3 bg-gray-50 text-gray-700 py-1">
              <AccordionItem value={framework ?? ""}>
                <AccordionTrigger className="hover:no-underline cursor-pointer w-full flex justify-between items-center py-2">
                  <div>{framework}</div>
                  <div>
                    <ChevronDown size={18} />
                  </div>
                </AccordionTrigger>

                <div className="max-h-60 overflow-y-auto">
                  {frameworks.map((frm, index) => (
                    <AccordionContent
                      key={index}
                      className="cursor-pointer text-sm my-3 hover:bg-gray-100 py-1"
                      onClick={() => setFramework(frm)}>
                      {frm}
                    </AccordionContent>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-5 ">
            <p>Deployed Branch</p>
            <Accordion
              type="single"
              collapsible
              className="px-2 w-[400px] shadow-sm text-start my-3 bg-gray-50 text-gray-700 py-1">
              <AccordionItem value={branch ?? ""}>
                <AccordionTrigger className="hover:no-underline cursor-pointer w-full flex justify-between items-center py-2">
                  <div>{branch}</div>
                  <div>
                    <ChevronDown size={18} />
                  </div>
                </AccordionTrigger>

                <div className="max-h-60 overflow-y-auto">
                  {toBeDeployedProject?.branches.map((br, index) => (
                    <AccordionContent
                      key={index}
                      className="cursor-pointer text-sm my-3 hover:bg-gray-100 py-1"
                      onClick={() => setBranch(br)}>
                      {br}
                    </AccordionContent>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="my-5">
            <p className="mb-2">Root directory</p>
            <input
              type="text"
              defaultValue={"./"}
              className="border border-gray-300 py-1 rounded-sm pl-1 outline-0"
            />
          </div>
        </div>
        <div>
          <div className="mb-5">
            <p className="mb-2">Environment variables</p>
            <Tabs
              value={tab}
              onValueChange={(v: string) => setTab(v)}
              className="w-[500px] bg-gray-50 shadow-sm pb-5 px-1">
              <TabsList className="py-7 w-full">
                <TabsTrigger
                  value="file"
                  className=" bg-gray-200 py-5 px-10 mr-3 cursor-pointer">
                  .env file
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="bg-gray-200 py-5 px-10 cursor-pointer">
                  Manual
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="w-full">
                <div
                  {...getRootProps()}
                  className={`flex flex-col items-center justify-center h-48 
                    border-2 border-dashed rounded-lg cursor-pointer 
                    transition-colors
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-100 hover:border-gray-400"
                    }`}>
                  <input {...getInputProps()} accept=".env" />
                  <UploadCloud className="w-12 h-12 mb-2 text-gray-500" />
                  <p className="text-gray-600">
                    {isDragActive
                      ? "Release to drop your .env file"
                      : "Drag & drop your .env file here, or click to select"}
                  </p>
                  <em className="text-sm text-gray-400">.env</em>
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <div className="space-y-2">
                  {envVars.map((pair, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Key"
                        value={pair.key}
                        onChange={handleManualChange(i, "key")}
                        className="flex-1 border rounded p-1"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={pair.value}
                        onChange={handleManualChange(i, "value")}
                        className="flex-1 border rounded p-1"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex gap-2 ">
            <button
              className="px-10 py-2 border cursor-pointer"
              onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="px-10 py-2 bg-blue-600 text-white rounded cursor-pointer"
              onClick={handleDeploy}>
              Deploy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
