import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "@/redux/slices/productsSlice";

const DualRangeSlider = ({
  min = 0,
  max = 1000,
  step = 10,
  onChange,
  updateFilters,
}) => {
  // const dispatch = useDispatch();
  // const filters = useSelector((state) => state.products.filters);
  // const [values, setValues] = useState([
  //   filters["price_min"] || min,
  //   filters["price_max"] || max,
  // ]);

  // const handleChange = (newValues) => {
  //   if (newValues[0] < newValues[1]) {
  //     setValues(newValues);
  //     dispatch(updateFilters({ "price_min": newValues[0], "price_max": newValues[1] }));
  //   }
  // };
  const [values, setValues] = useState([min, max]);

  const handleChange = (newValues) => {
    if (newValues[0] < newValues[1]) {
      setValues(newValues);
      updateFilters({ "price_min": newValues[0], "price_max": newValues[1] });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
      <Slider
        value={values}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
};

export default DualRangeSlider;
