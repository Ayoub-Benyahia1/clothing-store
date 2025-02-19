import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckBoxFilter from "./CheckBoxFilter";

function AccordionFilter({ name, data, filterKey }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-lg rounded-lg px-6 border-none"
    >
      <AccordionItem value={filterKey}>
        <AccordionTrigger className="font-bold text-lg">
          {name}
        </AccordionTrigger>
        <AccordionContent>
          <CheckBoxFilter dataList={data} filterKey={filterKey} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionFilter;
