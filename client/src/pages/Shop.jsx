import AllProducts from "@/components/AllProducts";
import Scroll from "@/components/Scroll";
import SortSelect from "@/components/SortSelect";
import { allProducts, sortByOrder } from "@/redux/slices/productsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Shop() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [sortType, setSortType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (value) => {
    const urlParams = new URLSearchParams(value);
    const queryParams = Object.fromEntries(urlParams.entries());

    setSearchParams(queryParams);
    setSortType(queryParams);
  };

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  useEffect(() => {
    if (sortType) {
      dispatch(sortByOrder(sortType));
    }
  }, [sortType, dispatch]);

  // Read sort parameters from URL on load
  useEffect(() => {
    const params = searchParams.toString();
    if (params) {
      setSortType(`?${params}`);
    }
  }, [searchParams]);

  return (
    <section className="container mx-auto px-2 md:px-8 grid md:grid-flow-col grid-cols-1 md:grid-cols-4 md:grid-rows-3 md:gap-4 pt-20">
      <div className="col-span-1 md:col-span-1 md:row-span-12 relative">
        <div className="md:sticky md:top-20">
          <Scroll />
        </div>
      </div>
      <div className="p-2 col-span-1 md:col-span-4 row-span-11">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <SortSelect
              onSortChange={handleSortChange}
              selectedSort={sortType}
            />
          </div>
          <AllProducts products={products} />
        </div>
      </div>
    </section>
  );
}

export default Shop;
