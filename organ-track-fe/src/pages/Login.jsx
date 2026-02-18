import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    navigate("/home"); // temporary routing
  };

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10">

       

        {/* Form Container */}
        <div className="bg-white rounded-3xl px-6 py-8 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            Welcome <span className="text-green-600">Back!</span>
          </h1>
          <p className="text-center text-gray-500 mb-6">Nice to see you again</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-green-500"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold mt-4 hover:bg-green-700 transition mx-auto"
            >
              Sign In
            </button>

          </form>

          {/* Bottom Link */}
          <div className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-600 font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
