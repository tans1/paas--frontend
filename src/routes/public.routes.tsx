import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";

interface PublicRouteProps {
  children: ReactNode;
}
const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  // Always return either a valid JSX element or null
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
