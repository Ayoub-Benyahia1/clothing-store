import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AllProducts from "@/components/shop/AllProducts";
import Scroll from "@/components/shop/Scroll";
import SortSelect from "@/components/shop/SortSelect";
import { filterAndSort } from "@/redux/slices/productsSlice";

function Shop() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});

  // Updates local `queryParams` state and URL parameters
  const updateFilters = (newFilters) => {
    const updatedParams = { ...queryParams, ...newFilters };

    // Removing empty values
    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) {
        delete updatedParams[key];
      }
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

  // Converts the object into string
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // Read URL parameters on load
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setQueryParams(params);
  }, [searchParams]);

  // Run filtering + sorting query every time settings change
  useEffect(() => {
    dispatch(filterAndSort(queryParams));
  }, [queryParams, dispatch]);

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
            <SortSelect
              onSortChange={handleSortChange}
              queryString={queryString}
            />
          </div>
          <AllProducts />
        </div>
      </div>
    </section>
  );
}

export default Shop;
