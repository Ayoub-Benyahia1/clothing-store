// import React from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import CheckBoxFilter from "./CheckBoxFilter";
// import DualRangeSlider from "./DualRangeSlider";

// function AccordionFilter({ name, data, filterKey, updateFilters }) {
//   return (
//     <Accordion
//       type="single"
//       collapsible
//       className="shadow-lg rounded-lg px-4 border-none w-52 md:w-auto"
//     >
//       <AccordionItem value={filterKey}>
//         <AccordionTrigger className="font-bold text-lg py-2 md:py-4">
//           {name}
//         </AccordionTrigger>
//         <AccordionContent>
//           {filterKey === "price" ? (
//             <DualRangeSlider updateFilters={updateFilters} />
//           ) : (
//             <CheckBoxFilter dataList={data} filterKey={filterKey} />
//           )}
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// }

// export default AccordionFilter;

// 2 stay open only one
// import React, { useState, useEffect } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useSearchParams } from "react-router-dom";
// import CheckBoxFilter from "./CheckBoxFilter";
// import DualRangeSlider from "./DualRangeSlider";

// function AccordionFilter({ name, data, filterKey, updateFilters }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const isOpen = searchParams.get("open") === filterKey; // Vérifie si l'accordéon doit être ouvert

//   const handleToggle = () => {
//     const params = new URLSearchParams(searchParams);
//     if (isOpen) {
//       params.delete("open"); // Fermer l'accordéon en supprimant le paramètre
//     } else {
//       params.set("open", filterKey); // Ouvrir l'accordéon et sauvegarder l'état
//     }
//     setSearchParams(params);
//   };

//   return (
//     <Accordion
//       type="single"
//       collapsible
//       value={isOpen ? filterKey : ""}
//       className="shadow-lg rounded-lg px-4 border-none w-52 md:w-auto"
//     >
//       <AccordionItem value={filterKey}>
//         <AccordionTrigger
//           className="font-bold text-lg py-2 md:py-4"
//           onClick={handleToggle}
//         >
//           {name}
//         </AccordionTrigger>
//         <AccordionContent>
//           {filterKey === "price" ? (
//             <DualRangeSlider updateFilters={updateFilters} />
//           ) : (
//             <CheckBoxFilter dataList={data} filterKey={filterKey} />
//           )}
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// }

// export default AccordionFilter;

// 3 open multiple accordion
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "react-router-dom";
import CheckBoxFilter from "./CheckBoxFilter";
import DualRangeSlider from "./DualRangeSlider";

function AccordionFilter({ name, data, filterKey, updateFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Récupère les accordéons ouverts sous forme de tableau
  const openAccordions = searchParams.get("open")?.split(",") || [];
  const isOpen = openAccordions.includes(filterKey);

  const handleToggle = () => {
    const params = new URLSearchParams(searchParams);
    let updatedAccordions;

    if (isOpen) {
      // Si déjà ouvert, on le ferme en l'enlevant du tableau
      updatedAccordions = openAccordions.filter((item) => item !== filterKey);
    } else {
      // Sinon, on l'ajoute au tableau
      updatedAccordions = [...openAccordions, filterKey];
    }

    if (updatedAccordions.length > 0) {
      params.set("open", updatedAccordions.join(",")); // Mise à jour de l'URL
    } else {
      params.delete("open");
    }

    setSearchParams(params);
  };

  return (
    <Accordion
      type="multiple" // Permet d’ouvrir plusieurs accordéons
      className="shadow-lg rounded-lg px-4 border-none w-52 md:w-auto"
      value={openAccordions}
    >
      <AccordionItem value={filterKey}>
        <AccordionTrigger
          className="font-bold text-lg py-2 md:py-4"
          onClick={handleToggle}
        >
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







