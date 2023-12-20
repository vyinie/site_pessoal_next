"use client";

import { useEffect, useState } from "react";
import ProjectHeader from "../../commonComponents/ProjectHeader";
import KbCard from "./components/cardComponents/KbCard";
import { KanbanCard, KanbanData } from "@/functions/interfaces";
import KanbanSideBar from "./components/sidebarComponents/KbSideBar";

/* ================ materialUI ================ */

export default function Kanban() {
  const [kanbanLists, setKanbanLists] = useState<KanbanCard[]>([
    {
      name: "à fazer",
      id: "ToDo",
      items: [],
      color: { bg: "#90d4d9", text: "text-black" },
    },
    {
      name: "fazendo",
      id: "Doing",
      items: [],
      color: { bg: "#FFD25F", text: "text-black" },
    },
    {
      name: "feito",
      id: "Done",
      items: [],
      color: { bg: "#60FFB3", text: "text-black" },
    },
  ]);

  useEffect(() => {
    const storage = localStorage.getItem("kanban_data");
    const kanbanData: KanbanData = JSON.parse(storage || "{}");

    if (storage) {
      setKanbanLists(() => kanbanData.cards);
    } else {
      const holder: KanbanData = {
        globalIds: { itemId: 0, cardId: 0 },
        cards: kanbanLists,
      };
      localStorage.setItem("kanban_data", JSON.stringify(holder));
    }
  }, []);

  return (
    <div className="template bg-slate-100 relative">
      {/* ====================== header ====================== */}
      <ProjectHeader title="Kanban " />

      {/* ================ side bar ================ */}
      <KanbanSideBar setKanbanLists={setKanbanLists} />
      {/* ================ dashboard ================ */}
      <div className="template_dashboard p-1 grid grid-cols-4 tablet-lg:grid-cols-3 tablet-sm:grid-cols-2 mobile:flex mobile:flex-col mobile:items-center  gap-2 content-start overflow-y-auto overflow-hidden">
        {kanbanLists.map((i) => (
          <KbCard kanbanLists={kanbanLists} key={i.id} setKanbanLists={setKanbanLists} cardData={i} />
        ))}
      </div>
    </div>
  );
}
