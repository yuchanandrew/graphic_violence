import { motion } from "framer-motion";

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
}

const CartDropdown = ({
  cartItems,
  cartTotal,
  onCheckout,
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
              className="text-black font-bold grid grid-cols-2 gap-6 space-y-4 justify-items-start"
            >
              <div className="ml-4">
                <p>{cartItem.name}</p>
              </div>
              <div className="justify-self-end mr-4">
                <p>x {cartItem.quantity}</p>
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
        <div className="text-black">Cart empty</div>
      )}
    </motion.div>
  );
};

export default CartDropdown;
