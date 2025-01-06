import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
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

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, User</h1>
            <p className="text-gray-600">Your Platform as a Service dashboard</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Logout</button>
        </div>

        {/* Deployment Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Deployment Status Card */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Deployment Status</h3>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-green-600">Deployed Successfully</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">Your latest deployment was successful! Last updated 5 minutes ago.</p>
          </div>

          {/* Resource Usage Card */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Resource Usage</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 h-2 rounded-lg">
                <div className="bg-blue-600 h-2 w-3/4 rounded-lg"></div>
              </div>
              <span className="text-gray-600 ml-2">75% CPU Usage</span>
            </div>
            <div className="mt-4 text-sm text-gray-600">You are using 75% of your allocated CPU resources.</div>
          </div>

          {/* Payment Overview Card */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Overview</h3>
            <p className="text-gray-600">Your current plan: <span className="font-semibold">Premium</span></p>
            <p className="text-sm text-gray-600 mt-2">Next payment due in 10 days. Total: <span className="font-semibold">ETB 500</span></p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">Add Funds</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="text-gray-600">
              <span className="font-semibold text-gray-800">Deployment #1</span> - Successfully deployed on 1 Jan 2025
            </li>
            <li className="text-gray-600">
              <span className="font-semibold text-gray-800">Scaling Action</span> - Scaled app to 2 replicas on 29 Dec 2024
            </li>
            <li className="text-gray-600">
              <span className="font-semibold text-gray-800">Payment</span> - Payment of ETB 100 completed on 20 Dec 2024
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;