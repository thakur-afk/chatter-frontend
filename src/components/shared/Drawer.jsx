import React from "react";
import { Outlet } from "react-router-dom";

const Drawer = ({ children, isMobileMenuOpen, h = "100vh", top = "0" }) => {
  return (
    <div
      className={`w-[40%] max-sm:w-[60%] z-10 h-[${h}] p-2 absolute left-0 top-[${top}] ${
        isMobileMenuOpen ? "max-sm:translate-x-0" : ""
      } transition-transform -translate-x-full  bg-slate-900`}
    >
      {children}
    </div>
  );
};

export default Drawer;
