import { useEffect } from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  useEffect(() => {
    fetch("http://localhost:3000/cart-clear", {
      method: "POST",
      credentials: "include",
    });
  }, []);
  return (
    <div>
      SuccessPage
      <Link to="/">Click!</Link>
    </div>
  );
};

export default SuccessPage;
