import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Login from "./pages/LoginChange";
import Register from "./pages/RegisterChange";
import Dashboard from "./pages/dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
