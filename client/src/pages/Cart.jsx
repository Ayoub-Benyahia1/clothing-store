import React from "react";
import { useSelector } from "react-redux";
import LeftCard from "../components/cart/LeftCard";
import RightCard from "../components/cart/RightCard";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-[90dvh]">
      <h2 className="text-2xl font-semibold mb-6">🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          You have no items in your shopping cart.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <LeftCard cartItems={cartItems} />
          <RightCard totalPrice={totalPrice} />
        </div>
      )}
    </div>
  );
}

export default Cart;
