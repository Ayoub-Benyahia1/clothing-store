import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Filter from "./Filter";

function Scroll() {
  return (
    <ScrollArea className="w-96 sm:w-full md:h-[30rem] md:overflow-y-auto md:rounded-md">
      <div className="flex gap-4 p-4 md:gap-0 md:flex-col">
        <Filter />
      </div>
      <ScrollBar orientation="horizontal" className="md:hidden" />
      <ScrollBar orientation="vertical" className="hidden md:block" />
    </ScrollArea>
  );
}

export default Scroll;
