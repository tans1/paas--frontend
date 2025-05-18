import { useState } from "react";
import axios from "axios";
import { validatePassword } from "../utils/passwordValidator";

export const usePasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);

    let error = "";
    if (name === "newPassword" || name === "currentPassword") {
      error = validatePassword(value);
    } else if (name === "confirmPassword") {
      if (value !== newPassword) error = "Passwords do not match.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const currentError = validatePassword(currentPassword);
    const newError = validatePassword(newPassword);
    const confirmError =
      newPassword !== confirmPassword ? "Passwords do not match." : "";

    setErrors({
      currentPassword: currentError,
      newPassword: newError,
      confirmPassword: confirmError,
    });

    if (currentError || newError || confirmError) return;

    setIsLoading(true);
    try {
      const response = await axios.patch(
        "https://api.example.com/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Password change failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const isFormValid =
    !errors.currentPassword &&
    !errors.newPassword &&
    !errors.confirmPassword &&
    currentPassword &&
    newPassword &&
    confirmPassword;

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    showPassword,
    errors,
    successMessage,
    errorMessage,
    isLoading,
    handleChange,
    handlePasswordChange,
    togglePasswordVisibility,
    isFormValid,
  };
};
