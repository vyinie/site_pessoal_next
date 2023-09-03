import { KanbanCard, KanbanData, KanbanItem } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";
import { PopUpWrapper } from "../../components/global/PopUps";

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
  const holder = localStorage?.getItem("kanban_data") || "{}";
  const cardList: KanbanData = JSON.parse(holder);

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
    <PopUpWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="flex flex-wrap gap-2 p-2"
    >
      {cardList &&
        cardList.cards.map((i) => (
          <div
            key={`kanbam_card_switch${i.id}`}
            style={{ backgroundColor: i.color.bg }}
            className={`${i.color.text} min-w-[90px] h-fit  p-2 text-center rounded-md cursor-pointer opacity-80 hover:opacity-100 close-on-click capitalize`}
            onClick={() => switchItem(i)}
          >
            {i.name}
          </div>
        ))}
    </PopUpWrapper>
  );
}
