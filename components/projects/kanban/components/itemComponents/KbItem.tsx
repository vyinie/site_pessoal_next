import { KanbanCard, KanbanData, KanbanItem } from "@/functions/interfaces";

import { Dispatch, SetStateAction,  useState } from "react";
import KbItemSwitchPopUp from "../cardComponents/KbItemSwitchPopUp";
import { accessibility } from "@/functions/accessibilityFunctions";
import { verifiers } from "@/functions/verifyers";
import { DelEditPopOver, SwitchArrowsBtn, ThreeDotsBtn } from "@/components/projects/components/global/buttons";
import { PopOverInpInline } from "@/components/projects/components/global/PopUps";

const Access = new accessibility();
const Verifiers = new verifiers();

export default function KbItem({
  item,
  cardData,

  kanbanLists,
  setKanbanLists,
}: {
  item: KanbanItem;
  cardData: KanbanCard;
  kanbanLists: KanbanCard[];
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;
}) {
  /** state do pop over dos botões de delete e edição */
  const [itemOptsToggle, setItemOptsToggle] = useState(false);

  /** state do pop up de realocação do item */
  const [switchPopup, setSwitchPopup] = useState(false);

  /** state do pop over de edição do item */
  const [editPopUpToggle, setEditPopUpToggle] = useState(false);

  /** abre o pop over de mais opições */
  function openMoreOpts(e) {
    Access.handlerWrapper(e, setItemOptsToggle);
  }

  /** abre o pop up de realocação do item */
  function openSwitchPopup(e) {
    Access.handlerWrapper(e, setSwitchPopup);
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

  function editItem() {
    const holder = localStorage.getItem("kanban_data") || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    // index do card
    const cardIndex = KanbanData.cards.findIndex((i) => i.id === cardData.id);

    // index do item
    const itemIndex = KanbanData.cards[cardIndex].items.findIndex(
      (i) => i.id === item.id
    );

    const newText = document.getElementById(
      `kanban_edit_item${item.id}`
      //@ts-ignore
    )?.value;
    if (Verifiers.InpChecker(newText)) {
      KanbanData.cards[cardIndex].items[itemIndex].text = newText;

      setKanbanLists(() => KanbanData.cards);

      localStorage.setItem("kanban_data", JSON.stringify(KanbanData));

      setEditPopUpToggle(() => false);
    }
  }


  return (
    <div className="w-full h-10 pl-2 rounded bg-white  text-xl bg_hover grid grid-cols-6 place-items-center relative">
      <p
        title={item.text}
        className="capitalize col-start-1 col-end-5 w-full text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {item.text}
      </p>

      <div className="col-start-5 col-end-5">
        <SwitchArrowsBtn rounded="full" func={openSwitchPopup} />
      </div>
      <div className="col-start-6 col-end-6">
        <ThreeDotsBtn isOn={itemOptsToggle} func={openMoreOpts} standing>
          <DelEditPopOver
            delFunc={delItem}
            setEditToggle={setEditPopUpToggle}
            optsToggle={itemOptsToggle}
            setOptsToggle={setItemOptsToggle}
            layed
            center
          />
        </ThreeDotsBtn>
      </div>
      <KbItemSwitchPopUp
        kanbanLists={kanbanLists}
        setKanbanLists={setKanbanLists}
        itemData={item}
        currentCard={cardData}
        isOpen={switchPopup}
        setIsOpen={setSwitchPopup}
      />
      <PopOverInpInline
        isOpen={editPopUpToggle}
        setIsOpen={setEditPopUpToggle}
        defaultValue={item.text}
        id={`kanban_edit_item${item.id}`}
        placeholder="Editar"
        func={editItem}
      />
    </div>
  );
}
