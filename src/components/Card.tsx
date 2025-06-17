import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

axios.defaults.withCredentials = true;

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

function Card({ id, title, description, price, image }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const handleAddToCart = async () => {
    await axios.post(
      "http://graphicviolence-production.up.railway.app/cart-add",
      {
        itemId: id,
        quantity: 1,
      }
    );

    setIsAlert(true);

    setTimeout(() => {
      setIsAlert(false);
    }, 3000);

    console.log("Successfully added to the cart!");
  };

  return (
    <motion.div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-4 transition-all transform hover:scale-105 hover:-translate-y-1"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-gray-600 text-sm">${price}</p>
      {isOpen && (
        <motion.div className="flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-black text-xl rounded-xl font-semibold p-2 mt-4 transition-all transform hover:bg-black hover:shadow-lg hover:shadow-green-600 hover:text-green-600 hover:scale-105 hover:-translate-y-1"
          >
            Add to Cart
          </button>
        </motion.div>
      )}
      {isAlert && <Alert severity="success">Added to cart!</Alert>}
    </motion.div>
  );
}

export default Card;
