"use client";
import { SetStateAction, useState } from "react";
import { DelBtn, EditBtn } from "../../components/global/buttons";
import "../styles.css";
import { ToDoItem, ToDoListData } from "@/functions/interfaces";
import { ToDoItemEditor } from "./EditPopUp";
/** key do localStorage */
const defaultStorage = "to_do_list_data";

/** item */
export default function ToDoItemComp({
  to_do_item,
  setMainList,
}: {
  to_do_item: ToDoItem;
  setMainList: (v: SetStateAction<ToDoItem[]>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  /** salva os items  feitos */
  function checkItem() {
    const json = localStorage.getItem(defaultStorage) || "{}";
    const list_data: ToDoListData = JSON.parse(json);

    const index = list_data.lists.findIndex((i) => i.id === to_do_item.id);

    list_data.lists[index].done = !list_data.lists[index].done;
    localStorage.setItem(defaultStorage, JSON.stringify(list_data));
  }

  /** deleta esse item */
  function delItem() {
    const json = localStorage.getItem(defaultStorage) || "{}";
    const list_data: ToDoListData = JSON.parse(json);
    const newList = list_data.lists.filter((i) => i.id !== to_do_item.id);

    localStorage.setItem(
      defaultStorage,
      JSON.stringify({ ...list_data, lists: newList })
    );
    setMainList(() => newList);
  }

  /** edita esse item */
  function editItem() {
    const json = localStorage.getItem(defaultStorage) || "{}";
    const list_data: ToDoListData = JSON.parse(json);

    const index = list_data.lists.findIndex((i) => i.id === to_do_item.id);

    //mó trampo pra o ts não chorar
    const newText = document.getElementById(
      `to_do_edit_inp${to_do_item.id}`
    ) as HTMLInputElement;

    // troca o texto original
    list_data.lists[index].text = newText.value;

    localStorage.setItem(defaultStorage, JSON.stringify(list_data));
    setMainList(() => list_data.lists);
    setIsOpen(() => false);
    newText.value = "";
  }

  return (
    <div className="to_do_item relative z-0">
      <ToDoItemEditor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editToDo={editItem}
        id={to_do_item.id}
      />
      <input
        defaultChecked={to_do_item.done}
        onChange={checkItem}
        type="checkbox"
        id={`to_do_check_${to_do_item.id}`}
      />
      <label
        htmlFor={`to_do_check_${to_do_item.id}`}
        className="w-full h-full flex items-center overflow-hidden"
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
