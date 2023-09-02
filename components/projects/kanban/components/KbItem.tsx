import { KanbanCard, KanbanData, KanbanItem } from "@/functions/interfaces";
import {
  DelEditPopOver,
  MoreOptsBtn,
  SwitchArrowsBtn,
} from "../../components/global/buttons";
import { Dispatch, SetStateAction, useState } from "react";
import KbItemSwitchPopUp from "./KbItemSwitchPopUp";

export default function KbItem({
  item,
  cardData,

  switchItem,
  setKanbanLists,
}: {
  item: KanbanItem;
  cardData: KanbanCard;

  switchItem: () => void;
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;
}) {
  const [itemOptsToggle, setItemOptsToggle] = useState(false);
  const [switchPopup, setSwitchPopup] = useState(false);

  function handlerToggle() {
    setItemOptsToggle((old) => !old);
  }

  function delItem() {
    const holder = localStorage.getItem("kanban_data") || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);
    const cardIndex = KanbanData.cards.findIndex((i) => i.id === cardData.id);

    const newCardList = KanbanData.cards[cardIndex].items.filter(
      (i) => i.id !== item.id
    );

    KanbanData.cards[cardIndex].items = newCardList;
    setKanbanLists(() => KanbanData.cards);

    localStorage.setItem("kanban_data", JSON.stringify(KanbanData));
  }

  function openSwitchPopup() {
    setSwitchPopup((old) => !old);
  }
  return (
    <div className="w-full h-10 pl-2 rounded-sm bg-white text-ellipsis whitespace-nowrap text-xl bg_hover grid grid-cols-6 place-items-center">
      <p title={item.text} className="col-start-1 col-end-5 w-full ">
        {item.text}
      </p>

      <div className="col-start-5 col-end-5">
        <SwitchArrowsBtn rounded="full" func={openSwitchPopup} />
      </div>
      <div className="col-start-6 col-end-6">
        <MoreOptsBtn func={handlerToggle} type="dots" standing>
          <DelEditPopOver
            delFunc={delItem}
            setEditToggle={setItemOptsToggle}
            optsToggle={itemOptsToggle}
            setOptsToggle={setItemOptsToggle}
            layed
          />
        </MoreOptsBtn>
      </div>
      <KbItemSwitchPopUp
        setKanbanLists={setKanbanLists}
        itemData={item}
        currentCard={cardData}
        isOpen={switchPopup}
        setIsOpen={setSwitchPopup}
      />
    </div>
  );
}
