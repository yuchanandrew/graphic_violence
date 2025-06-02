import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed z-50 w-full">
        <Sidebar />
      </div>
      <div className="flex-1 z-10 flex flex-col min-h-screen">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
