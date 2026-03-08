import { NavLink } from "react-router-dom";
import { Home, FileText, CheckCircle, Activity, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/report", label: "Report", icon: FileText },
    { to: "/checkin", label: "Check-in", icon: CheckCircle },
    { to: "/track", label: "Track-Syms", icon: Activity },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.to}
              className="flex-1 flex flex-col items-center justify-center h-full relative"
            >
              {() => {
                const path = location.pathname;
                const organId = path.split("/")[2]; // Heart or daily

                let isActive = false;

                // TRACK ACTIVE
                if (item.to === "/track") {
                  isActive =
                    path.startsWith("/track") ||
                    (path.startsWith("/questions") && organId !== "daily") ||
                    (path.startsWith("/thanks") && organId !== "daily");
                }

                // CHECK-IN ACTIVE
                else if (item.to === "/checkin") {
                  isActive =
                    path.startsWith("/checkin") ||
                    (path.startsWith("/questions") && organId === "daily") ||
                    (path.startsWith("/thanks") && organId !== "syms");
                } else if (item.to === "/settings") {
                  isActive =
                    path.startsWith("/settings") ||
                    path.startsWith("/EditProfile");
                } else if (item.to === "/report") {
                  isActive =
                    path.startsWith("/report") ||
                    path.startsWith("/reportinput") ||
                    path.startsWith("/report-details");
                } else if (item.to === "/") {
                  isActive = path.startsWith("/each-organ") || path === "/";
                }

                // OTHER ROUTES
                else {
                  isActive = path === item.to;
                }

                return (
                  <>
                    {isActive && (
                      <div className="absolute top-0 w-full h-[3px] bg-[#539DF3]" />
                    )}

                    <Icon
                      size={20}
                      className={isActive ? "text-[#539DF3]" : "text-gray-700"}
                    />

                    <span
                      className={`text-xs mt-1 ${
                        isActive ? "text-[#539DF3]" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
