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
      {dataList.map(({id, name}) => (
        <div key={id} className="flex items-center space-x-2">
          <Checkbox
            id={id}
            value={name}
            onCheckedChange={(checked) => handleCheckboxChange(checked, id)}
          />
          <label
            htmlFor={name}
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckBoxFilter;
