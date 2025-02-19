import React from "react";
import AccordionFilter from "./AccordionFilter";

function Filter({ updateFilters }) {
  const labels = [
    {
      name: "Gender",
      data: ["Men", "Women", "Girl", "Boy"],
      filterKey: "gender",
    },
    {
      name: "Price",
      data: ["<100", "101><200", "201><400", "+400"],
      filterKey: "price",
    },
    {
      name: "Category",
      data: ["T-shirts", "Hoodies", "Jeans", "Shirts"],
      filterKey: "category",
    },
    { name: "Size", data: ["xs", "s", "m", "l", "xl"], filterKey: "size" },
    {
      name: "Color",
      data: ["White", "Black", "Red", "Blue", "Yellow", "Green"],
      filterKey: "color",
    },
  ];

  return (
    <div className="flex gap-4 md:flex-col md:gap-0 w-max md:w-full">
      {labels.map((label, index) => (
        <AccordionFilter
          key={index}
          name={label.name}
          data={label.data}
          filterKey={label.filterKey}
          updateFilters={updateFilters}
        />
      ))}
    </div>
  );
}

export default Filter;
