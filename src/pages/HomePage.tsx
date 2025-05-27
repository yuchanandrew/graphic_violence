import Sidebar from "../components/Sidebar";
import Top from "../components/Top";
import "../App.css";

function HomePage() {
  return (
    <>
      <div className="relative z-50">
        <Sidebar />
      </div>
      <div className="relative z-40">
        <Top />
      </div>
      <main className="flex-1 min-h-screen"></main>
    </>
  );
}

export default HomePage;
