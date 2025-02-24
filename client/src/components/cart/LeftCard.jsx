import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeProduct } from "@/redux/slices/cartSlice";

function LeftCard({ cartItems }) {
  const dispatch = useDispatch();
  return (
    <div className="md:col-span-2 space-y-4">
      {cartItems.map((item) => (
        <Card key={item.id} className="flex items-center gap-4 p-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg">image</div>
          <CardContent className="flex-1 p-0">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-gray-500">${item.price}</p>
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <Minus size={16} />
              </Button>
              <span className="px-3">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                disabled={item.stock <= item.quantity}
                onClick={() => dispatch(addToCart(item))}
              >
                <Plus size={16} />
              </Button>
            </div>
          </CardContent>
          <Button
            variant="destructive"
            size="icon"
            className="w-10 h-10"
            onClick={() => dispatch(removeProduct(item.id))}
          >
            <Trash2 size={20} />
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default LeftCard;
