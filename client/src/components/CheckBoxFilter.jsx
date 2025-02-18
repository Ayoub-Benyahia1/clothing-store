import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";

function CheckBoxFilter({ dataList }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (checked, value) => {
    setSelectedValues((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  console.log(selectedValues);

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
