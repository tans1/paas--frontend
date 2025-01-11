import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import LoginSuccess from "./pages/LoginSuccess"

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="login-success" element={<LoginSuccess />} />
//           <Route path="register" element={<Register />} />
//         </Route>
//       </Routes>

//     </Router>
//   )
// }

// export default App

import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './routes/protected.routes';
import PublicRoute from './routes/public.routes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes (e.g., Login and Register) */}
        <Route path="/" element={<Layout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login-success"
          element={
            <PublicRoute>
              <LoginSuccess />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes (e.g., Dashboard and Profile) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback or default route */}
        <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

