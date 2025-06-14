import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/molecules/sidebar";
import Navbar from "@/components/molecules/navbar";
import TextInput from "../components/atoms/textInput";
import { usePasswordChangeForm } from "../hooks/usePasswordChangeForm";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

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
      // Reset form state
      handleChange("currentPassword", "");
      handleChange("newPassword", "");
      handleChange("confirmPassword", "");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update password");
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 space-y-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-2">General Settings</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your current Primary email address is{" "}
              <span className="text-blue-600">dashprops@example.com</span>
            </p>

            <h2 className="text-2xl font-bold mb-6">Change your password</h2>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <TextInput
                label="Current password"
                type={showPassword.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
                error={errors.currentPassword}
                placeholder="********"
                togglePasswordVisibility={() =>
                  togglePasswordVisibility("current")
                }
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
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                error={errors.confirmPassword}
                placeholder="********"
                togglePasswordVisibility={() =>
                  togglePasswordVisibility("confirm")
                }
                name="confirmPassword"
              />

              <div className="text-sm text-gray-500 mt-2 space-y-1">
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
                className={`mt-4 w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {successMessage && (
              <p className="text-green-600 mt-4 text-center">
                {successMessage}
              </p>
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
