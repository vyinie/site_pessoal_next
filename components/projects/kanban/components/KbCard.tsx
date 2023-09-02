"use client";

import { KanbanCard, KanbanData } from "@/functions/interfaces";
import KbCardMoreOpts from "./KbCardMoreOpts";
import { AddBtn } from "../../components/global/buttons";
import { Dispatch, SetStateAction, useState } from "react";
import KbItem from "./KbItem";
import KbAddItemPopUp from "./KbAddItemPopUp";

const kanbanStorageName = "kanban_data";
const KbCard = ({
  cardData,
  setKanbanLists,
}: {
  cardData: KanbanCard;
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;
}) => {
  const [addItemToggle, setAddItemToggle] = useState(false);

  //
  function delCard() {
    // pega os dados salvos
    const holder = localStorage.getItem(kanbanStorageName) || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    // index desse card
    const cardIndex = KanbanData.cards.findIndex((i) => i.id === cardData.id);

    KanbanData.cards[cardIndex].items = [];

    setKanbanLists(() => KanbanData.cards);
    localStorage.setItem(kanbanStorageName, JSON.stringify(KanbanData));
  }

  function openAddItemInp() {
    setAddItemToggle((old) => !old);
    document.getElementById(`card_add_item${cardData.id}`)?.focus();
  }

  function switchItem() {}

  return (
    <div
      style={{ backgroundColor: cardData.color }}
      className={`min-w-[190px] max-h-[300px]  h-fit w-full rounded-md p-1 pt-0 flex flex-col items-center`}
    >
      {/* header */}
      <div className="h-10 w-full grid grid-cols-6 place-items-center relative">
        <p className="col-start-1 col-end-5 w-full text-2xl text-center capitalize">
          {cardData.name}
        </p>
        <AddBtn
          func={openAddItemInp}
          rounded="full"
          className="col-start-5 col-end-5"
        />
        <KbCardMoreOpts delCard={delCard} />

        <KbAddItemPopUp
          isOpen={addItemToggle}
          setIsOpen={setAddItemToggle}
          cardData={cardData}
          setKanbanLists={setKanbanLists}
        />
      </div>

      {/* items */}
      <div className="w-full grid gap-1 overflow-hidden overflow-y-auto">
        {cardData.items.map((i) => (
          <KbItem
            key={`kanban_item${i.id}`}
            item={i}
            switchItem={switchItem}
            cardData={cardData}
            setKanbanLists={setKanbanLists}
          />
        ))}
      </div>
    </div>
  );
};

export default KbCard;
