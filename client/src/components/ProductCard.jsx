import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="p-3" key={product.id}>
      <Link to={`/${product.name}`}>
        <CardContent className="p-0">
          <div className="h-56 bg-gray-200 rounded-lg mb-4"></div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">{product.price} DH</p>
        </CardContent>
      </Link>
      <Button className="mt-4" onClick={() => console.log("clicked")}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard;
