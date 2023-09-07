"use client";

import { dataHandlers } from "@/functions/dataHandlers";
import { Classes, FinnanceData, note } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { accessibility } from "@/functions/accessibilityFunctions";
import {
  CommonInp,
  DateInp,
  RadioInp,
  SelectInp,
} from "@/components/projects/components/global/inputs";
import { CommonBtn } from "@/components/projects/components/global/buttons";

const DataHandler = new dataHandlers();
const Access = new accessibility();


export function NoteForm({
  finnanceData,
  setFinnanceData,
}: {
  finnanceData: FinnanceData;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;
}) {
  const date = new Date().toISOString().split("T")[0];

  // ================ data to add a new note ================
  const [newItem, setNewItem] = useState<note>({
    id: finnanceData.globalIds,
    name: "",
    value: 0,
    noteClass: "Essencial",
    flow: "saida",
    date: date,
  });

  const [noteClass, setNoteClass] = useState<Classes[]>([]); //classes aparentes

  /** define o fluxo do item e as classes desse fluxo */
  function setFlow(e: any) {
    setNewItem((old) => ({ ...old, flow: e.target.value }));
    setNoteClass(() =>
      finnanceData.notesList.classes.filter((i) => i.flow === e.target.value)
    );
  }

  /** caso os dados estejam corretos, add uma anotação */
  function successTry() {
    const holder = localStorage.getItem("finnance_data") || "{}";
    const data: FinnanceData = JSON.parse(holder);

    const formated = DataHandler.formatForms(newItem);
    data.notesList.notes.push(formated);
    data.globalIds++;

    localStorage.setItem("finnance_data", JSON.stringify(data));

    // mostrando os dados
    setFinnanceData(() => data);
    setNewItem((old) => ({
      ...old,
      id: data.globalIds,
      value: 0,
      name: "",
      date: date,
    }));
  }

  /** adiciona o item ao localStorage */
  function addNote() {
    // verifica se os dados são validos
    const inputNames = ["name", "value"];
    const invalid = inputNames.every((i) => newItem[i]);

    // atalho para acessar os inputs
    const input = (name) => document.getElementsByName(name)[0];

    if (invalid) {
      successTry();

      // foca o input de nome
      input("name").focus();
      //
    } else {
      // filtra todos os 'name' dos inputs invalidos
      const emptyInps = inputNames.filter(
        (i) => newItem[i] === "" || newItem[i] === 0
      );

      // redireciona o foco do user aos inputs invalidos
      input(emptyInps[0]).focus();
    }
  }

  useEffect(() => {
    document.getElementById("outflow")?.click();
  }, []);
  return (
    <div
      onChange={(e) => DataHandler.getData(e, setNewItem)}
      onKeyDown={(e) => Access.enterAct(e, addNote)}
      className="py-2 border-solid border-y-[1px] border-neutral-400 dark:border-neutral-600 mt-3 w-[95%] flex flex-wrap items-center justify-center content-center gap-5 dark:text-white dark:text-opacity-60"
    >
      {/* =============== nome =============== */}
      <CommonInp
        w="w-48"
        name="name"
        placeholder="Nome"
        type="text"
        inpValue={newItem.name}
      />

      {/* =============== valor =============== */}
      <CommonInp
        w="w-48"
        name="value"
        placeholder="Valor"
        type="number"
        inpValue={newItem.value == 0 ? "" : newItem.value}
      />

      {/* =============== fluxo =============== */}
      <RadioInp inflow="inflow" outflow="outflow" dataHandler={setFlow} />

      {/* =============== classe =============== */}
      <SelectInp
        name="noteClass"
        inpValue={newItem.noteClass}
        list={noteClass}
        setStateAction={setNewItem}
      />
      {/* =============== data =============== */}
      <DateInp date={newItem.date} />
      <CommonBtn ActFunc={addNote} text="Adicionar" />
    </div>
  );
}

