import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';

const ProtectedRoute = ({children} :  {children: JSX.Element  } ) => {
  // const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('authToken');
  // setIsAuthenticated();
  // console.log("Auth State:", isAuthenticated); 
  return !!token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
