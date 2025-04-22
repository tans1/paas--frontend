import { Outlet } from "react-router-dom";
import Navbar from "../components/home/header/navbar";

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Layout;
