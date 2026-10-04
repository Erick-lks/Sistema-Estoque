import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar/SideBar";

export default function App() {
  return (
    <div className="flex min-h-screen w-full">
      
      <SideBar />

      <main
        className="
          flex-1
          min-w-0
          min-h-screen
          bg-[#EBE4D6]
          overflow-auto

          pt-16
          pb-16

          md:pt-0
          md:pb-0

          transition-all
          duration-300
        "
      >
        <Outlet />
      </main>

    </div>
  );
}