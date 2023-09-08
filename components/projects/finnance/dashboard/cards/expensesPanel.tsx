"use client";

import { accessibility } from "@/functions/accessibilityFunctions";
import { SetBoo } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";
const Access = new accessibility();

export function ExpensesPanel({
  open,
  setOpen,
  setShowAllExpenses,
}: {
  open: boolean;
  setOpen: SetBoo;
  setShowAllExpenses: Dispatch<SetStateAction<boolean>>;
}) {
  function closePanel() {
    setOpen(() => false);
  }
  function setAllExpenses() {
    setShowAllExpenses((old) => true);
    closePanel();
  }
  function setNotesExpenses() {
    setShowAllExpenses((old) => false);
    closePanel();
  }
  return (
    <>
      <div
        onClick={(e) => Access.closeWrapper(e, setOpen)}
        className={`${
          open ? "block" : "hidden"
        } fixed top-0 left-0 z-[5] w-screen h-screen close-on-click`}
      ></div>

      <div
        className={`${
          open ? "w-40 h-32 border-2 p-2" : "w-0 h-0"
        } z-10 font-bold rounded-lg border-zinc-300 text-lg whitespace-nowrap bg-zinc-100 capitalize absolute top-1/3 right-2/3 grid content-between overflow-hidden transition-all`}
      >
        <div>
          <input
            className="mr-1 accent-amber-500"
            type="radio"
            name="r"
            id="finnance_expenses_only_notes"
            onChange={setNotesExpenses}
          />
          <label
            htmlFor="finnance_expenses_only_notes"
            className="dark:hover:text-white"
          >
            apenas notas
          </label>
        </div>
        <div>
          <input
            className="mr-1 accent-amber-500"
            type="radio"
            name="r"
            id="finnance_expenses_all"
            onChange={setAllExpenses}
          />
          <label
            htmlFor="finnance_expenses_all"
            className="dark:hover:text-white"
          >
            mostrar tudo
          </label>
        </div>

        <button className="dark:hover:text-white p-1 mt-1 rounded-md bg-zinc-200 dark:bg-neutral-700">
          apenas dividas
        </button>
      </div>
    </>
  );
}
