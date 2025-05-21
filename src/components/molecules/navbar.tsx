import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useEffect } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    initializeSSE,
    closeSSE,
  } = useNotificationStore();

  useEffect(() => {
    if (user?.id) {
      // Initialize SSE connection
      initializeSSE();
      // Fetch initial notifications
      fetchNotifications();

      return () => {
        // Cleanup SSE connection
        closeSSE();
      };
    }
  }, [user?.id, initializeSSE, fetchNotifications, closeSSE]);

  const handleLogout = () => {
    closeSSE();
    logout();
    navigate("/");
  };

  const handleMarkAsRead = async (id: number) => {
    await markAsRead(id);
  };

  const handleDeleteNotification = async (id: number) => {
    await deleteNotification(id);
  };

  return (
    <nav className="bg-white shadow-sm font-sans sticky top-0 z-10 w-full">
      <div className="py-3 px-10 flex justify-between items-end">
        <Link
          to="/"
          className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
        >
          <i className="fas fa-home mr-2"></i>
          Home
        </Link>
        <div className="flex items-end gap-6">
          {user && (
            <>
              <div className="relative cursor-pointer">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <i className="fa-solid fa-bell text-xl text-gray-600"></i>
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 mr-10 max-h-[400px] overflow-y-auto">
                    <DropdownMenuLabel className="flex justify-between items-center px-4 py-3">
                      <span className="font-semibold text-gray-900">
                        Notifications
                      </span>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => markAllAsRead()}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <i className="fa-regular fa-bell text-2xl mb-2"></i>
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className={`p-0 ${
                            !notification.isRead ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex flex-col w-full p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-800 break-words">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {format(
                                    new Date(notification.createdAt),
                                    "MMM d, h:mm a"
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                {!notification.isRead && (
                                  <button
                                    onClick={() =>
                                      handleMarkAsRead(notification.id)
                                    }
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    handleDeleteNotification(notification.id)
                                  }
                                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
                    <img
                      src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                      alt="user-image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-5">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
