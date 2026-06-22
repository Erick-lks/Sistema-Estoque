import { Outlet } from "react-router-dom";

import SideBar from "./Sidebar/SideBar";

export default function App() {
  return (
    <div className="flex h-screen ">
      <SideBar />
      <main className="flex-1 bg-[#EBE4D6] overflow-auto transition-[margin,padding,width] duration-700 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
}
