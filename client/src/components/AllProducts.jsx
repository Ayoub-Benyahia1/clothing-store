import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

function AllProducts() {
  const { loading, products, error } = useSelector((state) => state.products);
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default AllProducts;
