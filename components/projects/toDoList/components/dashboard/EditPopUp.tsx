"use client";
import { useEffect } from "react";
import { accessibility } from "@/functions/accessibilityFunctions";
import { SetBoo, ToDoItem } from "@/functions/interfaces";
import { CommonBtn } from "@/components/projects/components/global/buttons";

const Access = new accessibility();

export function ToDoItemEditor({
  isOpen,
  setIsOpen,
  editToDo,
  item,
}: {
  isOpen: boolean;
  editToDo: () => void;
  item: ToDoItem;
  setIsOpen: SetBoo;
}) {
  function keyboardActs(e) {
    Access.enterAct(editToDo, e);
    Access.closeEsc(e, setIsOpen);
  }

  useEffect(() => {
    if (isOpen) document.getElementById(`to_do_edit_inp${item.id}`)?.focus();
  }, [isOpen]);

  return (
    <div
      onKeyDown={keyboardActs}
      onMouseLeave={() => setIsOpen(() => false)}
      className={`${
        isOpen ? "flex" : "hidden"
      } w-full h-full rounded-md bg-white items-center absolute top-0 left-0 z-10`}
    >
      <input
      defaultValue={item.text}
        autoFocus={isOpen}
        type="text"
        placeholder="Editar"
        id={`to_do_edit_inp${item.id}`}
        className="w-full h-full pl-1 rounded-md outline-none "
      />
      <CommonBtn text="Editar" ActFunc={editToDo} />
    </div>
  );
}
