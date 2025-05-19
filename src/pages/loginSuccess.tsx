import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useUserStore();

  useEffect(() => {
    const token = searchParams.get("token");
    // const username = searchParams.get("username");

    if (token) {
      // Login will handle setting the token and user state
      login(token)
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="text-center">
        <div className="text-green-600 text-2xl mb-4">
          <i className="fa-solid fa-circle-check mr-2"></i>
          Login Successful
        </div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
