import {
  DelBtn,
  DirectionBtn,
  MarkAllBoxesBtn,
  UnmarkAllBoxesBtn,
} from "@/components/projects/components/global/buttons";

import { SetBoo, TDList, ToDoItem, ToDoListData } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";

/** className tira o absolute */
export default function ToDoListMoreOpt({
  className,
  currentList,

  vert,
  setVert,

  isOpen,
  setIsOpen,

  listIndex,

  setMainList,
  fontSize,
}: {
  fontSize?: string;
  className?: string;
  currentList: ToDoItem[];

  vert: boolean;
  setVert: SetBoo;

  isOpen?: boolean;
  setIsOpen?: SetBoo;
  listIndex: number;

  setMainList: Dispatch<SetStateAction<TDList[]>>;
}) {
  /** muda a posição do btn de direcionamento da lista */
  function handlerIcon() {
    const t: ToDoListData = JSON.parse(
      localStorage.getItem("to_do_list_data") || "{}"
    );
    const holder_list = {
      ...t,
      verticalList: !t.verticalList,
    };

    localStorage.setItem("to_do_list_data", JSON.stringify(holder_list));
  }

  function MarkAllItems() {
    currentList.map((i) => {
      if (!i.done) {
        const el = document.getElementById(`to_do_check_${i.id}`);
        el?.click();
      }
    });
  }

  function UnmarkAllItems() {
    currentList.map((i) => {
      if (i.done) {
        const el = document.getElementById(`to_do_check_${i.id}`);
        el?.click();
      }
    });
  }

  /** deleta todos os item da lista selecionada */
  function delAllItems() {
    /* verifica se há items marcados */
    const checkedItems = currentList.some((i) => i.done);

    /* holder que pega os dados do local storage */
    const t = localStorage.getItem("to_do_list_data") || "{}";
    const oldMainList: ToDoListData = JSON.parse(t);

    if (checkedItems) {
      // nova lista sem os marcados
      const newList = currentList.filter((i) => !i.done);

      oldMainList.lists[listIndex].list = newList;

      setMainList(() => oldMainList.lists);
      //
    } else {
      // apaga a lista selecionada
      oldMainList.lists[listIndex].list = [];
      setMainList(() => oldMainList.lists);
    }

    // holder pra definir os novos dados
    const newListData: ToDoListData = {
      ...oldMainList,
      lists: oldMainList.lists,
    };

    // salva os novos dados
    localStorage.setItem("to_do_list_data", JSON.stringify(newListData));
  }
  return (
    <div
      onMouseLeave={() => setIsOpen && setIsOpen(() => false)}
      className={`
      ${className || "absolute top-1/2 -translate-y-1/2 right-3/4"}
      ${
        isOpen ? "w-28 border tablet:w-[120px] mobile-lg:w-[120px] " : "w-0"
      } grid grid-cols-3 place-items-center bg-white rounded-md border-zinc-400 overflow-hidden mobile-sm:w-[144px] transition-all`}
    >
      {/* <DirectionBtn
        className="moblet:hidden"
        isVert={vert}
        setVert={setVert}
        func={handlerIcon}
      /> */}
      <DelBtn fontSize={fontSize} className="rounded-md" func={delAllItems} />
      <MarkAllBoxesBtn fontSize={fontSize} func={MarkAllItems} />
      <UnmarkAllBoxesBtn fontSize={fontSize} func={UnmarkAllItems} />
    </div>
  );
}
