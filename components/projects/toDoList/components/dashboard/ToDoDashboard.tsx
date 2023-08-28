import { Dispatch, SetStateAction, useState } from "react";

import ToDoArrowBtn from "./ToDoArrowBtn";
import ToDoForm from "./ToDoForm";
import ToDoItemComp from "./ToDoItem";
import ToDoListMoreOpt from "./ToDoMoreOpt";

import { TDList, ToDoItem, ToDoListData } from "@/functions/interfaces";

import { verifiers } from "@/functions/verifyers";

const verifier = new verifiers();

export default function ToDoDashboard({
  mainList,
  setMainList,

  newToDo,
  setNewToDo,

  verticalList,
  setverticalList,

  listIndex,
}: {
  mainList: TDList[];
  setMainList: Dispatch<SetStateAction<TDList[]>>;

  newToDo: ToDoItem;
  setNewToDo: Dispatch<SetStateAction<ToDoItem>>;

  verticalList: boolean;
  setverticalList: Dispatch<SetStateAction<boolean>>;

  listIndex: number;
}) {
  //
  const [moreOptToggle, setMoreOptToggle] = useState(false);

  /** add um novo item e salva a nova lista */
  function addNewToDo() {
    if (verifier.ObjChecker(newToDo)) {
      /* add o novo item na lista selecionada */
      mainList[listIndex].list.push(newToDo);

      // reseta o form
      setNewToDo((old) => ({ ...old, id: old.id + 1, text: "" }));

      saveData();
    }
  }

  /** deleta todos os item da lista principal */
  function delAllItems() {
    /* verifica se há items marcados */
    const checkedItems = mainList[listIndex].list.some((i) => i.done);

    /* holder que pega os dados do local storage */
    const t = localStorage.getItem("to_do_list_data") || "{}";
    const oldMainList: ToDoListData = JSON.parse(t);

    if (checkedItems) {
      // nova lista sem os marcados
      const newList = mainList[listIndex].list.filter((i) => !i.done);
      mainList[listIndex].list = newList;
      //
    } else {
      // apaga a lista selecionada
      mainList[listIndex].list = [];
    }

    const newToDoData: ToDoListData = { ...oldMainList, lists: mainList };

    localStorage.setItem("to_do_list_data", JSON.stringify(newToDoData));
  }

  /**   salva os dados no localStorage */
  function saveData() {
    const holder = localStorage.getItem("to_do_list_data") || "{}";
    const ListData: ToDoListData = JSON.parse(holder);

    // holder pra definir os novos dados
    const newListData: ToDoListData = {
      globalIds: ListData.globalIds + 1,
      verticalList: verticalList,
      lists: mainList,
    };

    // salva os novos dados
    localStorage.setItem("to_do_list_data", JSON.stringify(newListData));
  }

  return (
    <div>
      <div className="template_dashboard flex flex-col items-center">
        {/* form */}
        <div className="flex gap-2 items-center mt-4 translate-x-5">
          <ToDoForm
            newToDo={newToDo}
            setNewToDo={setNewToDo}
            addNewItem={addNewToDo}
          />
          <ToDoListMoreOpt
            isOpen={moreOptToggle}
            setIsOpen={setMoreOptToggle}
            vert={verticalList}
            setVert={setverticalList}
            delAllItems={delAllItems}
          />
        </div>

        {/* table */}
        <div className={`relative mt-4 p-2 rounded-md bg-white`}>
          <div
            className={`list ${
              verticalList ? "overflow-y-auto" : "overflow-x-auto flex-wrap"
            } h-fit pb-1 min-w-[300px] max-w-[604px] max-h-[70vh] overflow-hidden flex flex-col justify-center items-center gap-1 scroll-smooth`}
          >
            {mainList[listIndex]?.list.map((i) => (
              <ToDoItemComp
                key={`to_do_item${i.id}`}
                mainList={mainList}
                to_do_item={i}
                listIndex={listIndex}
                currentList={mainList[listIndex].list}
                setMainList={setMainList}
              />
            ))}
          </div>
          <ToDoArrowBtn className={`${verticalList ? "hidden" : "flex"}`} />
          <ToDoArrowBtn
            className={`${verticalList ? "hidden" : "flex"}`}
            left
          />
        </div>
      </div>
    </div>
  );
}
