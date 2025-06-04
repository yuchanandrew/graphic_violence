import { motion } from "framer-motion";

interface CartItem {
  itemId: number;
  quantity: number;
  name: string;
}

interface CartDropdownProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

const CartDropdown = ({ cartItems, onCheckout }: CartDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white px-6 py-6 rounded-xl flex flex-col mt-2"
    >
      <div className="flex flex-col text-black text-2xl font-semibold justify-start mb-4">
        <h2>Cart</h2>
      </div>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.itemId}
              className="flex flex-col p-2 text-black justify-start items-start font-bold"
            >
              <p>{cartItem.name}</p>
            </div>
          ))}
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
        <div className="text-black">Cart empty</div>
      )}
    </motion.div>
  );
};

export default CartDropdown;
