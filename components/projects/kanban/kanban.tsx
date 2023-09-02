"use client";
import "./index.css";

import { useEffect, useState } from "react";
import ProjectHeader from "../components/ProjectHeader";
import KbCard from "./components/KbCard";
import { KanbanCard, KanbanData } from "@/functions/interfaces";

/* ================ materialUI ================ */

export default function Kanban() {
  const [kanbanLists, setKanbanLists] = useState<KanbanCard[]>([
    {
      name: "To Do",
      id: "ToDo",
      items: [],
      color: "#90d4d9",
    },
    {
      name: "Doing",
      id: "Doing",
      items: [],
      color: "#FFD25F",
    },
    {
      name: "Done",
      id: "Done",
      items: [],
      color: "#60FFB3",
    },
  ]);

  const [ids, setIds] = useState({ itemId: 0, cardId: 0 });
  // ================ adiciona um card ================
  function addCard() {}

  // ================ deleta todos os cards adicionados ================

  function delAllCards() {}

  // ================ deleta todos os itens de todos os cards ================
  function delAllItems() {}

  useEffect(() => {
    const storage = localStorage.getItem("kanban_data");
    const kanbanData: KanbanData = JSON.parse(storage || "{}");

    if (storage) {
      setKanbanLists(() => kanbanData.cards);
    } else {
      const holder: KanbanData = {
        globalIds: { itemId: 0, cardId: 0 },
        cards: [
          {
            name: "To Do",
            id: "ToDo",
            items: [],
            color: "#90d4d9",
          },
          {
            name: "Doing",
            id: "Doing",
            items: [],
            color: "#FFD25F",
          },
          {
            name: "Done",
            id: "Done",
            items: [],
            color: "#60FFB3",
          },
        ],
      };
      localStorage.setItem("kanban_data", JSON.stringify(holder));
    }
  }, []);

  return (
    <div className="template bg-slate-100 ">
      {/* ====================== header ====================== */}
      <ProjectHeader title="Kanban " />

      {/* ================ area de todos os cards ================ */}
      <div className="template_dashboard p-3 grid grid-cols-4 gap-2 justify-center content-start overflow-y-auto overflow-hidden">
        {kanbanLists.map((i) => (
          <KbCard key={i.id} setKanbanLists={setKanbanLists} cardData={i} />
        ))}
      </div>
    </div>
  );
}
