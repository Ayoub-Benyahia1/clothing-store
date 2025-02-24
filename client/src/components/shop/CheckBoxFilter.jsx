import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useSearchParams } from "react-router-dom";

function CheckBoxFilter({ dataList, filterKey }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (checked, value) => {
    let updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((item) => item !== value);

    setSelectedValues(updatedValues);

    // Update URL parameters
    const params = new URLSearchParams(searchParams);
    if (updatedValues.length > 0) {
      params.set(filterKey, updatedValues.join(","));
    } else {
      params.delete(filterKey);
    }
    setSearchParams(params);
  };

  return (
    <div>
      {dataList.map((data) => (
        <div key={data} className="flex items-center space-x-2">
          <Checkbox
            id={data}
            value={data}
            onCheckedChange={(checked) => handleCheckboxChange(checked, data)}
          />
          <label
            htmlFor={data}
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
          >
            {data}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckBoxFilter;
