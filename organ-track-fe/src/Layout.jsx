import BottomNav from "./components/BottomNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return ( 
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-1 pb-16 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>

      <BottomNav />
    </div>
  );
}