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
import Dashboard from "./components/templates/dashboard";
import Domain from "./pages/domain";
import Hosting from "./pages/hosting";
import PricingPage from "./pages/pricing";
import Contacts from "./pages/contacts";

// TODO: Move out the routing to a different file
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Home is a public route */}
          <Route index element={<Home />} />

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="register" element={<Register />} />
          <Route path="domain" element={<Domain />} />
          <Route path="hosting" element={<Hosting />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contacts" element={<Contacts />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard/*"
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
