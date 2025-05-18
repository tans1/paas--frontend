import { useUserStore } from "@/store/userStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface PublicRouteProps {
  children: ReactNode;
}
const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useUserStore();

  // Always return either a valid JSX element or null
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
