import { Dispatch, SetStateAction, useState } from "react";

import ToDoArrowBtn from "./ToDoArrowBtn";
import ToDoForm from "./ToDoForm";
import ToDoItemComp from "./ToDoItem";
import ToDoListMoreOpt from "./ToDoMoreOpt";

import { TDList, ToDoItem, ToDoListData } from "@/functions/interfaces";

import { accessibility } from "@/functions/accessibilityFunctions";
import { verifiers } from "@/functions/verifyers";
import { ThreeDotsBtn } from "@/components/projectsComponents/components/global/buttons";
import { ArrowForwardIos } from "@mui/icons-material";

const verifier = new verifiers();
const Access = new accessibility();

export default function ToDoDashboard({
  mainList,
  setMainList,

  newToDo,
  setNewToDo,

  verticalList,
  setverticalList,

  currentList,
  listIndex,
}: {
  mainList: TDList[];
  setMainList: Dispatch<SetStateAction<TDList[]>>;

  newToDo: ToDoItem;
  setNewToDo: Dispatch<SetStateAction<ToDoItem>>;

  verticalList: boolean;
  setverticalList: Dispatch<SetStateAction<boolean>>;

  currentList: ToDoItem[];
  listIndex: number;
}) {
  //
  const [toDoMoreOptToggle, setToDoMoreOptToggle] = useState(false);

  /** add um novo item e salva a nova lista */
  function addNewToDo() {
    if (verifier.ObjChecker(newToDo)) {
      /* add o novo item na lista selecionada */
      currentList.push(newToDo);

      // reseta o form
      setNewToDo((old) => ({ ...old, id: old.id + 1, text: "" }));

      saveData(true);
    }
  }

  /** salva os dados no localStorage */
  function saveData(sumId?: boolean) {
    const holder = localStorage.getItem("to_do_list_data") || "{}";
    const ListData: ToDoListData = JSON.parse(holder);

    // holder pra definir os novos dados
    const newListData: ToDoListData = sumId
      ? {
          globalIds: ListData.globalIds + 1,
          verticalList: verticalList,
          lists: mainList,
        }
      : {
          ...ListData,
          lists: mainList,
        };

    // salva os novos dados
    localStorage.setItem("to_do_list_data", JSON.stringify(newListData));
  }
  return (
    <div className="template_dashboard flex flex-col items-center">
      {/* form */}
      <div className="flex gap-2 items-center mt-4 exept-mobile:translate-x-5">
        <ToDoForm
          newToDo={newToDo}
          setNewToDo={setNewToDo}
          addNewItem={addNewToDo}
        />
        <ThreeDotsBtn
          func={() => setToDoMoreOptToggle((old) => !old)}
          className="h-fit mobile-sm:hidden"
          standing
          isOn={toDoMoreOptToggle}
        >
          <ToDoListMoreOpt
            currentList={mainList[listIndex]?.list}
            isOpen={toDoMoreOptToggle}
            setIsOpen={setToDoMoreOptToggle}
            vert={verticalList}
            setVert={setverticalList}
            listIndex={listIndex}
            setMainList={setMainList}
          />
        </ThreeDotsBtn>
      </div>

      {/* table */}
      <div
        className={`${
          verticalList ? "pr-1" : ""
        }  relative mt-4 p-2 rounded-md bg-white`}
      >
        <div
          className={`list 
          moblet:grid moblet:overflow-y-auto
          ${
            verticalList
              ? "desktop:overflow-y-auto desktop:grid laptop:overflow-y-auto laptop:grid pr-1"
              : "desktop:overflow-x-auto desktop:flex desktop:flex-col desktop:flex-wrap  laptop:overflow-x-auto laptop:flex laptop:flex-col laptop:flex-wrap"
          } h-fit  pb-1 min-w-[290px] max-w-[584px] max-h-[70vh] overflow-hidden justify-center items-center gap-1 scroll-smooth `}
        >
          {currentList?.map((i) => (
            <ToDoItemComp
              listIndex={listIndex}
              key={`to_do_item${i.id}`}
              mainList={mainList}
              to_do_item={i}
              currentList={currentList}
              setMainList={setMainList}
            />
          ))}
        </div>
        <ToDoArrowBtn
          className={`${verticalList ? "hidden" : "flex"}`}
        />
        <ToDoArrowBtn
          className={`${verticalList ? "hidden" : "flex"}`}
          left
        />
      </div>
    </div>
  );
}
