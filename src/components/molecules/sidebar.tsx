// import { useDashboardStore } from "../store/dashboardStore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Settings, Landmark, Rows3, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppSidebar: React.FC = () => {
  // const setActiveTab = useDashboardStore((state) => state.setActiveTab);
  const navigate = useNavigate();
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "All Projects",
      url: "/dashboard/projects",
      icon: Rows3,
    },
    {
      title: "Add Project",
      url: "/dashboard/project/add",
      icon: FilePlus,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Billings",
      url: "#",
      icon: Landmark,
    },
  ];

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-sidebar-bg-color">
        <SidebarHeader className="text-3xl font-extrabold text-white pl-8">
          PaaS
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="text-white">
            <SidebarMenu className="gap-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-sidebar-hover hover:text-white hover:cursor-pointer">
                    <p onClick={() => handleNavigation(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
