import { Link } from "react-router-dom";
// import Background from "./Background";

const Sidebar = () => {
  return (
    <>
      {/* <Background /> */}
      <div className="fixed left-0 h-screen w-64 p-6 overflow-y-auto md:flex flex-col items-center space-y-6">
        <Link to="/" className="side-item left-0 justify-center items-center">
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
      </div>
    </>
  );
};

export default Sidebar;
