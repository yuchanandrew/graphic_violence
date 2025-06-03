import React from "react";
import Axios from "axios";

const Checkout = () => {
  const handleCheckout = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          itemId: 1,
        }
      );

      window.location.href = response.data.url;

      console.log(response.data);
    } catch (error) {
      console.error("Error during checkout");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-black px-4 py-2 rounded-xl hover:bg-white hover:text-green-600 hover:shadow-lg hover:shadow-green-600 transition-all transform hover:scale-105 hover:-translate-y-1"
    >
      Checkout
    </button>
  );
};

export default Checkout;
