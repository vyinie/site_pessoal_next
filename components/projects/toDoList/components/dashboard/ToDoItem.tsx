"use client";
import "../../styles.css";
import { Dispatch, SetStateAction, useState } from "react";
import { TDList, ToDoItem, ToDoListData } from "@/functions/interfaces";
import { ToDoItemEditor } from "./EditPopUp";
import {
  DelBtn,
  EditBtn,
} from "@/components/projects/components/global/buttons";
/** key do localStorage */
const defaultStorage = "to_do_list_data";

/** item */
export default function ToDoItemComp({
  to_do_item,
  mainList,
  currentList,
  listIndex,
  setMainList,
}: {
  listIndex: number;
  to_do_item: ToDoItem;
  currentList: ToDoItem[];
  mainList: TDList[];
  setMainList: Dispatch<SetStateAction<TDList[]>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  /** salva os items  feitos */
  function checkItem() {
    const h = localStorage.getItem(defaultStorage) || "{}";
    const old_to_do_data: ToDoListData = JSON.parse(h);

    const index = currentList.findIndex((i) => i.id === to_do_item.id);
    currentList[index].done = !currentList[index].done;

    const newListData: ToDoListData = { ...old_to_do_data, lists: mainList };

    localStorage.setItem(defaultStorage, JSON.stringify(newListData));
  }

  /** deleta esse item */
  function delItem() {
    const json = localStorage.getItem(defaultStorage) || "{}";
    const old_to_do_data: ToDoListData = JSON.parse(json);

    const newList = currentList.filter((i) => i.id !== to_do_item.id);
    old_to_do_data.lists[listIndex].list = newList;

    setMainList(() => old_to_do_data.lists);

    localStorage.setItem(defaultStorage, JSON.stringify(old_to_do_data));
  }

  /** edita esse item */
  function editItem() {
    const json = localStorage.getItem(defaultStorage) || "{}";
    const old_to_do_data: ToDoListData = JSON.parse(json);

    const index = currentList.findIndex((i) => i.id === to_do_item.id);

    //mó trampo pra o ts não chorar
    const newText = document.getElementById(
      `to_do_edit_inp${to_do_item.id}`
    ) as HTMLInputElement;

    // troca o texto original
    currentList[index].text = newText.value;

    localStorage.setItem(
      defaultStorage,
      JSON.stringify({ ...old_to_do_data, lists: mainList })
    );

    setIsOpen(() => false);
    newText.value = "";
  }

  return (
    <div className="to_do_item relative z-0" title={to_do_item.text}>
      <ToDoItemEditor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editToDo={editItem}
        item={to_do_item}
      />
      <input
        defaultChecked={to_do_item.done}
        onChange={checkItem}
        type="checkbox"
        id={`to_do_check_${to_do_item.id}`}
      />
      <label
        htmlFor={`to_do_check_${to_do_item.id}`}
        className="w-full h-full flex items-center overflow-hidden whitespace-nowrap text-ellipsis"
      >
        <p className="text-ellipsis max-w-full overflow-hidden">
          {to_do_item.text}
        </p>
      </label>
      <EditBtn setToggle={setIsOpen} />
      <DelBtn func={delItem} />
    </div>
  );
}
