import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDashboardStore } from "../store/dashboardStore";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loadinganimation.json";
import { useUserStore } from "@/store/userStore";

export default function IntegrationSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchRepositories } = useDashboardStore();
  const { fetchUserProfile} = useUserStore()

  useEffect(() => {
    const provider = searchParams.get("provider");

    if (provider === "github") {
      // Fetch repositories after successful GitHub integration
      fetchRepositories()
        .then(() => {
          // Redirect to dashboard after successful fetch
          fetchUserProfile()
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
          navigate("/dashboard");
        });
    } else {
      // If no provider or unknown provider, redirect to dashboard
      navigate("/dashboard");
    }
  }, [searchParams, navigate, fetchRepositories]);

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-[10%] h-full m-auto flex flex-col justify-center">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
