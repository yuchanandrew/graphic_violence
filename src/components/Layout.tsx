import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";
import Checkout from "./Checkout";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed right-4 top-4 z-30">
        <Checkout />
      </div>
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
