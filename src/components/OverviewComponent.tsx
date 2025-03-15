import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Sidebar from './Sidebar';
import Card from './Card';

const Overview: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, User</h1>
            <p className="text-gray-600">Your Platform as a Service dashboard</p>
          </div>
        </div>

        <div className="flex justify-around p-3">
          <Card title="Deployment Status">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-green-600">Deployed Successfully</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">Your latest deployment was successful! Last updated 5 minutes ago.</p>
          </Card>

          <Card title="Payment Overview">
            <p className="text-gray-600">Your current plan: <span className="font-semibold">Premium</span></p>
            <p className="text-sm text-gray-600 mt-2">Next payment due in 10 days. Total: <span className="font-semibold">ETB 500</span></p>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">Add Funds</button>
          </Card>
        </div>

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

export default Overview;