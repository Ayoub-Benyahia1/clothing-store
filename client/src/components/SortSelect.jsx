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

function SortSelect({ onSortChange }) {
  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
          <SelectItem value="rating_desc">Rating: Highest First</SelectItem>
          <SelectItem value="rating_asc">Rating: Lowest First</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="popularity">Most Popular</SelectItem>
          <SelectItem value="discount">Biggest Discount</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortSelect;
