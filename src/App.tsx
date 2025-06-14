import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/templates/layout";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import LoginSuccess from "./pages/loginSuccess";
import LoginFailure from "./pages/loginFailure";
import IntegrationSuccess from "./pages/integrationSuccess";
import IntegrationFailure from "./pages/integrationFailure";
import ProtectedRoute from "./routes/protected.routes";
import DashboardStructure from "./components/templates/dashboardStructure";
import Settings from "./pages/settings";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "sonner";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="login-failure" element={<LoginFailure />} />
          <Route path="integration-success" element={<IntegrationSuccess />} />
          <Route path="integration-failure" element={<IntegrationFailure />} />
          <Route path="register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardStructure />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings/*"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
