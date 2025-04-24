import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("authToken");
  // return !!token ? children : <Navigate to="/login" />;
  console.log(token);
  return children;
};

export default ProtectedRoute;
