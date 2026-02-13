import BottomNav from "./components/BottomNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-[402px] flex-1 pb-16 ">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}
