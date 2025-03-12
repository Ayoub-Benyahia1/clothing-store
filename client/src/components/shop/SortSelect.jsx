import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortSelect({ onSortChange, selectedSort }) {
  return (
    <Select onValueChange={onSortChange} value={selectedSort}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          <SelectItem value="sort_by=price&order=asc">
            Price: Low to High
          </SelectItem>
          <SelectItem value="sort_by=price&order=desc">
            Price: High to Low
          </SelectItem>
          <SelectItem value="sort_by=created_at&order=desc">
            Newest Arrivals
          </SelectItem>
          <SelectItem value="sort_by=created_at&order=asc">
            Old products
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortSelect;
