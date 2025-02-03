import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import LoginSuccess from "./pages/login-success";
import ProtectedRoute from "./routes/protected.routes";
import PublicRoute from "./routes/public.routes";
import Dashboard from "./components/Dashboard";
import Domain from "./pages/domain";
import Hosting from "./pages/hosting";
import PricingPage from "./pages/pricing";
import Contacts from "./pages/contacts";

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
           <Route
            path="domain"
            element={
              <PublicRoute>
                 <Domain />
              </PublicRoute>
            }
          />
           <Route
            path="hosting"
            element={
              <PublicRoute>
                 <Hosting />
              </PublicRoute>
            }
          />
          <Route
            path="pricing"
            element={
              <PublicRoute>
                 <PricingPage />
              </PublicRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <PublicRoute>
                 <Contacts />
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
