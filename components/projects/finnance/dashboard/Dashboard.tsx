"use client";
import { FinnanceData } from "@/functions/interfaces";

import { useEffect, useState } from "react";
import Cards from "./cards/Cards";
import NoteForm from "./form/NoteForm";
import Table from "./tab/Table";

export default function FinnanceDashboard() {
  const [finnanceData, setFinnanceData] = useState<FinnanceData>({
    globalIds: 0,
    notesList: {
      classes: [
        { id: 1, flow: "saida", text: "Alimentação" },
        { id: 2, flow: "saida", text: "Casa" },
        { id: 3, flow: "saida", text: "Educação" },
        { id: 4, flow: "saida", text: "Essencial" },
        { id: 5, flow: "entrada", text: "Financiamento/Emprestimo" },
        { id: 6, flow: "saida", text: "Lazer" },
        { id: 7, flow: "saida", text: "Metas" },
        { id: 8, flow: "entrada", text: "R. Ativa" },
        { id: 9, flow: "entrada", text: "R. Passiva" },
        { id: 10, flow: "saida", text: "Reservas" },
        { id: 11, flow: "saida", text: "Saúde" },
        { id: 12, flow: "saida", text: "Transporte" },
        { id: 13, flow: "saida", text: "outro" },
        { id: 14, flow: "saida", text: "quitação de divida" },
      ],
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
    <div className="template_dashboard overflow-hidden overflow-y-auto">
      <div className="flex flex-col items-center max-h-[110vh] mobile:max-h-[180vh] mobile-sm:max-h-[230vh] h-fit">

      <Cards finnanceData={finnanceData} />
      <NoteForm finnanceData={finnanceData} setFinnanceData={setFinnanceData} />
      <Table setFinnanceData={setFinnanceData} finnanceData={finnanceData} />
      </div>
    </div>
  );
}
