import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

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

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitted Data:", formData);
    }
  };

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10">

        <div className="w-full flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">Big Logo</span>
          </div>
          <h2 className="text-2xl font-semibold text-green-600 mt-4">
            Organ Track
          </h2>
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

            {/* Password */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-xl outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-200 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white pl-12 pr-4 py-3 rounded-xl outline-none"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-200 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

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
              <span>I agree to the terms and conditions</span>
            </div>
            {errors.agree && (
              <p className="text-red-200 text-sm">{errors.agree}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold mt-4"
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
