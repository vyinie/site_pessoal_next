"use client";
import "./styles.css";
import "@/app/globals.css";

import { useEffect, useState } from "react";
// components
import ProjectHeader from "../components/ProjectHeader";
import ToDoForm from "./components/ToDoForm";
import ToDoItemComp from "./components/ToDoItem";

// types
import { ToDoItem, ToDoListData } from "@/functions/interfaces";

// functions
import { verifiers } from "@/functions/verifyers";
import ToDoListMoreOpt from "./components/ListDirectionBtn";

// ===================================================================

const verifier = new verifiers();

// ===================================================================

export default function ToDoList() {
  /** lista com todos os items  */
  const [mainList, setMainList] = useState<ToDoItem[]>([]);

  /** obj pra add um novo item */
  const [newToDo, setNewToDo] = useState<ToDoItem>({
    // caso não haja um id o sistema usara um numero que provavelmente não foi registrado
    id: 500,
    text: "",
    done: false,
  });

  /** define se a lista sera na horizintal */
  const [verticalList, setverticalList] = useState(true);

  /** define se a lista sera na horizintal */
  const [moreOptToggle, setMoreOptToggle] = useState(false);
  /**   salva os dados no localStorage */
  function saveData() {
    // holder pra definir os novos dados
    const newListData: ToDoListData = {
      id: newToDo.id + 1,
      verticalList: verticalList,
      lists: [...mainList, newToDo],
    };
    // salva os novos dados
    localStorage.setItem("to_do_list_data", JSON.stringify(newListData));
  }

  /** add um novo item e salva a nova lista */
  function addNewToDo() {
    if (verifier.ObjChecker(newToDo)) {
      saveData();
      setMainList((old) => [...old, newToDo]);
      setNewToDo((old) => ({ ...old, id: old.id + 1, text: "" }));
    }
  }
  /** deleta todos os item da lista principal */
  function delAllItems() {
    const t = localStorage.getItem("to_do_list_data") || "{}";
    const holder_list: ToDoListData = { ...JSON.parse(t), lists: [] };

    setMainList(() => []);
    localStorage.setItem("to_do_list_data", JSON.stringify(holder_list));
  }

  /** mostra os dados salvos */
  function initialSetter() {
    const t = localStorage.getItem("to_do_list_data") || "{}";
    const holder_list: ToDoListData = JSON.parse(t);

    setMainList(() => holder_list.lists);

    // define apenas o id
    setNewToDo((old) => ({
      ...old,
      id: holder_list.id,
    }));

    setverticalList(() => holder_list.verticalList);
  }

  useEffect(() => {
    // certificação de que sempre haverá os dados
    const storageList = localStorage.getItem("to_do_list_data");

    if (!storageList) {
      localStorage.setItem(
        "to_do_list_data",
        JSON.stringify({ id: 1, lists: [], verticalList: true })
      );
      initialSetter();
    } else {
      initialSetter();
    }
  }, []);

  return (
    <div className="template bg-slate-100">
      {/* header */}
      <ProjectHeader title="To Do List" />

      {/* ================ aside ================ */}

      {/* ================ dashboard ================ */}
      <div className="template_dashboard flex flex-col items-center">
        {/* form */}
        <div className="flex gap-2 items-center mt-4 translate-x-5">
          <ToDoForm
            list={newToDo}
            setList={setNewToDo}
            addNewItem={addNewToDo}
          />
          <ToDoListMoreOpt
            isOpen={moreOptToggle}
            setIsOpen={setMoreOptToggle}
            vert={verticalList}
            setVert={setverticalList}
            delAllItems={delAllItems}
          />
        </div>

        {/* table */}
        <div
          className={`${
            verticalList ? "overflow-y-auto" : "overflow-x-auto flex-wrap"
          } h-fit w-fit mt-4 p-2 rounded-md min-w-[310px] max-w-[620px] max-h-[70vh] overflow-hidden flex flex-col  justify-center gap-2 bg-white`}
        >
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
