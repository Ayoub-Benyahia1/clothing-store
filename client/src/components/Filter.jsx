import React from "react";
import AccordionFilter from "./AccordionFilter";

function Filter() {
  const labels = [
    { name: "Gender", data: ["Men", "Women", "Girl", "Boy"] },
    { name: "Price", data: ["<100", "101><200", "201><400", "+400"] },
    { name: "Category", data: ["T-shirts", "Hoodies", "Jeans", "Shirts"] },
    { name: "Size", data: ["xs", "s", "m", "l", "xl"] },
    {
      name: "Color",
      data: ["White", "Black", "Red", "Blue", "Yellow", "Green"],
    },
  ];

  return (
    <div className="flex gap-4 md:flex-col md:gap-0 w-max md:w-full">
      {labels.map((label, index) => (
        <AccordionFilter key={index} name={label.name} data={label.data} />
      ))}
    </div>
  );
}

export default Filter;
