import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex gap-2 justify-end">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Header;
