"use client";
import Cards from "@/components/projects/finnance/components/dashboard/cards/Cards";
import Table from "@/components/projects/finnance/components/dashboard/tab/Table";
import { NoteForm } from "@/components/projects/finnance/components/dashboard/form/NoteForm";
import { FinnanceData } from "@/functions/interfaces";

import { useEffect, useState } from "react";

export default function FinnanceDashboard() {
  const [finnanceData, setFinnanceData] = useState<FinnanceData>({
    globalIds: 0,
    notesList: {
      classes: [{ id: 0, flow: "entrada", text: "salario" }],
      notes: [],
    },
    debtsList: [],
  });

  useEffect(() => {
    const holder = localStorage.getItem("finnance_data");
    const data: FinnanceData = JSON.parse(holder || "{}");
    if (!holder) {
      localStorage.setItem("finnance_data", JSON.stringify(finnanceData));
    } else {
      setFinnanceData(() => data);
    }
  }, []);

  return (
    <div className="template_dashboard flex flex-col items-center">
      {/* <Cards /> */}
      <NoteForm finnanceData={finnanceData} setFinnanceData={setFinnanceData} />
      <Table setFinnanceData={setFinnanceData} finnanceData={finnanceData} />
    </div>
  );
}
