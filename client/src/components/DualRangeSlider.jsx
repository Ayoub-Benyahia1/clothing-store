import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

const DualRangeSlider = ({ min = 0, max = 1000, step = 10, updateFilters }) => {
  const { control, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      price_min: min,
      price_max: max,
    },
  });

  const values = [watch("price_min"), watch("price_max")];

  // Send values ​​only when user stops dragging
  const handleCommit = () => {
    handleSubmit((data) => {
      updateFilters({ price_min: data.price_min, price_max: data.price_max });
    })();
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{values[0]}</span>
        <span>{values[1]}</span>
      </div>
      <Controller
        name="priceRange"
        control={control}
        render={({ field }) => (
          <Slider
            value={values}
            onValueChange={(newValues) => {
              if (newValues[0] < newValues[1]) {
                setValue("price_min", newValues[0]);
                setValue("price_max", newValues[1]);
              }
            }}
            onValueCommit={handleCommit}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
        )}
      />
    </div>
  );
};

export default DualRangeSlider;
