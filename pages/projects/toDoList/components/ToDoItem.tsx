"use client";
import { SetStateAction, useState } from "react";
import { DelBtn, EditBtn } from "../../components/global/buttons";
import "../styles.css";
import { ToDoItem } from "@/functions/interfaces";
import { ToDoItemEditor } from "./EditPopUp";

export default function ToDoItemComp({
  to_do_item,
  setMainList,
}: {
  to_do_item: ToDoItem;
  setMainList: (v: SetStateAction<ToDoItem[]>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // salva os items completos
  function checkItem() {
    // @ts-ignore
    const list: ToDoItem[] = JSON.parse(localStorage.getItem("to_do_list"));
    const index = list.findIndex((i) => i.id === to_do_item.id);

    list[index].done = !list[index].done;
    localStorage.setItem("to_do_list", JSON.stringify(list));
  }

  // deleta esse item
  function delItem() {
    // @ts-ignore
    const list: ToDoItem[] = JSON.parse(localStorage.getItem("to_do_list"));
    const newList = list.filter((i) => i.id !== to_do_item.id);

    localStorage.setItem("to_do_list", JSON.stringify(newList));
    setMainList(() => newList);
  }

  // edita esse item
  function editItem() {
    // @ts-ignore
    const list: ToDoItem[] = JSON.parse(localStorage.getItem("to_do_list"));
    const index = list.findIndex((i) => i.id === to_do_item.id);

    //mó trampo pra o ts não chorar
    const newText = document.getElementById(
      `to_do_edit_inp${to_do_item.id}`
    ) as HTMLInputElement;

    list[index].text = newText.value;
    
    localStorage.setItem("to_do_list", JSON.stringify(list));
    setMainList(() => list);
    setIsOpen(() => false);
    newText.value = "";
  }

  return (
    <div className="to_do_item relative">
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
