import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/LayoutChange";
import Home from "./pages/home";
import Register from "./pages/RegisterChange";
import Login from "./pages/LoginChange";
import LoginSuccess from "./pages/LoginSuccessChange";
import Dashboard from "./pages/dashboard"; // Import the Dashboard page
import ProtectedRoute from "./routes/protected.routes";
import PublicRoute from "./routes/public.routes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Home is a public route */}
          <Route
            index
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="login-success"
            element={
              <PublicRoute>
                <LoginSuccess />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
