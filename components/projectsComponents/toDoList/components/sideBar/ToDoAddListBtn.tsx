import {
  AddBtn,
  CommonBtn,
} from "@/components/projectsComponents/components/global/buttons";
import { TDList, ToDoListData } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useState } from "react";

export default function ToDoAddListBtn({
  setMainList,
  mainList,
}: {
  mainList: TDList[];
  setMainList: Dispatch<SetStateAction<TDList[]>>;
}) {
  const [newListName, setNewListName] = useState("");
  const [isNewListInpOpen, setIsNewListInpOpen] = useState(false);

  function openNewListInp() {
    setIsNewListInpOpen((old) => !old);
    if (!isNewListInpOpen) {
      document.getElementById("addNewListInp")?.focus();
    }
  }
  function addNewList() {
    if (mainList.some((list) => list.title === newListName)) {
      return alert("ja há uma lista com esse nome");
    }

    const newList = {
      title: newListName,
      list: [],
    };

    setMainList((old) => [...old, newList]);

    openNewListInp();
    setNewListName("");

    const toDoLocalData = localStorage.getItem("to_do_list_data");
    const holder_list: ToDoListData =
      toDoLocalData && JSON.parse(toDoLocalData);

    holder_list.lists.push(newList);
    localStorage.setItem("to_do_list_data", JSON.stringify(holder_list));
  }

  return (
    <div className="w-full relative flex justify-end mb-2">
      <div
        className={`${
          isNewListInpOpen ? "h-[36px]" : "h-0"
        } w-[190px] transition-all absolute flex z-10 top-full left-0 overflow-hidden `}
      >
        <input
          placeholder="Nome Da Lista"
          type="text"
          onChange={(e) => setNewListName(e.target.value)}
          value={newListName}
          id="addNewListInp"
          className="outline-none border-2 border-neutral-500 rounded w-full pl-1"
          onKeyDown={(key) => key.key === "Enter" && addNewList()}
        />
        <CommonBtn ActFunc={addNewList} text="add" />
      </div>

      <AddBtn
        className={`${isNewListInpOpen ? "rotate-45" : ""}`}
        func={openNewListInp}
        rounded
      />
    </div>
  );
}
