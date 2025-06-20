import { Route, Routes, useLocation } from "react-router-dom";

import "../App.css";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import FeaturedPage from "../pages/FeaturedPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import SuccessPage from "../pages/SuccessPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/featured-items" element={<FeaturedPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;
