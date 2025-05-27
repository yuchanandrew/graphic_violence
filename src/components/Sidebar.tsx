const Sidebar = () => {
  return (
    <div className="flex flex-col fixed left-0 h-screen m-0">
      <div className="flex flex-col left-0 h-screen p-6 space-y-6">
        <a href="#featured" className="sidebar-item left-0">
          Featured Items
        </a>
        <a href="#placehold1" className="sidebar-item left-0">
          Placehold1
        </a>
        <a href="#placehold2" className="sidebar-item left-0">
          Placehold2
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
