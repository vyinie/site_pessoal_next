"use client";
import "./styles.css";
import "@/app/globals.css";

import { useEffect, useState } from "react";
// components
import ProjectHeader from "../components/ProjectHeader";
import ToDoForm from "./components/ToDoForm";
import ToDoItemComp from "./components/ToDoItem";

// types
import { ToDoItem } from "@/functions/interfaces";

// functions
import { verifiers } from "@/functions/verifyers";

// ===================================================================

const verifier = new verifiers();

// ===================================================================

export default function ToDoList() {
  const [mainList, setMainList] = useState<ToDoItem[]>([]);

  // caso não haja um id o sistema usara um numero que provavelmente não foi registrado
  const [newToDo, setNewToDo] = useState<ToDoItem>({
    id: 100,
    text: "",
    done: false,
  });

  function addNewToDo() {
    if (verifier.ObjChecker(newToDo)) {
      // holder_list++
      setMainList((old) => [...old, newToDo]);
      localStorage.setItem(
        "to_do_list",
        JSON.stringify([...mainList, newToDo])
      );

      // holder_id++
      setNewToDo((old) => ({ ...old, id: old.id + 1, text: "" }));
      localStorage.setItem("to_do_id", JSON.stringify(newToDo.id + 1));
    }
  }

  useEffect(() => {
    // certificação de que sempre haverá um id
    const storageId = localStorage.getItem("to_do_id");
    const storageList = localStorage.getItem("to_do_list");

    if (!storageId) {
      localStorage.setItem("to_do_id", "1");
      setNewToDo((old) => ({
        ...old,
        id: Number(localStorage.getItem("to_do_id")),
      }));
    } else {
      setNewToDo((old) => ({
        ...old,
        id: Number(localStorage.getItem("to_do_id")),
      }));
    }

    if (!storageList) {
      localStorage.setItem("to_do_list", "[]");
      // @ts-ignore
      setMainList(() => JSON.parse(localStorage.getItem("to_do_list")));
    } else {
      // @ts-ignore
      setMainList(() => JSON.parse(localStorage.getItem("to_do_list")));
    }
  }, []);

  return (
    <div className="template bg-slate-100">
      {/* header */}
      <ProjectHeader title="To Do List" />

      {/* aside */}

      {/* dashboard */}
      <div className="template_dashboard flex flex-col items-center">
        {/* form */}
        <ToDoForm list={newToDo} setList={setNewToDo} addNewItem={addNewToDo} />

        {/* table */}
        <div className="mt-4 p-2 rounded-md min-w-[310px] max-h-[70vh] overflow-auto grid justify-center gap-2 bg-white">
          {mainList.map((i) => (
            <ToDoItemComp
              key={`to_do_item${i.id}`}
              setMainList={setMainList}
              to_do_item={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
