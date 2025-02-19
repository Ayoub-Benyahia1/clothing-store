import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const DualRangeSlider = ({ min = 0, max = 1000, step = 10, updateFilters }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (newValues) => {
    if (newValues[0] < newValues[1]) {
      setValues(newValues);
      updateFilters({ price_min: newValues[0], price_max: newValues[1] });
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
