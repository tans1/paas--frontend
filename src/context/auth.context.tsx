// import { useState, useEffect } from "react";
// import { ReactNode } from "react"; // ✅ Correct placement
// // import { useNavigate } from 'react-router';

// // const AuthContext = createContext({
// //   isAuthenticated: false,
// //   login: (token: string) => {
// //     console.log(token);
// //   },
// //   logout: () => {},
// // });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     setIsAuthenticated(!!token);
//   }, []);

//   const login = (token: string) => {
//     localStorage.setItem("authToken", token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user-storage');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
