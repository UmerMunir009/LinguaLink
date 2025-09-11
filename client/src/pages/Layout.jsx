import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Bell, User, Settings, MessageSquare } from "lucide-react";
import Sidebar from "../components/SideBar";
import { authStore } from "../store/authStore";

const Layout = () => {
  const { authUser } = authStore();
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-tr from-black via-gray-900 to-green-800
 border-b-2 border-green-500 px-4 py-3 flex justify-between items-center">
        {/* Left side: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 cursor-pointer"
            src="src/assets/logo.png"
            alt="Logo"
          />
          <h1 className="text-green-400 font-bold text-lg">LinguaLink</h1>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-green-400">
          <Bell className="w-5 h-5 cursor-pointer hover:text-green-300" />
          <MessageSquare className="w-5 h-5 cursor-pointer hover:text-green-300" />
          <User className="w-5 h-5 cursor-pointer hover:text-green-300" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-green-300" />
        </div>

        {/* Mobile toggle */}
        {sideBar ? (
          <X
            onClick={() => setSideBar(false)}
            className="sm:hidden text-green-400 cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSideBar(true)}
            className="sm:hidden text-green-400 cursor-pointer"
          />
        )}
      </nav>

      {/* Layout Content */}
      <div className="flex">
        <Sidebar sidebar={sideBar} setSidebar={setSideBar} />
        <div
          onClick={() => setSideBar(false)}
          className="flex-1 bg-[#F4F7FB] min-h-screen ml-0 sm:ml-80"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
