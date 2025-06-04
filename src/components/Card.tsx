import { motion } from "framer-motion";
import { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card(props: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-4 transition-all transform hover:scale-105 hover:-translate-y-1"
    >
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{props.title}</h2>
      <p className="text-gray-600 text-sm">{props.description}</p>
      {isOpen && (
        <motion.div className="flex items-center justify-center">
          <button className="bg-green-600 text-black text-xl rounded-xl font-semibold p-2 mt-4 transition-all transform hover:bg-black hover:shadow-lg hover:shadow-green-600 hover:text-green-600 hover:scale-105 hover:-translate-y-1">
            Add to Cart
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Card;
