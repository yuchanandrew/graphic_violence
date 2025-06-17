import { useEffect } from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  useEffect(() => {
    fetch("http://graphicviolence-production.up.railway.app/cart-clear", {
      method: "POST",
      credentials: "include",
    });
  }, []);
  return (
    <div className="flex flex-col justify center items-center space-y-6 p-8">
      <h2 className="text-2xl text-gray-200 font-semibold">
        Thank you for your purchase!
      </h2>
      <Link to="/" className="text-green-600">
        Return home
      </Link>
    </div>
  );
};

export default SuccessPage;
