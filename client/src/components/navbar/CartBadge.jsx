import React from "react";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

function CartBadge() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <Badge className="rounded-full px-0.5 py-0 absolute top-[-12px] right-[-10px]">
      {totalItems}
    </Badge>
  );
}

export default CartBadge;
