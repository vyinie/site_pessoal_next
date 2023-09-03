"use client";

import { accessibility } from "@/functions/accessibilityFunctions";
import { SetBoo } from "@/functions/interfaces";
import { CommonBtn } from "./buttons";
import { useEffect } from "react";

const Access = new accessibility();

/** pop up com wrapper basico */
export function PopUpWrapper({
  isOpen,
  setIsOpen,

  children,
  className,
}: {
  isOpen: boolean;
  setIsOpen: SetBoo;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      onClick={(e) => Access.closeWrapper(e, setIsOpen)}
      className={`${isOpen ? "flex" : "hidden"} common_wrapper close-on-click`}
    >
      <div
        className={`${className} max-w-[95vw] max-h-[80vh] rounded bg-white overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  );
}

/** popover simples, precisa de um relative parent */
export function PopOverInpInline({
  isOpen,
  setIsOpen,
  func,
  defaultValue,
  id,
  placeholder,
}: {
  isOpen: boolean;
  setIsOpen: SetBoo;

  func: () => void;

  defaultValue: string;
  id: string;
  placeholder: string;
}) {
  useEffect(() => {
    if (isOpen) document.getElementById(id)?.focus();
  }, [isOpen]);
  return (
    <div
      onKeyDown={(e) => Access.enterAct(e, func)}
      onMouseLeave={() => setIsOpen(() => false)}
      className={`${
        isOpen ? "flex" : "hidden"
      } w-full h-full p-0.5 rounded-md bg-white items-center gap-1 absolute top-0 left-0 z-10`}
    >
      <input
        defaultValue={defaultValue}
        autoFocus={isOpen}
        type="text"
        placeholder={placeholder}
        id={id}
        className="w-full h-full pl-1 rounded-md outline-none border border-neutral-600"
      />
      <CommonBtn
        text={placeholder}
        className="h-full bg-green-500 hover:bg-green-600 py-1 px-2"
        ActFunc={func}
      />
    </div>
  );
}
