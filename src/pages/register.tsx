import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/atoms/textInput";
import axios from "axios";

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

  // Field validation logic
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

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  // Handle form submission
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

    try {
      console.log("formdata", formData);
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
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleRedirectToSignIn = () => {
    navigate("/login");
  };

  // Computed validation state for button
  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.password &&
    formData.name &&
    formData.email &&
    formData.password &&
    termsChecked;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Join Us Today</h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and password to register.
        </p>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <TextInput
            label="Your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your name"
          />
          <TextInput
            label="Your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="name@mail.com"
          />
          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="********"
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsChecked}
              onChange={handleTermsChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
              isFormValid
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}>
            Register Now
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6">
          {/* Google Login */}
          <a
            href={`${import.meta.env.VITE_BACK_END_URL}/oauth/google`}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300">
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              className="mr-2"
            />
            Sign in with Google
          </a>

          {/* GitHub Login */}
          <a
            href={`${import.meta.env.VITE_BACK_END_URL}/oauth/github`}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mt-2 hover:bg-gray-100 transition duration-300">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
              alt="GitHub"
              className="mr-2"
            />
            Sign in with GitHub
          </a>
        </div>

        {/* Redirect to Sign In */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={handleRedirectToSignIn}
            className="text-indigo-600 hover:underline cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
