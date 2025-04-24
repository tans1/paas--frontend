import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CardProps {
  title: string;
  link?: string;
  status?: string;
  githubUrl?: string;
}

const ProjectCard = ({ title, link, status, githubUrl }: CardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/project/details/${title}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md w-full cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-2xl font-semibold text-gray-900">{title}</div>
        <div
          className="flex items-center gap-2 text-xl"
          onClick={stopPropagation}>
          <div className="w-8 h-8 flex items-center justify-center rounded-md cursor-default">
            {status === "active" ? (
              <i className="fa-regular fa-circle-check text-green-500"></i>
            ) : (
              <i className="fa-solid fa-pause text-red-500"></i>
            )}
          </div>
          <div onClick={stopPropagation}>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-4 text-center  cursor-pointer">
                <i className="fa-solid fa-ellipsis-vertical text-black"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm" onClick={handleCardClick}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="flex flex-col mt-6 gap-4">
        <div className="w-44">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopPropagation}
            className="flex items-baseline text-sm text-blue-600 hover:underline truncate ">
            <i className="fa-brands fa-github mr-2 text-lg text-black"></i>
            fetch from Github repo
          </a>
        </div>

        {link && (
          <div
            className="flex items-center gap-1 text-sm"
            onClick={stopPropagation}>
            <span className="text-black">Link:</span>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate">
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
