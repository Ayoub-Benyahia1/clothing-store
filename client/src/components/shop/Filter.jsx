import React, { useEffect } from "react";
import AccordionFilter from "./AccordionFilter";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "@/redux/slices/categorySlice";
import { allSizes } from "@/redux/slices/sizeSlice";
import { allColors } from "@/redux/slices/colorSlice";

function Filter({ updateFilters }) {
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );
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
      data: ["Men", "Women", "Girl", "Boy"],
      filterKey: "gender",
    },
    {
      name: "Price",
      filterKey: "price",
    },
    {
      name: "Category",
      data: loading
        ? "loading..."
        : categories.length > 0
        ? categories.map((category) => category.name)
        : error,
      filterKey: "category",
    },
    {
      name: "Size",
      data: loading
        ? "loading..."
        : sizes.length > 0
        ? sizes.map((size) => size.size)
        : error,
      filterKey: "size",
    },
    {
      name: "Color",
      data: loading
        ? "loading..."
        : colors.length > 0
        ? colors.map((color) => color.color)
        : error,
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
