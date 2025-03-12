import React from "react";
import ProductCard from "./ProductCard";

function AllProducts({ products, isLoading, error }) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
