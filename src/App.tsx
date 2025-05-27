import Sidebar from "./components/Sidebar";
import Top from "./components/Top";
import "./App.css";

function App() {
  return (
    <>
      <Top />
      <main className="flex-1">
        <Sidebar />
      </main>
    </>
  );
}

export default App;
