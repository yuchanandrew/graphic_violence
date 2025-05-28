import { Link } from "react-router-dom";
// import Background from "./Background";

const Sidebar = () => {
  return (
    <>
      {/* <Background /> */}
      <div className="flex flex-col fixed left-0 h-screen m-0">
        <div className="flex flex-col left-0 h-screen p-6 space-y-6">
          <Link to="/" className="side-item left-0 justify-center items-center">
            <img
              src="LOGOBLUE.svg"
              alt="blue logo home"
              className="w-32 h-auto"
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
      </div>
    </>
  );
};

export default Sidebar;
