import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/textInput";
import LoginRequest from "../api/auth";
import { useUserStore } from "@/store/userStore";
import Header from "@/components/molecules/header";

const Login = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email") {
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await LoginRequest(formData);
      if (response.status === 200) {
        login(response.data.access_token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      setLoginError(
        error.response?.data?.message || "Login failed, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    !errors.email && !errors.password && formData.email && formData.password;

  const handleRedirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900" data-testid="login-heading">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <TextInput
                label="Email address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="name@mail.com"
                name="email"
                data-testid="email-input"
              />

              <TextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="********"
                togglePasswordVisibility={() =>
                  setShowPassword((prev) => !prev)
                }
                name="password"
                data-testid="password-input"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    data-testid="checkbox-remember"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </a>
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
                {isLoading ? "Signing in..." : "Sign in"}
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
              Don't have an account?{" "}
              <button
                onClick={handleRedirectToRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                data-testid="link-register"
              >
                Sign up
              </button>
            </p>

            {loginError && (
              <p
                className="mt-4 text-sm text-red-600 text-center"
                data-testid="login-error"
              >
                {loginError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
