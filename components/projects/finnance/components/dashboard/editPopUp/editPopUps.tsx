"use client";
import {
  Classes,
  FinnanceData,
  SetBoo,
  debt,
  note,
} from "@/functions/interfaces";
import { verifiers } from "@/functions/verifyers";
import { accessibility } from "@/functions/accessibilityFunctions";
import { Dispatch, SetStateAction, useState } from "react";
import { dataHandlers } from "@/functions/dataHandlers";
import {
  CommonInp,
  DateInp,
  RadioInp,
  SelectInp,
} from "@/components/projects/components/global/inputs";
import { CommonBtn } from "@/components/projects/components/global/buttons";

const DataHandlers = new dataHandlers();
const Verifiers = new verifiers();
const Access = new accessibility();

export function EditNotePopUp({
  noteData,
  setFinnanceData,
  open,
  setOpen,
}: {
  noteData: note;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;

  open: boolean;
  setOpen: SetBoo;
}) {
  // ================ data to add a new note ================
  const [editedItem, setEditedItem] = useState<note>(noteData);

  // ================ gets data to add a new note ================
  function setFlow(e: any) {
    const holder = localStorage.getItem("finnance_data") || "{}";
    const data: FinnanceData = JSON.parse(holder);

    setEditedItem((old) => ({ ...old, flow: e.target.value }));
    setNoteClass(() =>
      data.notesList.classes.filter((i) => i.flow === e.target.value)
    );
  }

  // ================ change the value of class input ================
  const [noteClass, setNoteClass] = useState<Classes[]>([]); //classes aparentes

  // ================ edit the note ================
  function editNote() {
    if (Verifiers.ObjChecker({...editedItem, id:"b" })) {
      const holder = localStorage.getItem("finnance_data") || "{}";
      const data: FinnanceData = JSON.parse(holder);

      const index = data.notesList.notes.findIndex(
        (i) => i.id == editedItem.id
      );
      data.notesList.notes[index] = editedItem;

      localStorage.setItem("finnance_data", JSON.stringify(data));
      setFinnanceData(() => data);

      setOpen(() => false);
    } else {
      console.log("eroo");
    }
    console.log(editedItem);
  }

  return (
    <div
      onClick={(e) => Access.closeWrapper(e, setOpen)}
      className={`${
        open ? "z-10 opacity-100" : "opacity-0 -z-10"
      } wrapper close-on-click`}
    >
      <div
        onChange={(e) => {
          DataHandlers.getData(e, setEditedItem);
        }}
        className="flex flex-col flex-wrap justify-center items-center gap-3 bg-white dark:bg-zinc-700 p-5 h-fit w-fit rounded-md"
      >
        {/* =============== nome =============== */}
        <CommonInp
          w="w-48"
          name="name"
          placeholder="Nome"
          type="text"
          inpValue={editedItem.name}
        />

        {/* =============== valor =============== */}
        <CommonInp
          w="w-48"
          name="value"
          placeholder="Valor"
          type="number"
          inpValue={editedItem.value == 0 ? "" : editedItem.value}
        />

        {/* =============== fluxo =============== */}
        <RadioInp
          inflow={`editInFlow${editedItem.id}`}
          outflow={`editOutFlow${editedItem.id}`}
          dataHandler={setFlow}
        />

        {/* =============== classe =============== */}
        <SelectInp
          name="noteClass"
          inpValue={editedItem.noteClass}
          list={noteClass}
          setStateAction={setEditedItem}
        />
        {/* =============== data =============== */}
        <DateInp date={editedItem.date.split("T")[0]} />
        <CommonBtn ActFunc={editNote} text="Editar" />
      </div>
    </div>
  );
}
