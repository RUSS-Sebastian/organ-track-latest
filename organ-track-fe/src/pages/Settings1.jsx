import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      navigate("/login");
    } else if (path === "edit-profile") {
      navigate("/EditProfile");
    } else if (path === "terms") {
      navigate("/Terms");
    } else {
      console.log(`Navigating to: ${path}`);
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
