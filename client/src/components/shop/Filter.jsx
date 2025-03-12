import React from "react";
import AccordionFilter from "./AccordionFilter";
import { useSizes } from "@/hooks/useSize";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Function to retrieve categories
const fetchCategories = async () => {
  const response = await axios.get(`${backendUrl}/categories/all-categories`);
  return response.data.categories;
};

// Function to retrieve colors
const fetchColors = async () => {
  const response = await axios.get(`${backendUrl}/colors/all-colors`);
  return response.data.colors;
};

function Filter({ updateFilters }) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: sizes = [] } = useSizes();

  const { data: colors = [] } = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });

  const labels = [
    {
      name: "Gender",
      data: [
        { name: "Men", id: "men" },
        { name: "Women", id: "women" },
        { name: "Girl", id: "girl" },
        { name: "Boy", id: "boy" },
        { name: "Unisex", id: "unisex" },
      ],
      filterKey: "gender",
    },
    {
      name: "Price",
      filterKey: "price",
    },
    {
      name: "Category",
      data: categories.map((categorie) => ({
        name: categorie.name,
        id: categorie.id,
      })),
      filterKey: "category",
    },
    {
      name: "Size",
      data: sizes.map((size) => ({
        name: size.size,
        id: size.id,
      })),
      filterKey: "size",
    },
    {
      name: "Color",
      data: colors.map((color) => ({
        name: color.color,
        id: color.id,
      })),
      filterKey: "color",
    },
  ];

  return (
    <div className="flex gap-4 md:flex-col md:gap-0 w-max md:w-full">
      {labels.map((label, index) => (
        <AccordionFilter
          key={index}
          name={label?.name}
          data={label?.data}
          filterKey={label?.filterKey}
          updateFilters={updateFilters}
        />
      ))}
    </div>
  );
}

export default Filter;
