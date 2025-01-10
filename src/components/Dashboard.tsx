import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Sidebar from './Sidebar';
import Card from './Card';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

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
          <Card title="Deployment Status">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-green-600">Deployed Successfully</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">Your latest deployment was successful! Last updated 5 minutes ago.</p>
          </Card>

          {/* Resource Usage Card */}
          <Card title="Resource Usage">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 h-2 rounded-lg">
                <div className="bg-blue-600 h-2 w-3/4 rounded-lg"></div>
              </div>
              <span className="text-gray-600 ml-2">75% CPU Usage</span>
            </div>
            <div className="mt-4 text-sm text-gray-600">You are using 75% of your allocated CPU resources.</div>
          </Card>

          {/* Payment Overview Card */}
          <Card title="Payment Overview">
            <p className="text-gray-600">Your current plan: <span className="font-semibold">Premium</span></p>
            <p className="text-sm text-gray-600 mt-2">Next payment due in 10 days. Total: <span className="font-semibold">ETB 500</span></p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">Add Funds</button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card title="Recent Activity">
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
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;