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

  // --- Language modal state ---
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en"); // default language

  const handleNavigation = (path) => {
    if (path === "logout") {
      setIsModalOpen(true);
    } else if (path === "edit-profile") {
      navigate("/EditProfile");
    } else if (path === "terms") {
      navigate("/Terms");
    } else if (path === "language") {
      setIsLangModalOpen(true); // open language popup
    } else {
      console.log(`Navigating to: ${path}`);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      localStorage.removeItem("token");
      alert("Logged out successfully");
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      let msg = "Logout failed. Please try again.";
      if (error.response) {
        msg = error.response.data?.message || msg;
      } else if (error.message) {
        msg = error.message;
      }
      alert(msg);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
          Settings
        </h1>
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Account */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2 className="px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
            Account
          </h2>

          {[
            ["fa-user", "Edit profile", "edit-profile"],
            ["fa-lock", "Security", "security"],
            ["fa-bell", "Notifications", "notifications"],
            ["fa-shield-halved", "Privacy", "privacy"],
            ["fa-globe", "Language", "language"],
          ].map(([icon, label, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
                <i
                  className={`fa-solid ${icon} text-green-500 text-lg sm:text-xl`}
                ></i>
                {label}
              </span>
              <span className="text-green-400 text-lg sm:text-xl font-light">
                ›
              </span>
            </div>
          ))}
        </div>

        {/* Support & About */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2 className="px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
            Support & About
          </h2>

          {[
            ["fa-circle-question", "Help & Support", "help"],
            ["fa-file-lines", "Terms and Policies", "terms"],
          ].map(([icon, label, route]) => (
            <div
              key={route}
              onClick={() => handleNavigation(route)}
              className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
                <i
                  className={`fa-solid ${icon} text-green-500 text-lg sm:text-xl`}
                ></i>
                {label}
              </span>
              <span className="text-green-400 text-lg sm:text-xl font-light">
                ›
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
          <h2 className="px-3 pb-2 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
            Actions
          </h2>

          <div
            onClick={() => handleNavigation("report")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-bug text-green-500 text-lg sm:text-xl"></i>
              Report a problem
            </span>
            <span className="text-green-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          <div
            onClick={() => handleNavigation("add-account")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-green-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-gray-700 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-user-plus text-green-500 text-lg sm:text-xl"></i>
              Add account
            </span>
            <span className="text-green-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          <div
            onClick={() => handleNavigation("logout")}
            className="flex items-center justify-between px-3 py-3 sm:py-3.5 rounded-xl hover:bg-red-50 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-3 text-red-500 font-medium text-sm sm:text-base">
              <i className="fa-solid fa-right-from-bracket text-lg sm:text-xl"></i>
              Log out
            </span>
            <span className="text-red-400 text-lg sm:text-xl font-light">
              ›
            </span>
          </div>

          <ConfirmModal
            isOpen={isModalOpen}
            title="Confirm Logout"
            message="Are you sure you want to log out?"
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleLogout}
            loading={loading}
          />
        </div>
      </div>

      {/* Language Selection Popup */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs sm:max-w-sm p-5 sm:p-6 mx-auto">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-5 text-center">
              Select Language
            </h3>

            {/* Language options */}
            <div className="flex flex-col gap-3 mb-6">
              {/* English */}
              <label
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === "en"
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={selectedLang === "en"}
                  onChange={() => setSelectedLang("en")}
                  className="sr-only"
                />
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center flex-shrink-0">
                  {selectedLang === "en" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  )}
                </span>
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  English
                </span>
              </label>

              {/* Burmese */}
              <label
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLang === "mm"
                    ? "border-green-500 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="language"
                  value="mm"
                  checked={selectedLang === "mm"}
                  onChange={() => setSelectedLang("mm")}
                  className="sr-only"
                />
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center flex-shrink-0">
                  {selectedLang === "mm" && (
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  )}
                </span>
                <span className="text-gray-800 font-medium text-sm sm:text-base">
                  Burmese
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setIsLangModalOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("language", selectedLang);
                  // Optionally update context/state if your app uses one
                  setIsLangModalOpen(false);
                  // You can add a success toast/alert here if needed
                }}
                className="px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
