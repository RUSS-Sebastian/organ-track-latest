import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api/axios";
import { useUser } from "../context/UserContext";
const Settings = () => {
  const { setToken } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    if (path === "logout") {
      // Handle logout logic here
      setIsModalOpen(true);
    } else if (path === "edit-profile") {
      navigate("/EditProfile");
    } else if (path === "terms") {
      navigate("/Terms");
    } else {
      console.log(`Navigating to: ${path}`);
    }
  };

  const handleLogout = async () => {
    setLoading(true); // disable buttons
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token to backend
          },
        },
      );

      localStorage.removeItem("token"); // remove token
      alert("Logged out successfully");
      setToken(null); // <-- tell provider to clear user
      navigate("/login"); // redirect
    } catch (error) {
      console.error("Logout failed:", error);

      // Extract message from backend
      let msg = "Logout failed. Please try again.";
      if (error.response) {
        // Laravel usually returns error.response.data.message
        msg = error.response.data?.message || msg;
      } else if (error.message) {
        msg = error.message;
      }

      alert(msg); // show exact error message
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">Settings</h1>
      </div>

      <div className="flex flex-col gap-5">
        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm p-2">
          <h2 className="px-3 pb-2 text-xs font-semibold text-green-600 uppercase">
            Account
          </h2>

          {[
            ["fa-user", "Edit profile", "edit-profile"],
            ["fa-lock", "Security", "security"],
            ["fa-bell", "Notifications", "notifications"],
            ["fa-shield-halved", "Privacy", "privacy"],
          ].map(([icon, label, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-green-50 cursor-pointer transition"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium">
                <i className={`fa-solid ${icon} text-green-500`}></i>
                {label}
              </span>
              <span className="text-green-400 text-lg">›</span>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow-sm p-2">
          <h2 className="px-3 pb-2 text-xs font-semibold text-green-600 uppercase">
            Support & About
          </h2>

          {[
            ["fa-circle-question", "Help & Support", "help"],
            ["fa-file-lines", "Terms and Policies", "terms"],
          ].map(([icon, label, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-green-50 cursor-pointer transition"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium">
                <i className={`fa-solid ${icon} text-green-500`}></i>
                {label}
              </span>
              <span className="text-green-400 text-lg">›</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-2">
          <h2 className="px-3 pb-2 text-xs font-semibold text-green-600 uppercase">
            Actions
          </h2>

          <div
            onClick={() => handleNavigation("report")}
            className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-green-50 cursor-pointer transition"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium">
              <i className="fa-solid fa-bug text-green-500"></i>
              Report a problem
            </span>
            <span className="text-green-400 text-lg">›</span>
          </div>

          <div
            onClick={() => handleNavigation("add-account")}
            className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-green-50 cursor-pointer transition"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium">
              <i className="fa-solid fa-user-plus text-green-500"></i>
              Add account
            </span>
            <span className="text-green-400 text-lg">›</span>
          </div>

          <div
            onClick={() => handleNavigation("logout")}
            className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-red-50 cursor-pointer transition"
          >
            <span className="flex items-center gap-3 text-red-500 font-medium">
              <i className="fa-solid fa-right-from-bracket"></i>
              Log out
            </span>
            <span className="text-red-400 text-lg">›</span>
          </div>

          <ConfirmModal
            isOpen={isModalOpen}
            title="Confirm Logout"
            message="Are you sure you want to log out?"
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleLogout}
            loading={loading} // pass loading state to modal
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
