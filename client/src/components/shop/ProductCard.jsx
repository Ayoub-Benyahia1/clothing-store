import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Card className="p-3" key={product.id}>
      <Link to={`/product/${product.name}/${product.id}`}>
        <CardContent className="p-0">
          <div className="h-56 bg-gray-200 rounded-lg mb-4"></div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">${product.price}</p>
        </CardContent>
      </Link>
      <Button className="mt-4" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard;
