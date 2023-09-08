"use client";
import { SelectInp, CommonInput } from "@/functions/interfaces";
import { useEffect, useState } from "react";
import { dataHandlers } from "@/functions/dataHandlers";

const DataHandler = new dataHandlers();

/** pra pegar o input coloque o onchange na div pai
 * o name do input tem de ser igual a key o obj que
 * mudará
 */
export function CommonInp({
  inpValue,
  type,
  name,
  placeholder,
  className,
  h,
  w,
}: CommonInput) {
  return (
    <input
      className={`
      ${className || ""} 
      ${h || "h-9"} 
      ${w || ""} 
       border border-black border-b-4 border-opacity-40 dark:border-zinc-600 dark:border-opacity-90 rounded-[5px] outline-none px-1  dark:text-white dark:text-opacity-80 dark:bg-zinc-500`}
      type="text"
      inputMode={type === "number" ? "numeric" : "text"}
      name={name}
      placeholder={placeholder}
      value={inpValue}
      required
      onChange={() => {}}
    />
  );
}
// ============================ input de fluxo ============================
export function RadioInp({
  dataHandler,
  inflow,
  outflow,
}: {
  dataHandler: any;
  inflow: string;
  outflow: string;
}) {
  useEffect(() => {
    document.getElementById(outflow)?.click();
  }, []);

  return (
    <div onChange={dataHandler} className="flex gap-3 ">
      <div className="flex gap-1">
        <input
          type="radio"
          className="accent-amber-500"
          name="flow"
          id={inflow}
          value="entrada"
        />
        <label htmlFor={inflow}>entrada</label>
      </div>

      <div className="flex gap-1">
        <input
          type="radio"
          className="accent-amber-500"
          name="flow"
          id={outflow}
          value="saida"
        />
        <label htmlFor={outflow}>saída</label>
      </div>
    </div>
  );
}

// ============================ input das classes ============================
/**
 **inpValue = key do obj que esse inp mudará
 **dataHandler =
 **list =
 **widt =
 **bgColor =
 */
export function SelectInp({
  inpValue,
  name = "select",
  setStateAction,
  list,
  w,
  bgColor,
}: SelectInp) {
  // ================ shows the class options ================
  const [OptsDisplay, setOptsDisplay] = useState(false);
  function showOpts() {
    setOptsDisplay((old) => !old);
  }

  function closeOptsOnOut() {
    setOptsDisplay(() => false);
  }
  return (
    <div className={`${w || "w-36"} h-[35px] cursor-pointer relative z-0`}>
      <input
        type="text"
        className={`${
          bgColor || "bg-slate-100 "
        } rounded-md h-full containedInp w-full pr-6`}
        placeholder="Classe"
        name={name}
        value={inpValue}
        onChange={() => {}}
        onFocus={showOpts}
      />
      <div onClick={showOpts} onMouseLeave={closeOptsOnOut} className="arrow">
        <div
          className={`${
            OptsDisplay ? "block" : "hidden"
          }  overflow-y-auto min-w-full max-h-40 h-fit absolute right-1/2 translate-x-1/2 top-full bg-slate-200 text-center captalize`}
          onClick={(e) => DataHandler.getData(e, setStateAction)}
        >
          {list.length > 0 &&
            list.map((i) => (
              <button
                name={name}
                value={i.text}
                className={`${
                  bgColor ||
                  "dark:hover:bg-neutral-600 hover:bg-slate-300 dark:font-bold dark:text-opacity-80 dark:bg-zinc-500"
                } p-1 w-full dark:text-white dark:border-neutral-700`}
                key={`formClass${i.id}`}
                tabIndex={0}
              >
                {i.text}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

// ============================ input de data ============================
export function DateInp({ date, w }: { date: string; w?: string }) {
  /* o parametro tem de ser 
  new Date().toISOString().split("T")[0] */

  return (
    <div className="h-[35px] ">
      <input
        type="date"
        name="date"
        className={`${w || "w-full "} pr-2 containedInp rounded-md`}
        defaultValue={date}
      />
    </div>
  );
}
