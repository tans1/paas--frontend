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
import LoginSuccess from "./pages/login-success";
import ProtectedRoute from "./routes/protected.routes";
import DashboardStructure from "./components/templates/dashboardStructure";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="register" element={<Register />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardStructure />
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
