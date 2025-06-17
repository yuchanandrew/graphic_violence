import { useEffect, useState } from "react";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import CartDropdown from "./CartDropdown";

axios.defaults.withCredentials = true;

const Checkout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutQuantity, setCheckoutQuantity] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://graphicviolence-production.up.railway.app/cart"
      );
      setCheckoutItems(response.data.cart);
      setCheckoutQuantity(response.data.quantity_sum);
      setCheckoutTotal(response.data.total);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClickCart = async () => {
    if (!cartOpen) {
      await fetchCart();
    }

    setCartOpen(!cartOpen);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://graphicviolence-production.up.railway.app/create-checkout-session",
        {
          itemId: 1,
          // items: checkoutItems.map((item) => ({
          //   itemId: item.itemId,
          //   quantity: item.quantity,
          // })),
        }
      );

      window.location.href = response.data.url;

      console.log(response.data);
    } catch (error) {
      console.error("Error during checkout");
    }
  };

  const handleDelete = async (itemId: number) => {
    try {
      const response = await axios.post(
        "http://graphicviolence-production.up.railway.app/cart-remove",
        {
          itemId: itemId,
        }
      );

      await fetchCart();
      console.log("Item has been removed:", response);
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const handleAdd = async (itemId: number) => {
    try {
      const response = await axios.post(
        "http://graphicviolence-production.up.railway.app/cart-add",
        {
          itemId: itemId,
          quantity: 1,
        }
      );

      await fetchCart();
      console.log("Added to cart", response);
    } catch (error) {
      console.log("Error while adding to cart:", error);
    }
  };

  const handleSubtract = async (itemId: number) => {
    try {
      const response = await axios.post(
        "http://graphicviolence-production.up.railway.app/cart-subtract",
        {
          itemId: itemId,
        }
      );

      await fetchCart();
      console.log("Subtracted from cart", response);
    } catch (error) {
      console.log("Error while subtracting from cart", error);
    }
  };

  return (
    <div className="relative flex flex-col items-end">
      {checkoutItems.length != 0 && (
        <span className="dot relative -bottom-2">{checkoutQuantity}</span>
      )}
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
          onDelete={handleDelete}
          onAdd={handleAdd}
          onSubtract={handleSubtract}
        />
      )}
    </div>
  );
};

export default Checkout;
