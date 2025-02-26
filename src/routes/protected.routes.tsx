import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children} :  {children: JSX.Element  } ) => {
  const token = localStorage.getItem('authToken');
  return !!token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
