import { NavLink } from "react-router-dom";
import { Home, FileText, CheckCircle, Activity, Settings } from "lucide-react";

export default function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/report", label: "Report", icon: FileText },
    { to: "/checkin", label: "Check-in", icon: CheckCircle },
    { to: "/track", label: "Track-Syms", icon: Activity },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white">
      <div className="w-full max-w-[402px] flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full relative ${
                  isActive ? "text-[#539DF3]" : "text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute top-0 w-full h-[3px] bg-[#539DF3]" />
                  )}
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
