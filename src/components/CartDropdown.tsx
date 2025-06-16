import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";

interface CartItem {
  itemId: number;
  quantity: number;
  name: string;
  price: string;
}

interface CartDropdownProps {
  cartItems: CartItem[];
  cartTotal: number;
  onCheckout: () => void;
  onDelete: (itemId: number) => void;
  onAdd: (itemId: number) => void;
  onSubtract: (itemId: number) => void;
}

const CartDropdown = ({
  cartItems,
  cartTotal,
  onCheckout,
  onDelete,
  onAdd,
  onSubtract,
}: CartDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white py-6 rounded-xl flex flex-col mt-2"
    >
      <div className="flex flex-col text-black text-2xl font-semibold mb-8">
        <h2>Cart</h2>
      </div>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.itemId}
              className="text-black font-bold grid grid-cols-3 gap-4 space-y-6 justify-center items-start"
            >
              <div className="ml-4">
                <p>{cartItem.name}</p>
              </div>
              <div className="justify-self-end">
                <div className="grid grid-cols-3 gap-2 border-2 border-black rounded-2xl py-1 justify-center items-start">
                  <button
                    onClick={() => onSubtract(cartItem.itemId)}
                    className="hover:bg-gray-200 rounded-2xl"
                  >
                    –
                  </button>
                  <p>x {cartItem.quantity}</p>
                  <button
                    onClick={() => onAdd(cartItem.itemId)}
                    className="hover:bg-gray-200 rounded-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div key={cartItem.itemId} className="justify-self-center">
                <button
                  onClick={() => onDelete(cartItem.itemId)}
                  className="py-2 px-6 bg-red-600 text-white text-lg rounded-xl hover:bg-black hover:shadow-lg hover:shadow-red-600 hover:text-red-600 transition-all transform hover:scale-105 hover:-translate-y-1"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
          <div>
            <p className="text-black font-bold mt-4">Total: ${cartTotal}</p>
          </div>
          <div>
            <button
              onClick={onCheckout}
              className="p-3 mt-2 bg-green-600 text-black text-xl font-semibold rounded-xl transition-all transform hover:text-green-600 hover:bg-black hover:shadow-lg hover:shadow-green-600 hover:scale-105 hover:-translate-y-1"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="text-black py-6 px-8">Cart empty</div>
      )}
    </motion.div>
  );
};

export default CartDropdown;
