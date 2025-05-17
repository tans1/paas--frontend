import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

// TODO: Handle token expiration
// TODO: Update file name
const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setGithubUsername, login } = useUserStore();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");
  

    if (username) {
      setGithubUsername(username);
    }
    if (token) {
      login(token);
      navigate("/dashboard"); // Redirect to a secure page
      return;
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
