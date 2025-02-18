import React from "react";
import ProductCard from "./ProductCard";

function AllProducts({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default AllProducts;
