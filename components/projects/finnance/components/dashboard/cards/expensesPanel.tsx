"use client";

import { SetBoo } from "@/functions/interfaces";

export function ExpensesPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: SetBoo;
}) {
  function closePanel() {
    setOpen(() => false);
  }
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } font-bold rounded-lg border-2 border-zinc-300 text-lg whitespace-nowrap bg-zinc-100 dark:bg-neutral-600 capitalize p-2 absolute top-1/3 right-2/3 z-30`}
    >
      <div>
        <input
          className="mr-1 accent-amber-500"
          type="radio"
          name="r"
          id="finnance_expenses_only_notes"
          onChange={closePanel}
        />
        <label htmlFor="onlyNotes" className="dark:hover:text-white">
          apenas notas
        </label>
      </div>
      <div>
        <input
          className="mr-1 accent-amber-500"
          type="radio"
          name="r"
          id="finnance_expenses_all"
          onChange={closePanel}
        />
        <label htmlFor="all" className="dark:hover:text-white">
          mostrar tudo
        </label>
      </div>

      <button className="dark:hover:text-white p-1 mt-1 rounded-md bg-zinc-200 dark:bg-neutral-700">
        apenas dividas
      </button>
    </div>
  );
}
