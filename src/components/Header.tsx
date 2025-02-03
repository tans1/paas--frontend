import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
function Header() {
  const { isAuthenticated,logout} = useAuth();
  const useAuths = isAuthenticated ? (
    <Link onClick={logout} to="/logout">Logout</Link>
  ) : (
    <>
    <Link  to="/login">Login</Link>
    <Link to="/register">Register</Link>
    </>
  );
  return (
    <nav className="flex gap-2 justify-end">
      <Link to="/">Home</Link>
      {useAuths}
    </nav>
  );
}

export default Header;
