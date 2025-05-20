import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/textInput";
import LoginRequest from "../api/auth";
import { useUserStore } from "@/store/userStore";

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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol.";
      }
    }
    return error;
  }

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
      const response = await LoginRequest(formData)

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100" data-testid="login-container" >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" data-testid="login-card">
        <h2 className="text-3xl font-bold text-center mb-4" data-testid="login-title">Sign In</h2>
        <p className="text-center text-gray-600 mb-8" data-testid="login-subtitle">
          Enter your email and password to sign in.
        </p>

        <form className="space-y-6" onSubmit={handleFormSubmit} data-testid="login-form">
          <TextInput
            label="Your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@mail.com"
            name="email"
            data-testid="login-email"
          />

          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="********"
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            name="password"
            data-testid="login-password"
          />

          <button
            type="submit"
            className={`w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${isFormValid
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!isFormValid || isLoading}
            data-testid="login-submit-button">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                data-testid="login-newsletter-checkbox"
              />
              <label
                htmlFor="newsletter"
                className="ml-2 text-sm text-gray-700"
                data-testid="login-newsletter-label">
                Subscribe me to newsletter
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline" data-testid="login-forgot-password">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="mt-6" data-testid="login-social">
          <a
            href={`${import.meta.env.VITE_BACK_END_URL}/oauth/google`}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300" data-testid="login-google">
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign in with Google
          </a>

          <a
            href={`${import.meta.env.VITE_BACK_END_URL}/oauth/github`}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mt-2 hover:bg-gray-100 transition duration-300" data-testid="login-github">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
              alt="GitHub"
              className="mr-2"
            />
            Sign in with GitHub
          </a>
        </div>

        <p className="mt-6 text-center text-gray-600" data-testid="login-register-prompt">
          Not registered?{" "}
          <span
            onClick={handleRedirectToRegister}
            className="text-indigo-600 hover:underline cursor-pointer" data-testid="login-register-link">
            Create account
          </span>
        </p>

        {loginError && (
          <p className="text-red-500 text-center mt-4" data-testid="login-error-message">{loginError}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
