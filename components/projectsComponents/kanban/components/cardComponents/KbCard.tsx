"use client";

import { KanbanCard, KanbanData } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import KbItem from "../itemComponents/KbItem";
import KbAddItemPopUp from "./KbAddItemPopUp";
import KbCardMoreOpts from "./KbCardMoreOpts";
import { AddBtn } from "@/components/projectsComponents/components/global/buttons";
import { PopOverInpInline } from "@/components/projectsComponents/components/global/PopUps";

const kanbanStorageName = "kanban_data";
const KbCard = ({
  cardData,

  kanbanLists,
  setKanbanLists,

  classname,
}: {
  cardData: KanbanCard;

  kanbanLists: KanbanCard[];
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;

  classname?: string;
}) => {
  const [addItemToggle, setAddItemToggle] = useState(false);
  const [editTitleToggle, setEditTitleToggle] = useState(false);

  //
  function delCard() {
    // pega os dados salvos
    const holder = localStorage.getItem(kanbanStorageName) || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    KanbanData.cards = KanbanData.cards.filter((i) => i.id !== cardData.id);

    setKanbanLists(() => KanbanData.cards);
    localStorage.setItem(kanbanStorageName, JSON.stringify(KanbanData));
  }

  function openAddItemInp() {
    setAddItemToggle((old) => !old);
    document.getElementById(`card_add_item${cardData.id}`)?.focus();
  }

  function editCardTitle() {
    const holder = localStorage.getItem(kanbanStorageName) || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    // index desse card
    const cardIndex = KanbanData.cards.findIndex((i) => i.id === cardData.id);

    const inp = document.getElementById(`kanban_edit_card${cardData.id}`);

    // @ts-ignore
    if (inp?.value) {
      // @ts-ignore
      KanbanData.cards[cardIndex].name = inp?.value;

      setKanbanLists(() => KanbanData.cards);
      localStorage.setItem("kanban_data", JSON.stringify(KanbanData));

      // @ts-ignore
      inp.value = "";
    }
  }

  return (
    <div
      style={{ backgroundColor: cardData.color.bg }}
      className={`${
        classname || ""
      } min-w-[190px] max-h-[300px]  h-fit w-full rounded-md p-1 pt-0 flex flex-col items-center relative`}
    >
      {/* header */}
      <div className="h-10 w-full pl-1 grid grid-cols-6 place-items-center relative">
        <p
          className={`${cardData.color.text} col-start-1 col-end-5 w-full text-xl  capitalize text-ellipsis whitespace-nowrap overflow-hidden`}
        >
          {cardData.name}
        </p>
        {/* btn que abre o pop-up pra add itens */}
        <AddBtn
          func={openAddItemInp}
          className="col-start-5 col-end-5"
          rounded
        />
        <KbCardMoreOpts delCard={delCard} setEditToggle={setEditTitleToggle} />

        <KbAddItemPopUp
          isOpen={addItemToggle}
          setIsOpen={setAddItemToggle}
          cardData={cardData}
          setKanbanLists={setKanbanLists}
        />
        <PopOverInpInline
          defaultValue={cardData.name}
          func={editCardTitle}
          id={`kanban_edit_card${cardData.id}`}
          isOpen={editTitleToggle}
          setIsOpen={setEditTitleToggle}
          placeholder="Editar"
        />
      </div>

      {/* items */}
      <div className="w-full h-fit grid gap-1 overflow-hidden overflow-y-auto">
        {cardData.items.map((i) => (
          <KbItem
            key={`kanban_item${i.id}`}
            item={i}
            cardData={cardData}
            kanbanLists={kanbanLists}
            setKanbanLists={setKanbanLists}
          />
        ))}
      </div>
    </div>
  );
};

export default KbCard;
