import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

// import Background from "./Background";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("clicked");
  };

  return (
    <>
      <div className="relative">
        <button
          className="fixed top-5 left-5 text-white z-50"
          onClick={toggleSidebar}
        >
          <div className="group flex flex-col bg-green-600 p-2 rounded-xl space-y-1 transition-all transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-600 hover:bg-white">
            <div className="flex p-1 bg-black min-w-[30px] rounded group-hover:bg-green-600"></div>
            <div className="flex p-1 bg-black min-w-[30px] rounded group-hover:bg-green-600"></div>
            <div className="flex p-1 bg-black min-w-[30px] rounded group-hover:bg-green-600"></div>
          </div>
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex left-0 h-screen w-64 p-6 overflow-y-auto md:flex flex-col items-center space-y-6 z-40 bg-gray-600"
          >
            <Link
              to="/"
              className="side-item left-0 justify-center items-center mt-24"
            >
              <img
                src="LOGOBLUE.svg"
                alt="blue logo home"
                className="w-32 h-auto ml-4"
              />
            </Link>
            <Link
              to="/featured-items"
              className="sidebar-item left-0 justify-center"
            >
              Featured Items
            </Link>
            <Link to="/about-us" className="sidebar-item left-0">
              About Us
            </Link>
            <Link to="/contact-us" className="sidebar-item left-0">
              Contact Us
            </Link>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
