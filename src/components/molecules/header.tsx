import { MenuSquareIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    // <!-- Navigation -->
    <nav className="fixed w-screen z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-cube text-indigo-600 text-2xl mr-2"></i>
              <Link to="/" className="text-xl font-bold text-gray-900">
                PaaS
              </Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-testid="header-home-link">
              Home
            </Link>
            <a
              href="/#pricing"
              className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-testid="header-pricing-link"
            >
              Pricing
            </a>
            <a
              href="/#features"
              className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-testid="header-features-link">
              Features
            </a>
            <a
              href="/#contact"
              className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              data-testid="header-contact-link">
              Contact
            </a>
            {user ? (
              <>
                <Link
                  to="/dashboard/"
                  className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  data-testid="header-dashboard-link">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-indigo-600 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  data-testid="header-logout-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  data-testid="header-login-link">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                  data-testid="header-signup-link">
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center mr-5">
            <DropdownMenu>
              <DropdownMenuTrigger data-testid="mobile-menu-toggle">
                <i>
                  <MenuSquareIcon />
                </i>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <DropdownMenuLabel>
                  <Link
                    to="/"
                    className="hover:text-indigo-600 px-3 text-sm font-medium"
                    data-testid="mobile-header-home-link">
                    Home
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <a
                    href="/#pricing"
                    className="hover:text-indigo-600 px-3 text-sm font-medium"
                    data-testid="mobile-header-pricing-link">
                    Pricing
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a
                    href="/#features"
                    className="hover:text-indigo-600 px-3 text-sm font-medium"
                    data-testid="mobile-header-features-link">
                    Features
                  </a>
                </DropdownMenuItem>
                <DropdownMenuLabel>
                  <a
                    href="/#contact"
                    className="hover:text-indigo-600 px-3 text-sm font-medium"
                    data-testid="mobile-header-contact-link">
                    Contact
                  </a>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <Link
                        to="/dashboard/projects"
                        className="hover:text-indigo-600 px-3 text-sm font-medium"
                        data-testid="mobile-header-dashboard-link">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700"
                      data-testid="mobile-header-logout-link">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link
                        to="/login"
                        className="hover:text-indigo-600 px-3 text-sm font-medium"
                        data-testid="mobile-header-login-link">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/register"
                        className="hover:text-indigo-600 px-3 text-sm font-medium"
                        data-testid="mobile-header-signup-link">
                        Sign up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
