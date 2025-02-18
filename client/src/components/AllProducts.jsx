import React from "react";
import ProductCard from "./ProductCard";

function AllProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <ProductCard />
      ))}
    </div>
  );
}

export default AllProducts;
