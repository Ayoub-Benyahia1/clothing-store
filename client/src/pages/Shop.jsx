import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AllProducts from "@/components/shop/AllProducts";
import Scroll from "@/components/shop/Scroll";
import SortSelect from "@/components/shop/SortSelect";
import PaginationProducts from "@/components/PaginationProducts";
import { useFilterAndSort } from "@/hooks/useProducts";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  const { data: products, isLoading, error } = useFilterAndSort(queryParams);

  // Read sort parameters in URL
  const selectedSort = searchParams.get("sort_by")
    ? `sort_by=${searchParams.get("sort_by")}&order=${searchParams.get("order")}`
    : "";

  // Updates `queryParams` and URL
  const updateFilters = (newFilters) => {
    const updatedParams = { ...queryParams, ...newFilters };

    // Delete empty values
    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) delete updatedParams[key];
    });

    setQueryParams(updatedParams);
    setSearchParams(updatedParams);
  };

  // Sorting management
  const handleSortChange = (value) => {
    const params = new URLSearchParams(value);
    const sort_by = params.get("sort_by");
    const order = params.get("order");

    updateFilters({ sort_by, order });
  };

  // Read URL parameters on load
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setQueryParams(params);
  }, [searchParams]);

  return (
    <section className="container mx-auto px-2 md:px-8 grid md:grid-flow-col grid-cols-1 md:grid-cols-4 md:grid-rows-3 md:gap-4 pt-20">
      <div className="col-span-1 md:col-span-1 md:row-span-12 relative">
        <div className="md:sticky md:top-20">
          <Scroll updateFilters={updateFilters} />
        </div>
      </div>
      <div className="p-2 col-span-1 md:col-span-4 row-span-11">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <SortSelect onSortChange={handleSortChange} selectedSort={selectedSort} />
          </div>
          {isLoading && <p>Chargement des produits...</p>}
          {error && <p className="text-red-500">Erreur : {error.message}</p>}
          {products && <AllProducts products={products} isLoading={isLoading} error={error} />}
          <PaginationProducts />
        </div>
      </div>
    </section>
  );
}

export default Shop;




