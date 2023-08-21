"use client";
import "./styles.css";
import "@/app/globals.css";

import { useState } from "react";
// components
import ProjectHeader from "../components/ProjectHeader";
import ToDoForm from "./components/ToDoForm";
import ToDoItemComp from "./components/toDoItem";

// types
import { ToDoItem } from "@/functions/interfaces";

// functions
import { verifiers } from "@/functions/verifyers";

// certificação de que sempre haverá um id
const storageId = localStorage.getItem("to_do_id");
const storageList = localStorage.getItem("to_do_list");

if (!storageId) localStorage.setItem("to_do_id", "1");
if (!storageList) localStorage.setItem("to_do_list", "[]");

// ===================================================================

const verifier = new verifiers();

// ===================================================================

export default function ToDoList() {
  // pra não percisar chamar o localStorage o tempo todo
  const holder_id = Number(localStorage.getItem("to_do_id"));
  const holder_list: ToDoItem[] = JSON.parse(
    // @ts-ignore
    localStorage.getItem("to_do_list")
  );

  const [mainList, setMainList] = useState<ToDoItem[]>(holder_list || []);

  // caso não haja um id o sistema usara um numero que provavelmente não foi registrado
  const [newToDo, setNewToDo] = useState<ToDoItem>({
    id: Number(holder_id),
    text: "",
    done: false,
  });

  function addNewToDo() {
    if (verifier.ObjChecker(newToDo)) {
      // holder_list++
      setMainList((old) => [...old, newToDo]);
      localStorage.setItem(
        "to_do_list",
        JSON.stringify([...holder_list, newToDo])
      );

      // holder_id++
      setNewToDo((old) => ({ ...old, id: old.id + 1, text: "" }));
      localStorage.setItem("to_do_id", JSON.stringify(holder_id + 1));
    }
  }

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
            <ToDoItemComp key={`to_do_item${i.id}`} setMainList={setMainList} to_do_item={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
