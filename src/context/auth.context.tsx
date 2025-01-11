import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {}
});

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set true if a token exists
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;