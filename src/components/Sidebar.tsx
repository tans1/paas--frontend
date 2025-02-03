import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-blue-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8">PaaS Dashboard</h2>
      <ul>
        <li className="mb-4">
          <a href="#" className="text-gray-300 hover:text-white flex items-center">
            <i className="fas fa-home mr-2"></i> Home
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="text-gray-300 hover:text-white flex items-center">
            <i className="fas fa-server mr-2"></i> Deployments
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="text-gray-300 hover:text-white flex items-center">
            <i className="fas fa-credit-card mr-2"></i> Billing
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="text-gray-300 hover:text-white flex items-center">
            <i className="fas fa-cog mr-2"></i> Settings
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white flex items-center">
            <i className="fas fa-question-circle mr-2"></i> Support
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;