import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/molecules/sidebar";
import Navbar from "@/components/molecules/navbar";
import TextInput from "../components/atoms/textInput";
import { usePasswordChangeForm } from "../hooks/usePasswordChangeForm";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";

const Settings = () => {
  const { updatePassword, user } = useUserStore();
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    showPassword,
    errors,
    successMessage,
    errorMessage,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    isFormValid,
  } = usePasswordChangeForm();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("User ID not found");
      return;
    }
    try {
      await updatePassword({
        currentPassword,
        newPassword,
        id: user.id,
      });
      toast.success("Password updated successfully");
      handleChange("currentPassword", "");
      handleChange("newPassword", "");
      handleChange("confirmPassword", "");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update password");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto p-6 space-y-10">
          {/* General Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold">General Settings</h2>
            </div>
            <p className="text-sm text-gray-500">
              Your current Primary email address is{" "}
              <span className="text-blue-600 font-medium">
                dashprops@example.com
              </span>
            </p>
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-blue-600 w-5 h-5" />
              <h2 className="text-xl font-semibold">Change Your Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <TextInput
                label="Current password"
                type={showPassword.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                error={errors.currentPassword}
                placeholder="********"
                togglePasswordVisibility={() => togglePasswordVisibility("current")}
                name="currentPassword"
              />

              <TextInput
                label="New password"
                type={showPassword.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                error={errors.newPassword}
                placeholder="********"
                togglePasswordVisibility={() => togglePasswordVisibility("new")}
                name="newPassword"
              />

              <TextInput
                label="Confirm new password"
                type={showPassword.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                placeholder="********"
                togglePasswordVisibility={() => togglePasswordVisibility("confirm")}
                name="confirmPassword"
              />

              <div className="text-sm text-gray-500 mt-4 space-y-1 border-t border-gray-100 pt-4">
                <p className="font-semibold">Password requirements:</p>
                <ul className="list-disc list-inside">
                  <li>Minimum 8 characters long</li>
                  <li>At least one lowercase character</li>
                  <li>At least one uppercase character</li>
                  <li>At least one number</li>
                  <li>At least one symbol</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`mt-6 w-full text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {successMessage && (
              <p className="text-green-600 mt-4 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Settings;
