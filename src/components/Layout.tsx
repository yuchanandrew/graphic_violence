import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <div className=" flex fixed z-50 w-full">
        <Sidebar />
      </div>
      <div className="flex-1 z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
