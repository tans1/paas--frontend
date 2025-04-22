import React from "react";
import { useDashboardStore } from "../store/dashboardStore";
const Sidebar: React.FC = () => {
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);
  return (
    <div className="w-72 bg-sidebarBgColor p-5 h-screen fixed top-0 left-0 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-8">PaaS</h2>
      <ul className="flex flex-col gap-7">
        <li>
          <a
            href="/dashboard"
            className="text-gray-300 hover:text-white flex items-start gap-2">
            <i className="fa-solid fa-house"></i> Dashboard
          </a>
        </li>
        <li>
          <p className="mb-3 text-gray-300 font-semibold">Layouts & Pages</p>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-white flex items-center gap-2">
                <i className="fa-solid fa-gear"></i> Settings
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-white flex items-center gap-2">
                <i className="fa-solid fa-wallet"></i> Billings
              </a>
            </li>

            <li>
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-white flex items-center gap-2">
                <i className="fa-solid fa-wallet"></i> Layouts
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
