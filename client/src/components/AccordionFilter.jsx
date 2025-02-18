import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckBoxFilter from "./CheckBoxFilter";

function AccordionFilter({ name, data }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-lg rounded-lg px-6 border-none"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-lg">
          {name}
        </AccordionTrigger>
        <AccordionContent>
          <CheckBoxFilter dataList={data} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionFilter;
