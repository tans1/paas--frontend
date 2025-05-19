import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const reason = searchParams.get("reason");
    // You might want to show the error message to the user
    console.error("Login failed:", reason);

    // Redirect to login page after a short delay
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="text-red-600 text-2xl mb-4">
        <i className="fa-solid fa-circle-exclamation mr-2"></i>
        Login Failed
      </div>
      <p className="text-gray-600 mb-4">
        There was an error during login. Please try again.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Return to Login
      </button>
    </div>
  );
}
