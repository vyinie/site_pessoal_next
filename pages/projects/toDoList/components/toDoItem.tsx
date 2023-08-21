"use client";
import { SetStateAction, useState } from "react";
import { CommonBtn, DelBtn, EditBtn } from "../../components/global/buttons";
import "../styles.css";
import { ToDoItem } from "@/functions/interfaces";
import { accessibility } from "@/functions/accessibilityFunctions";

const Access = new accessibility();
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
    const newText = (
      document.getElementById(
        `to_do_edit_inp${to_do_item.id}`
      ) as HTMLInputElement
    ).value;

    list[index].text = newText;

    localStorage.setItem("to_do_list", JSON.stringify(list));
    setMainList(() => list);
    setIsOpen(() => false);
  }

  return (
    <div className="to_do_item relative">
      <EditInp
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
export function EditInp({
  isOpen,
  setIsOpen,
  editToDo,
  id,
}: {
  isOpen: boolean;
  editToDo: () => void;
  id: number;
  setIsOpen: (v: SetStateAction<boolean>) => void;
}) {
  return (
    <div
      onMouseLeave={() => setIsOpen(() => false)}
      className={`${
        isOpen ? "flex" : "hidden"
      } w-full h-full gap-1 items-center bg-black absolute top-0 left-0 z-10`}
    >
      <input
        type="text"
        placeholder="Editar"
        id={`to_do_edit_inp${id}`}
        className="w-full h-full pl-1"
      />
      <CommonBtn text="Editar" ActFunc={editToDo} />
    </div>
  );
}
