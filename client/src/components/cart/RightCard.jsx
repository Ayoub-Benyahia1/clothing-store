import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { Button } from "../ui/button";

function RightCard({ totalPrice }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-fit sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Total:</span>
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
      </div>
      <Button className="w-full mt-4">Checkout</Button>
      <Button
        variant="destructive"
        className="w-full mt-2"
        onClick={() => dispatch(clearCart())}
      >
        Empty the cart
      </Button>
    </div>
  );
}

export default RightCard;
