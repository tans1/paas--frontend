import PagesTitle from "../components/atoms/pagesTitle";
import {
  Github,
  CircleCheckBig,
  GitBranch,
  GitCommitHorizontal,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ProjectDetail() {
  const [preview, setPreview] = useState(null);
  const API_KEY = import.meta.env.VITE_LINK_PREVIEW_API_KEY;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const url = `https://api.linkpreview.net/?key=${API_KEY}&q=https://github.com`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPreview(data));
  }, []);

  const handleBuildLogsClick = () => {
    navigate(`/dashboard/project/details/${id}/buildLog`);
  };
  const handleRunTimeLogsClick = () => {
    navigate(`/dashboard/project/details/${id}/runtimeLog`);
  };
  return (
    <div className="mt-10 pl-10 pr-40">
      <PagesTitle title="Project 1" subtitle="Details" />

      <div className="flex justify-between items-center mt-10">
        <div>
          <p>Project 1</p>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <button className="flex items-center cursor-pointer  bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2 ">
              <span>
                <Github className="w-5 mr-1" />
              </span>
              Repository
            </button>
          </div>

          <div>
            <button className="cursor-pointer bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2 ">
              Usage
            </button>
          </div>

          <div>
            <button className="cursor-pointer bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2">
              Domains
            </button>
          </div>

          <div>
            <button className="cursor-pointer bg-[#2F27CE] text-white font-semibold rounded-md shadow-sm px-10 py-2 ">
              Visit
            </button>
          </div>
        </div>
      </div>
      <p className="bg-gray-200 h-px w-full my-10"></p>
      <div className="flex justify-between items-center mt-10">
        <div>
          <p className="text-2xl font-bold">Production Deployment</p>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <button
              className="flex items-center cursor-pointer  bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2"
              onClick={handleBuildLogsClick}>
              Build Logs
            </button>
          </div>

          <div>
            <button
              className="cursor-pointer bg-white text-black font-semibold rounded-md shadow-sm px-5 py-2 "
              onClick={handleRunTimeLogsClick}>
              Runtime Logs
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2">
        <div className="border h-96">
          {preview ? (
            <div className="flex gap-4 w-full h-full">
              <img
                src={preview.image}
                alt="thumbnail"
                className="max-w-full max-h-full "
              />
            </div>
          ) : (
            <p>Loading preview...</p>
          )}
        </div>
        <div className="border p-5">
          <ul>
            <li className="mb-5">
              <p className="text-gray-500">Domains</p>
              <p>
                <a href="https://example.com" target="_blank">
                  https://example.com
                </a>
              </p>
            </li>
            <li className="mb-5">
              <div className="flex gap-10">
                <div className="flex-shrink-0">
                  <p className="text-gray-500">Status</p>
                  <p className="flex items-center whitespace-nowrap">
                    <CircleCheckBig className="w-5 mr-1 text-green-600" />
                    ready
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-gray-500">Created</p>
                  <p>date</p>
                </div>
              </div>
            </li>
            <li>
              <p className="text-gray-500">Source</p>
              <p className="flex items-center whitespace-nowrap my-2">
                <GitBranch className="w-4 mr-1" />
                branch
              </p>
              <p className="flex items-center whitespace-nowrap">
                <GitCommitHorizontal className="w-5" />
                last commit message
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <Accordion type="single" collapsible className="bg-gray-100 mt-5 px-5">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline cursor-pointer text-xl">
              Deployment Configuration
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
