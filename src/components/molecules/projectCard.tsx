import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface CardProps {
  repoId: number;
  title: string;
  link?: string;
  githubUrl?: string;
  branch?: string;
  projectDescription: string;
}

const ProjectCard = ({
  title,
  link,
  githubUrl,
  branch,
  repoId,
  projectDescription,
}: CardProps) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCardClick = () => {
    if (typeof repoId !== "number" || isNaN(repoId)) {
      console.error("Invalid repoId:", repoId);
      return;
    }
    navigate(`/dashboard/project/details/${branch}/${repoId}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const normalizeUrl = (url: string) => {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    return "https://" + url;
  };

  const deleteProject = () => {};

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md w-full cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl font-semibold text-gray-900">{title}</div>
        <div
          className="flex items-center gap-2 text-xl"
          onClick={stopPropagation}
        >
          <div onClick={stopPropagation}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger className="w-4 text-center hover:cursor-pointer">
                <i className="fa-solid fa-ellipsis-vertical text-black"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setOpenDialog(true);
                    setDropdownOpen(false);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete project</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this project?
                  </DialogDescription>
                </DialogHeader>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    deleteProject();
                    setOpenDialog(false);
                  }}
                >
                  Confirm Delete
                </button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm" onClick={handleCardClick}>
        {projectDescription ?? "No descriptions found"}
      </p>

      <div className="flex flex-col mt-6 gap-4">
        <div className="w-44">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopPropagation}
            className="flex items-baseline text-sm text-blue-600 hover:underline truncate "
          >
            <i className="fa-brands fa-github mr-2 text-lg text-black"></i>
            Github repo
          </a>
        </div>

        {link && (
          <div
            className="flex items-center gap-1 text-sm"
            onClick={stopPropagation}
          >
            <span className="text-black">Link:</span>
            <a
              href={normalizeUrl(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
