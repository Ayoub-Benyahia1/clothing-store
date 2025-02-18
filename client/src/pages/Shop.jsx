import AllProducts from "@/components/AllProducts";
import Scroll from "@/components/Scroll";
import SortSelect from "@/components/SortSelect";
import React, { useState } from "react";

function Shop() {
  const [sortType, setSortType] = useState("");

  const handleSortChange = (value) => {
    console.log("Selected Sort:", value);
    setSortType(value);
    // Fetch sorted products from API or sort locally
  };

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
            <SortSelect onSortChange={handleSortChange} />
          </div>
          <AllProducts />
        </div>
      </div>
    </section>
  );
}

export default Shop;
