"use client";
import { KanbanCard, KanbanData, SetBoo } from "@/functions/interfaces";
import { PopUpWrapper } from "../../../components/global/PopUps";
import { CommonInp } from "../../../components/global/inputs";
import { Dispatch, SetStateAction, useState } from "react";
import { dataHandlers } from "@/functions/dataHandlers";
import { CommonBtn } from "../../../components/global/buttons";
import { verifiers } from "@/functions/verifyers";
import KbCard from "../cardComponents/KbCard";
const DataHandlers = new dataHandlers();
const Verifiers = new verifiers();

export default function KbAddCardPopUp({
  addCardPopupToggle,
  setAddCardPopupToggle,
  setKanbanLists,
}: {
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;

  addCardPopupToggle: boolean;
  setAddCardPopupToggle: SetBoo;
}) {
  const [newCardData, setNewCardData] = useState<KanbanCard>({
    name: "",
    id: "cardExmple",
    items: [
      { id: 99996, text: "exemplo" },
      { id: 99997, text: "exemplo" },
    ],
    color: { bg: "#2baa95", text: "text-white" },
  });

  const [cardListTest, setCardListTest] = useState([newCardData]);

  function getData(e) {
    if (e.target.name !== "name") {
      setNewCardData((old) => ({
        ...old,
        color: { ...old.color, [e.target.name]: e.target.value },
      }));
    } else {
      DataHandlers.getData(e, setNewCardData);
    }
  }

  function addCard() {
    if (Verifiers.ObjChecker(newCardData)) {
      const holder = localStorage.getItem("kanban_data") || "{}";
      const KanbanData: KanbanData = JSON.parse(holder);

      KanbanData.cards.push({
        ...newCardData,
        id: `card${KanbanData.globalIds.cardId}`,
        items: [],
      });
      KanbanData.globalIds.cardId++;

      setKanbanLists(() => KanbanData.cards);
      localStorage.setItem("kanban_data", JSON.stringify(KanbanData));

      setNewCardData((old) => ({
        ...old,
        name: "",
        color: { bg: "#2baa95", text: "text-white" },
      }));

      setAddCardPopupToggle(() => false);
    }
  }

  return (
    <PopUpWrapper isOpen={addCardPopupToggle} setIsOpen={setAddCardPopupToggle}>
      <div
        onChange={getData}
        className="w-full max-w-[300px] p-2 h-full grid gap-3"
      >
        <CommonInp
          inpValue={newCardData.name}
          name="name"
          placeholder="Nome Do Card"
          type="text"
          h="h-12"
        />
        <div className="flex items-center gap-2 text-xl capitalize justify-center bg-gray-200 hover:bg-gray-300 rounded py-1 cursor-pointer relative">
          <input
            className="w-10 h-8 rounded border-none outline-none bg-transparent"
            type="color"
            name="bg"
            id="kanban_inp_color"
            value={newCardData.color.bg}
            onChange={() => {}}
          />
          <p> escolher cor</p>
          <label htmlFor="kanban_inp_color" className="kase"></label>
        </div>
        <div>
          <p className="text-xl font-bold text-center">cor do titulo</p>
          <div className="flex items-center gap-2 justify-center">
            <input
              type="radio"
              name="text"
              id="kanban_text_color_black"
              value={"text-black"}
            />
            <label htmlFor="kanban_text_color_black">texto preto</label>

            <input
              type="radio"
              defaultChecked
              name="text"
              value={"text-white"}
              id="kanban_text_color_white"
            />
            <label htmlFor="kanban_text_color_white">texto branco</label>
          </div>
        </div>
        <CommonBtn ActFunc={addCard} text="Adicionar" />

        <div className="relative">
          <div className="w-full h-full absolute z-[1]"></div>
          <KbCard
            kanbanLists={[]}
            classname="max-w-full"
            cardData={newCardData}
            setKanbanLists={setCardListTest}
          />
        </div>
      </div>
    </PopUpWrapper>
  );
}
