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
          <div className="flex flex-col bg-gray-200 p-2 rounded-xl space-y-1">
            <div className="flex p-1 bg-black min-w-[30px] rounded-xl"></div>
            <div className="flex p-1 bg-black min-w-[30px] rounded-xl"></div>
            <div className="flex p-1 bg-black min-w-[30px] rounded-xl"></div>
          </div>
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 h-screen w-64 p-6 overflow-y-auto md:flex flex-col items-center space-y-6 z-40 bg-green-600"
          >
            <Link
              to="/"
              className="side-item left-0 justify-center items-center"
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
