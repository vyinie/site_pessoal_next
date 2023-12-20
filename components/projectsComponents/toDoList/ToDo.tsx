"use client";
import "@/app/globals.css";

import { useEffect, useState } from "react";
// components
import ProjectHeader from "../../commonComponents/ProjectHeader";

// types
import { TDList, ToDoItem, ToDoListData } from "@/functions/interfaces";

// functions
import ToDoSideBar from "./components/sideBar/ToDoSideBar";
import ToDoDashboard from "./components/dashboard/ToDoDashboard";

// ===================================================================

// ===================================================================

export default function ToDoList() {
  /** lista com todos os items  */
  const [mainList, setMainList] = useState<TDList[]>([]);

  /* define qual lista acessar */
  const [listIndex, setListIndex] = useState(0);

  /** obj pra add um novo item */
  const [newToDo, setNewToDo] = useState<ToDoItem>({
    done: false,
    id: 500,
    text: "",
  });

  /** define se a lista sera na horizintal */
  const [verticalList, setverticalList] = useState(true);

  /** mostra os dados salvos */
  function initialSetter() {
    const toDoLocalData = localStorage.getItem("to_do_list_data") || "{}";
    const holder_list: ToDoListData = JSON.parse(toDoLocalData);

    setMainList(holder_list.lists);

    // define apenas o id
    setNewToDo((old) => ({
      ...old,
      id: holder_list.globalIds,
    }));

    setverticalList(holder_list.verticalList);
  }

  useEffect(() => {
    // certificação de que sempre haverá os dados
    const storageList = localStorage.getItem("to_do_list_data");

    if (!storageList) {
      const defaultLists: TDList[] = [{ list: [], title: "To Do" }];

      const defaultData: ToDoListData = {
        globalIds: 1,
        lists: defaultLists,
        verticalList: true,
      };

      localStorage.setItem("to_do_list_data", JSON.stringify(defaultData));
    }
    initialSetter();
  }, []);

  return (
    <div className="template bg-slate-100">
      {/* header */}
      <ProjectHeader title="To Do List" />

      {/* ================ aside ================ */}
      <ToDoSideBar
        setMainList={setMainList}
        listIndex={listIndex}
        setlistIndex={setListIndex}
        mainList={mainList}
      />

      {/* ================ dashboard ================ */}

      <ToDoDashboard
        mainList={mainList}
        setMainList={setMainList}
        newToDo={newToDo}
        setNewToDo={setNewToDo}
        verticalList={verticalList}
        setverticalList={setverticalList}
        currentList={mainList[listIndex]?.list}
        listIndex={listIndex}
      />
    </div>
  );
}
