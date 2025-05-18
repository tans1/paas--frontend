import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/molecules/sidebar"
import Navbar from "@/components/molecules/navbar";
import { useState } from "react";


const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Handle password update logic here
    console.log("Password changed successfully");
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {/* <SidebarTrigger /> */}
        <div>
          <Navbar />
          <div className="max-w-4xl mx-auto p-6 space-y-10">
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-2">General Settings</h2>
              <p className="text-sm text-gray-500 mb-6">
                Your current Primary email address is{" "}
                <span className="text-blue-600">dashprops@example.com</span>
              </p>

              {/* Change Password */}

              <h2 className="text-2xl font-bold mb-6">Change your password</h2>
              <p className="text-sm text-gray-500 mb-6">
                Your current Primary email address is{" "}
                <span className="text-blue-600">dashprops@example.com</span>
              </p>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label htmlFor="current" className="block mb-2 font-semibold">Current password</label>
                  <input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 font-semibold">New password</label>
                  <input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm" className="block mb-2 font-semibold">Confirm new password</label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Password Requirements */}
                <div className="text-sm text-gray-500 mt-2 space-y-1">
                  <p className="font-semibold">Password requirements:</p>
                  <ul className="list-disc list-inside">
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>At least one number, symbol, or whitespace character</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </SidebarProvider>
  );
}

export default Settings