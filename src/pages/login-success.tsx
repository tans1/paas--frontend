import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

// TODO: Handle token expiration
// TODO: Update file name
const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setGithubUsername } = useUserStore();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");
    // const localStorageToken = localStorage.getItem('authToken');

    console.log("the token is", token);
    console.log("the username is", username);

    if (username) {
      setGithubUsername(username);
    }
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/dashboard"); // Redirect to a secure page
      return;
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default LoginSuccess;
