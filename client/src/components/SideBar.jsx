import React from "react";
import {
  House,
  SquarePen,
  Hash,
  LogOut,
  Bell,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { authStore } from "../store/authStore";
import {useAuth} from '../customHooks/useAuth'

const Sidebar = ({ sidebar, setSidebar }) => {
  const { authUser } = authStore();
  const {loggingOut,Logout}=useAuth()

  const navItems = [
    { to: "/", label: "Home", Icon: House },
    { to: "/friends", label: "Friends", Icon: SquarePen },
    { to: "/notifications", label: "Notifications", Icon: Hash },
  ];

  const handleLogout=()=>{
    Logout()
  }

  return (
    <div
      className={`fixed top-14 bottom-0 left-0 z-10 
  w-[50%] sm:w-60 lg:w-72 flex flex-col 
  transition-transform duration-300 ease-in-out
  bg-gradient-to-tr from-black via-gray-900 to-green-800
 text-green-400
  ${sidebar ? "translate-x-0" : "max-md:-translate-x-full"}`}
    >
      <div className="mt-7 w-full">
        <img
          src={authUser?.profilePic}
          alt="User avatar"
          className="w-20 h-20 rounded-full mx-auto cursor-pointer border-2 border-green-500"
        />
        <h1 className="mt-2 text-center text-green-400 font-semibold">
          {authUser?.name}
        </h1>

        <div className="mt-5 flex md:hidden justify-center items-center gap-6 text-green-400">
          <Bell className="w-5 h-5 cursor-pointer hover:text-green-300" />
          <MessageSquare className="w-5 h-5 cursor-pointer hover:text-green-300" />
          <User className="w-5 h-5 cursor-pointer hover:text-green-300" />
        </div>

        <div className="my-6 px-3">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-md transition-colors border 
                ${
                  isActive
                    ? "border-green-500 text-green-300"
                    : "border-transparent hover:border-green-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-green-300" : "text-green-400"
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <div
        onClick={()=>handleLogout()}
          className="flex justify-center items-center px-5 py-3 cursor-pointer 
                  bg-red-600 hover:bg-red-700 transition-colors rounded-md mx-3 mb-4 shadow-md"
        >
          <LogOut className="text-white w-5 mr-2" />
          <p className="text-white font-bold text-md uppercase tracking-wide">
            {loggingOut?'Singing Out...':'Sign Out'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
