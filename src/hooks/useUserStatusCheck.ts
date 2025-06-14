import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

export const useUserStatusCheck = (intervalMs: number = 30000) => {
  const { refreshUserStatus, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Initial check
    refreshUserStatus();

    // Set up periodic checks
    const intervalId = setInterval(() => {
      refreshUserStatus();
    }, intervalMs);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated, refreshUserStatus, intervalMs]);
};
