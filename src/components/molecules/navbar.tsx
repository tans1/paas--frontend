import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm font-sans sticky top-0 z-10 w-full">
      <div className="py-3 px-10 flex justify-between items-end">
        <Link
          to="/"
          className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
        >
          <i className="fas fa-home mr-2"></i>
          Home
        </Link>
        <div className="flex items-end gap-6">
          {user && (
            <>
              <div className="relative cursor-pointer">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div>
                      <i className="fa-solid fa-bell text-xl "></i>
                      <div className="absolute text-sm text-red-500 bottom-4 left-3 font-bold">
                        10
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-10">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>notification 1</DropdownMenuItem>
                    <DropdownMenuItem>notification 1</DropdownMenuItem>
                    <DropdownMenuItem>notification 1</DropdownMenuItem>
                    <DropdownMenuItem>notification 1</DropdownMenuItem>
                    <DropdownMenuItem>notification 1</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                      <img
                        src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                        alt="user-image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-5">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
