import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import systemLogo from "../assets/images/systemLogo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // to show exact backend error

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (location.state && typeof location.state.termsAccepted === "boolean") {
      setFormData((prev) => ({
        ...prev,
        ...location.state,
        agree: location.state.termsAccepted,
      }));
    }
  }, [location.state?.termsAccepted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    // Required
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.agree) newErrors.agree = "You must agree to terms";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special char";
    }

    // Match check
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setApiError(""); // clear previous API error

    console.log("=== Debug: Form Data ===");
    console.log(formData);

    // Check password match before sending
    if (formData.password !== formData.confirmPassword) {
      console.warn("Passwords do not match!");
    } else {
      console.log("Passwords match ✔");
    }

    if (Object.keys(validationErrors).length === 0) {
      // Prepare payload for backend
      const payload = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        gender: formData.gender,
      };

      console.log("=== Debug: Payload to backend ===");
      console.log(payload);

      // Set loading state
      setIsSubmitting(true);

      // Call Laravel API
      api
        .post("/register", payload)
        .then((res) => {
          console.log("=== Debug: Backend Response ===");
          console.log(res.data);

          // Show success alert
          alert("Registration successful! Please login.");
          window.location.href = "/login"; // or navigate("/login") if using React Router
        })
        .catch((err) => {
          console.log("=== Debug: API Error Response ===");
          console.error(err.response?.data || err.message);

          // Show exact backend message if available
          if (err.response?.data?.message) {
            setApiError(err.response.data.message);
          } else if (err.response?.data?.errors) {
            // Laravel field validation errors
            setErrors(err.response.data.errors);
            setApiError("Please check the highlighted fields.");
          } else {
            setApiError("Something went wrong. Try again.");
          }

          // Clear form
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            agree: false,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      console.log("=== Debug: Validation Errors ===");
      console.warn(validationErrors);
    }
  };

  return (
    <div className="min-h-[874px] w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10">
        <div className="w-full flex flex-col items-center mb-6">
          <div className="w-50 h-50 bg-white-200 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={systemLogo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-green-500 rounded-3xl px-6 py-8 shadow-md">
          <h1 className="text-white text-3xl font-bold text-center mb-6">
            Hello!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-xl outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-200 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-xl outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-200 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white pl-12 pr-10 py-3 rounded-xl outline-none"
              />
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter your password again"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white pl-12 pr-10 py-3 rounded-xl outline-none"
              />
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-200 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

            {/* Gender */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-venus-mars absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-xl outline-none appearance-none"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-200 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm text-white">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <span>
                I agree to the{" "}
                <button
                  type="button"
                  className="underline font-semibold"
                  onClick={() =>
                    navigate("/terms", {
                      state: { from: "register", formData: formData },
                    })
                  }
                >
                  terms and conditions
                </button>
              </span>
            </div>
            {errors.agree && (
              <p className="text-red-200 text-sm">{errors.agree}</p>
            )}

            {apiError && (
              <p className="text-red-200 text-sm text-center mb-2">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold mt-4 text-white 
    bg-green-700 
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-800 active:scale-95 transition-all duration-150"}
  `}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-6 text-center text-sm" style={{ color: "#fff" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
