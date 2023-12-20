"use client";
import { KanbanCard, KanbanData } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { accessibility } from "@/functions/accessibilityFunctions";
import KbAddCardPopUp from "./KbAddCardPopUp";
import { HamburgerBtn } from "@/components/projectsComponents/components/global/buttons";

const Access = new accessibility();

export default function KanbanSideBar({
  setKanbanLists,
}: {
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;
}) {
  // abre a side bar do mobile
  const [sideBarToggle, setSideBarToggle] = useState(false);
  // abre o popup para add um card
  const [addCardPopupToggle, setAddCardPopupToggle] = useState(false);

  // ================ abre o pop para add card ================
  function openAddCardPopup() {
    setAddCardPopupToggle((old) => !old);
    setTimeout(() => {
      document.getElementsByName("name")[0].focus();
    }, 200);
  }
  // ================ deleta todos os cards adicionados ================

  function delAllCards() {
    const holder = localStorage?.getItem("kanban_data") || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    KanbanData.cards = [];
    KanbanData.globalIds.cardId = 0;

    setKanbanLists(() => KanbanData.cards);
    localStorage.setItem("kanban_data", JSON.stringify(KanbanData));
  }

  // ================ deleta todos os itens de todos os cards ================
  function delAllItems() {
    const holder = localStorage?.getItem("kanban_data") || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    const newKanbanList = KanbanData.cards.map((i) => ({ ...i, items: [] }));

    KanbanData.cards = newKanbanList;
    KanbanData.globalIds.itemId = 0;

    setKanbanLists(() => newKanbanList);

    localStorage.setItem("kanban_data", JSON.stringify(KanbanData));
  }

  const btns = [
    {
      name: "adicionar card",
      id: 0,
      color: "hover:bg-emerald-500 hover:text-white",
      func: openAddCardPopup,
    },
    {
      name: "deletar todos os cards",
      id: 1,
      color: "hover:bg-red-500 hover:text-white",
      func: delAllCards,
    },
    {
      name: "deletar todos os items",
      id: 2,
      color: "hover:bg-red-500 hover:text-white",
      func: delAllItems,
    },
  ];
  return (
    <>
      <div className="hidden moblet:flex fixed top-[10px] right-2 h-fit w-fit">
        <HamburgerBtn func={() => setSideBarToggle((old) => !old)} />
      </div>

      <KbAddCardPopUp
        setKanbanLists={setKanbanLists}
        addCardPopupToggle={addCardPopupToggle}
        setAddCardPopupToggle={setAddCardPopupToggle}
      />

      <div
        onClick={(e) => Access.closeWrapper(e, setSideBarToggle)}
        className={`${
          sideBarToggle
            ? "moblet:z-10 moblet:opacity-100"
            : "moblet:-z-10 moblet:opacity-0 "
        } side_bar_wrapper close-on-click`}
      >
        <div
          className={`${
            sideBarToggle ? "moblet:ml-0" : "moblet:-ml-20"
          } template_side_bar border-r-2 border-neutral-600 grid place-items-center gap-2 text-xl justify-center content-start bg-slate-100 transition-all`}
        >
          {btns.map((i) => (
            <button
              onClick={i.func}
              key={`kanban_side_bar_btn${i.id}`}
              className={`${i.color} w-full py-1 bg-zinc-200  transition rounded capitalize close-on-click`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
