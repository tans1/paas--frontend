import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/textInput";
import axios from "axios";
import Header from "@/components/molecules/header";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      const nameRegex = /^[A-Za-z]{2,}$/;
      if (!nameRegex.test(value)) {
        error =
          "Name must be at least 2 characters long and contain only letters.";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol.";
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    setRegisterError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_URL}/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error: any) {
      setRegisterError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToSignIn = () => {
    navigate("/login");
  };

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.password &&
    formData.name &&
    formData.email &&
    formData.password &&
    termsChecked;

  return (
    <div className="min-h-screen bg-gray-50" data-testid="register-page">
      <Header />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="register-header">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join us and start deploying your applications
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit} data-testid="register-form">
              <TextInput
                label="Full name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Doe"
                data-testid="name-input"
              />
              <TextInput
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="name@mail.com"
                data-testid="email-input"
              />
              <TextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="********"
                togglePasswordVisibility={() =>
                  setShowPassword((prev) => !prev)
                }
                data-testid="password-input"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsChecked}
                  onChange={handleTermsChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  data-testid="terms-checkbox"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className={`w-full text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ${isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
                disabled={!isFormValid || isLoading}
                data-testid="submit-button"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={`${import.meta.env.VITE_BACK_END_URL}/oauth/google`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  data-testid="oauth-google"
                >
                  <img
                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Google
                </a>

                <a
                  href={`${import.meta.env.VITE_BACK_END_URL}/oauth/github`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  data-testid="oauth-github"
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                    alt="GitHub"
                    className="w-5 h-5 mr-2"
                  />
                  GitHub
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleRedirectToSignIn}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                data-testid="redirect-login"
              >
                Sign in
              </button>
            </p>

            {registerError && (
              <p
                className="mt-4 text-sm text-red-600 text-center"
                data-testid="error-message"
              >
                {registerError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
