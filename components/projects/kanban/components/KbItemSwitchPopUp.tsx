import { accessibility } from "@/functions/accessibilityFunctions";
import { KanbanCard, KanbanData, KanbanItem } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";

const Access = new accessibility();
export default function KbItemSwitchPopUp({
  itemData,
  currentCard,

  setKanbanLists,

  isOpen,
  setIsOpen,
}: {
  itemData: KanbanItem;
  currentCard: KanbanCard;

  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;

  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const holder = localStorage.getItem("kanban_data");
  const cardList: KanbanData = JSON.parse(holder || "{}");

  function switchItem(chosenCard: KanbanCard) {
    //index do card atual
    const currentCardIndex = cardList.cards.findIndex(
      (i) => currentCard.id === i.id
    );

    //index do card escolhido
    const chosenCardIndex = cardList.cards.findIndex(
      (i) => chosenCard.id === i.id
    );

    const newCurrentCard = currentCard.items.filter((i) => i !== itemData);

    cardList.cards[currentCardIndex].items = newCurrentCard;
    cardList.cards[chosenCardIndex].items.push(itemData);

    setKanbanLists(() => cardList.cards);
    localStorage.setItem("kanban_data", JSON.stringify(cardList));
  }

  return (
    <div
      onClick={(e) => Access.closeWrapper(e, setIsOpen)}
      className={`${isOpen ? "fixed" : "hidden"} common_wrapper close-on-click`}
    >
      <div className="min-w-[200px] max-w-[90vw] min-h-[50px] max-h-[90vh] h-fit w-fit p-2 bg-slate-100 rounded-md flex flex-wrap gap-2">
        {cardList.cards?.map((i) => (
          <div
            key={`kanbam_card_switch${i.id}`}
            style={{ backgroundColor: i.color }}
            className="min-w-[90px] p-2 text-center rounded-md cursor-pointer opacity-80 hover:opacity-100 close-on-click"
            onClick={() => switchItem(i)}
          >
            {i.name}
          </div>
        ))}
      </div>
    </div>
  );
}
