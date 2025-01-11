import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "../components/TextInput"; // Adjust the path as needed

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(""); // For backend login errors
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Field validation function
  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    } else if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol.";
      }
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // If no validation errors, proceed to login
    setIsLoading(true);
    setLoginError(""); // Clear any previous error

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        // Assuming the backend returns a token or user info
        localStorage.setItem("token", response.data.token);

        // Redirect to the Home page or protected route
        navigate("/");
      }
    } catch (error: any) {
      setLoginError(error.response?.data?.message || "Login failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Button enabled/disabled logic
  const isFormValid = !errors.email && !errors.password && formData.email && formData.password;

  // Redirect to Register page
  const handleRedirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Sign In</h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and password to sign in.
        </p>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <TextInput
            label="Your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@mail.com"
            name="email"
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
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${isFormValid ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Newsletter & Forgot Password */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                Subscribe me to newsletter
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6">
          {/* Google Login */}
          <a
            href="http://localhost:3000/oauth/google"
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300"
          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign in with Google
          </a>

          {/* GitHub Login */}
          <a
            href="http://localhost:3000/oauth/github"
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mt-2 hover:bg-gray-100 transition duration-300"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
              alt="GitHub"
              className="mr-2"
            />
            Sign in with GitHub
          </a>
        </div>

        {/* Create Account Link */}
        <p className="mt-6 text-center text-gray-600">
          Not registered?{" "}
          <span
            onClick={handleRedirectToRegister}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Create account
          </span>
        </p>

        {/* Show error message */}
        {loginError && <p className="text-red-500 text-center mt-4">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;