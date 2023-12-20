import { KanbanCard, KanbanData } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";
import { accessibility } from "@/functions/accessibilityFunctions";
import { verifiers } from "@/functions/verifyers";
import { CommonBtn } from "@/components/projectsComponents/components/global/buttons";

const Access = new accessibility();
const Verifiers = new verifiers();

export default function KbAddItemPopUp({
  cardData,
  setKanbanLists,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cardData: KanbanCard;
  setKanbanLists: Dispatch<SetStateAction<KanbanCard[]>>;
}) {
  function addItem() {
    // pega os dados salvos
    const holder = localStorage.getItem("kanban_data") || "{}";
    const KanbanData: KanbanData = JSON.parse(holder);

    // index desse card
    const cardIndex = KanbanData.cards.findIndex((i) => i.id === cardData.id);

    //pega o texto de input
    const text = document.getElementById(`card_add_item${cardData.id}`);

    // add o item à lista
    //@ts-ignore
    if (Verifiers.InpChecker(text?.value)) {
      KanbanData.cards[cardIndex].items.push({
        id: KanbanData.globalIds.itemId,
        // @ts-ignore
        text: text?.value,
      });
      setKanbanLists(() => KanbanData.cards);

      // muda o id dos itens
      KanbanData.globalIds.itemId++;

      // salva a nova lista
      localStorage.setItem("kanban_data", JSON.stringify(KanbanData));

      // limpa o input
      // @ts-ignore
      text.value = "";
      // verifica se o keepOpen está ativo
      const keepOpen: boolean = document.getElementById(
        `card_keep_open${cardData.id}`
        //@ts-ignore
      )?.checked;

      //fecha o pop up
      if (!keepOpen) {
        setIsOpen(() => false);
      }
    }
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(() => false)}
        className={`${
          isOpen ? "fixed" : "hidden"
        } top-0 right-0 z-10 w-screen h-screen close-on-click`}
      ></div>
      <div
        className={`${
          isOpen ? "border-2 border-neutral-400 p-1" : "h-0"
        } w-full overflow-hidden bg-white rounded grid gap-2 place-items-center absolute top-full z-10 transition-all`}
      >
        <input
          placeholder="nome do item"
          type="text"
          id={`card_add_item${cardData.id}`}
          onKeyDown={(e) => Access.enterAct(e, addItem)}
          className="w-full h-10 border-2 border-neutral-400 text-xl outline-none rounded-md pl-2 "
        />
        <div className="flex gap-2 items-center justify-self-start">
          <input type="checkbox" id={`card_keep_open${cardData.id}`} />
          <label htmlFor={`card_keep_open${cardData.id}`}>manter aberto</label>
        </div>

        <CommonBtn
          text="Adicionar"
          ActFunc={addItem}
          className="w-full bg-green-500 hover:bg-green-600 py-2 px-3"
        />
      </div>
    </>
  );
}
