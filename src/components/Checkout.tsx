import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import CartDropdown from "./CartDropdown";

axios.defaults.withCredentials = true;

const Checkout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const handleClickCart = async () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setCheckoutItems(response.data.cart);
        setCheckoutTotal(response.data.total);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    fetchCart();
  }, [cartOpen]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
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
    <div className="relative flex flex-col items-end">
      <button
        onClick={handleClickCart}
        className="bg-green-600 text-black px-4 py-2 rounded-xl hover:bg-white hover:text-green-600 hover:shadow-lg hover:shadow-green-600 transition-all transform hover:scale-105 hover:-translate-y-1"
      >
        <FaCartShopping size={24} />
      </button>

      {/*This is where we call cartItems*/}
      {cartOpen && (
        <CartDropdown
          cartItems={checkoutItems}
          cartTotal={checkoutTotal}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default Checkout;
