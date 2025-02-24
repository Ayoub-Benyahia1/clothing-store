import React, { useEffect } from "react";
import AccordionFilter from "./AccordionFilter";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "@/redux/slices/categorySlice";
import { allSizes } from "@/redux/slices/sizeSlice";
import { allColors } from "@/redux/slices/colorSlice";

function Filter({ updateFilters }) {
  const { categories, error } = useSelector((state) => state.categories);
  const { sizes } = useSelector((state) => state.sizes);
  const { colors } = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    await dispatch(allCategories());
  };
  const fetchSizes = async () => {
    await dispatch(allSizes());
  };
  const fetchColors = async () => {
    await dispatch(allColors());
  };
  useEffect(() => {
    fetchCategories();
    fetchSizes();
    fetchColors();
  }, [dispatch]);
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
      data:
        categories.length > 0
          ? [
              ...new Set(
                categories.map((categorie) =>
                  JSON.stringify({ name: categorie.name, id: categorie.id })
                )
              ),
            ].map((item) => JSON.parse(item))
          : [],
      filterKey: "category",
    },
    {
      name: "Size",
      data:
        sizes.length > 0
          ? [
              ...new Set(
                sizes.map((size) =>
                  JSON.stringify({ name: size.size, id: size.id })
                )
              ),
            ].map((item) => JSON.parse(item))
          : [],
      filterKey: "size",
    },
    {
      name: "Color",
      data:
        colors.length > 0
          ? [
              ...new Set(
                colors.map((color) =>
                  JSON.stringify({ name: color.color, id: color.id })
                )
              ),
            ].map((item) => JSON.parse(item))
          : [],
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
