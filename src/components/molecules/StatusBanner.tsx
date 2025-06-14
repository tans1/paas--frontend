import { useUserStore } from "../../store/userStore";

const StatusBanner = () => {
  const { user } = useUserStore();

  if (!user || user.status === "ACTIVE") {
    return null;
  }

  const getStatusMessage = () => {
    switch (user.status) {
      case "SUSPENDED":
        return "Your account has been suspended. You can view your projects but cannot perform actions like starting, stopping, or deploying projects.";
      case "DELETED":
        return "Your account has been deleted. You can only view your projects.";
      default:
        return "Your account is not active. Some features may be limited.";
    }
  };

  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-yellow-100">
              <i className="fas fa-exclamation-triangle text-yellow-600"></i>
            </span>
            <p className="ml-3 font-medium text-yellow-800 truncate">
              {getStatusMessage()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;
