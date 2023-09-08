"use client";
import DebtTab from "@/components/projects/finnance/debts/table/DebtTab";
import DebtsCard from "@/components/projects/finnance/debts/DebtsCard";
import { FinnanceData } from "@/functions/interfaces";
import { useEffect, useState } from "react";
import { DebtForm } from "./form/DebtForm";

export default function Debts() {
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
      <div className="mt-3 flex mobile:flex-col gap-5 justify-center items-center px-5">
        <DebtForm
          finnanceData={finnanceData}
          setFinnanceData={setFinnanceData}
        />
        <DebtsCard finnaceData={finnanceData} />
      </div>
      <DebtTab setFinnanceData={setFinnanceData} finnanceData={finnanceData} />
    </div>
  );
}
