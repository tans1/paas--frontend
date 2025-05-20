import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function IntegrationFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    // You might want to show the error message to the user
    console.error("Integration failed:", error);

    // Redirect to dashboard after a short delay
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [searchParams, navigate]);

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="text-red-600 text-2xl mb-4">
        <i className="fa-solid fa-circle-exclamation mr-2"></i>
        Integration Failed
      </div>
      <p className="text-gray-600 mb-4">
        There was an error connecting to GitHub. Please try again.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
