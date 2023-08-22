"use client";
import { SetStateAction, useEffect } from "react";
import { CommonBtn } from "../../components/global/buttons";
import { accessibility } from "@/functions/accessibilityFunctions";

const Access = new accessibility();

export function ToDoItemEditor({
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
  function keyboardActs(e) {
    Access.enterAct(editToDo, e);
    Access.closeEsc(e, setIsOpen);
  }
  
  useEffect(() => {
    if (isOpen) document.getElementById(`to_do_edit_inp${id}`)?.focus();
  }, [isOpen]);

  return (
    <div
      onKeyDown={keyboardActs}
      onMouseLeave={() => setIsOpen(() => false)}
      className={`${
        isOpen ? "flex" : "hidden"
      } w-full h-full rounded-lg items-center bg-white absolute top-0 left-0 z-10`}
    >
      <input
        autoFocus={isOpen}
        type="text"
        placeholder="Editar"
        id={`to_do_edit_inp${id}`}
        className="w-full h-full pl-1 outline-none "
      />
      <CommonBtn text="Editar" ActFunc={editToDo} />
    </div>
  );
}
