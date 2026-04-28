import { NavLink, useLocation } from "react-router-dom";
import { Home, CheckCircle, Activity, Settings } from "lucide-react";

export default function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/checkin", label: "Check-in", icon: CheckCircle },
    { to: "/track", label: "Track-Syms", icon: Activity },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white z-40">
      <div className="w-full flex justify-around items-center h-14 sm:h-16 lg:h-18 px-4 sm:px-6 lg:px-8">
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
                const organId = path.split("/")[2];

                let isActive = false;

                if (item.to === "/track") {
                  isActive =
                    path.startsWith("/track") ||
                    (path.startsWith("/questions") && organId !== "daily") ||
                    (path.startsWith("/thanks") && organId !== "daily");
                } else if (item.to === "/checkin") {
                  isActive =
                    path.startsWith("/checkin") ||
                    (path.startsWith("/questions") && organId === "daily") ||
                    (path.startsWith("/thanks") && organId !== "syms");
                } else if (item.to === "/settings") {
                  isActive =
                    path.startsWith("/settings") ||
                    path.startsWith("/EditProfile");
                } else if (item.to === "/") {
                  isActive = path.startsWith("/each-organ") || path === "/";
                } else {
                  isActive = path === item.to;
                }

                return (
                  <>
                    {isActive && (
                      <div
                        className={`absolute top-0 h-[3px] sm:h-[4px] bg-[#539DF3] ${
                          index === 0
                            ? "-ml-4 sm:-ml-6 lg:-ml-8 w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[calc(100%+2rem)] left-0"
                            : index === navItems.length - 1
                            ? "-mr-4 sm:-mr-6 lg:-mr-8 w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[calc(100%+2rem)] right-0"
                            : "w-full left-0 right-0"
                        }`}
                      />
                    )}

                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${
                        isActive ? "text-[#539DF3]" : "text-gray-700"
                      }`}
                    />

                    <span
                      className={`text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 ${
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
/*
else if (item.to === "/report") {
                  isActive =
                    path.startsWith("/report") ||
                    path.startsWith("/reportinput") ||
                    path.startsWith("/report-details");
                } */
