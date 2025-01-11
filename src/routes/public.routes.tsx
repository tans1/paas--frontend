import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // Always return either a valid JSX element or null
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
