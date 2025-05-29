import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturedPage from "./pages/FeaturedPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
