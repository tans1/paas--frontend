import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useDashboardStore } from "../store/dashboardStore";
import { Shield, Activity, Users, Server } from "lucide-react";

const AdminDashboard = () => {
  const { user, users } = useUserStore();
  const { fetchAllProjects, projects } = useDashboardStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/dashboard");
    }
    const fetchData = async () => {
      try {
        await fetchAllProjects();
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, navigate, fetchAllProjects]);

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const runningProjects = projects.filter(
    (project) => project.status === "RUNNING"
  );
  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const adminFeatures = [
    {
      title: "Traefik Dashboard",
      description: "Monitor and manage your reverse proxy and load balancer",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      link: `${import.meta.env.VITE_TRAEFIK_URL}`,
      color: "from-blue-500 to-blue-600",
      isExternal: true,
    },
    {
      title: "cAdvisor Dashboard",
      description: "Monitor container metrics and performance",
      icon: <Activity className="w-8 h-8 text-green-500" />,
      link: `${import.meta.env.VITE_CADVISOR_URL}`,
      color: "from-green-500 to-green-600",
      isExternal: true,
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: <Users className="w-8 h-8 text-purple-500" />,
      link: "/dashboard/admin/users",
      color: "from-purple-500 to-purple-600",
      isExternal: false,
    },
    {
      title: "Server Status",
      description: "Monitor server health and resources",
      icon: <Server className="w-8 h-8 text-red-500" />,
      link: "/dashboard/admin/server-status",
      color: "from-red-500 to-red-600",
      isExternal: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your platform's infrastructure and users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {adminFeatures.map((feature, index) =>
            feature.isExternal ? (
              <a
                key={index}
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      feature.color.split(" ")[1]
                    }, ${feature.color.split(" ")[3]})`,
                  }}
                ></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r bg-opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          feature.color.split(" ")[1]
                        }, ${feature.color.split(" ")[3]})`,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <Link
                key={index}
                to={feature.link}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      feature.color.split(" ")[1]
                    }, ${feature.color.split(" ")[3]})`,
                  }}
                ></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r bg-opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          feature.color.split(" ")[1]
                        }, ${feature.color.split(" ")[3]})`,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-600 mb-1">
                    Active Users
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {activeUsers}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-green-600 mb-1">
                    Running Projects
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    {runningProjects.length}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-100">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-purple-600 mb-1">
                    System Health
                  </div>
                  <div className="text-3xl font-bold text-purple-900">
                    Healthy
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-100">
                  <Server className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
