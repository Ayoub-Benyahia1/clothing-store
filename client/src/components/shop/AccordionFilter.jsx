import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckBoxFilter from "./CheckBoxFilter";
import DualRangeSlider from "./DualRangeSlider";

function AccordionFilter({ name, data, filterKey, updateFilters }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-lg rounded-lg px-4 border-none w-52 md:w-auto"
    >
      <AccordionItem value={filterKey}>
        <AccordionTrigger className="font-bold text-lg py-2 md:py-4">
          {name}
        </AccordionTrigger>
        <AccordionContent>
          {filterKey === "price" ? (
            <DualRangeSlider updateFilters={updateFilters} />
          ) : (
            <CheckBoxFilter dataList={data} filterKey={filterKey} />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionFilter;
