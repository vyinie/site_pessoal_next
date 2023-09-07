"use client";
import "./style.css";

import Graph from "./Graps";
import { dataHandlers } from "@/functions/dataHandlers";
import { getStufs } from "../../../api/getFetches";
import { useEffect, useState } from "react";
import { GraphData } from "@/functions/interfaces";
import { MoreOptsBtn } from "@/components/projects/components/global/buttons";
import { ExpensesPanel } from "./expensesPanel";
import { accessibility } from "@/functions/accessibilityFunctions";

const GetStufs = new getStufs();
const DataHandlers = new dataHandlers();
const Access = new accessibility();

export default function Cards() {
  const [checkExpenses, setCheckExpenses] = useState(false);
  const [cardExpendes, setCardExpendes] = useState(false);

  // verifica qual info pegar baseado no 'checkExpenses'
  const expenses = checkExpenses
    ? GetStufs.allExpenses()
    : GetStufs.notesExpenses();

  const amount = GetStufs.Amount();
  const income = GetStufs.Income(checkExpenses);

  // =================================================
  function handlerGraph() {
    // apenas info das notas
    const graphNotes: GraphData = {
      labels: [],
      series: [],
    };

    if (checkExpenses) {
      // info das dividas
      const graphDebts = GetStufs.getDebts();

      // add ao graphNotes
      graphDebts.map((i) => {
        graphNotes.labels.push("Divida - " + i.name);
        graphNotes.series.push(Math.ceil(i.value / i.installments));
      });
    }

    return graphNotes;
  }

  const graphData = handlerGraph();
  const color = income < 0 ? "red" : "green";

  useEffect(() => {
    const el = document.getElementById("finnance_expenses_only_notes");
    el?.click();
    setCardExpendes(() => false);
  }, []);
  return (
    <div className="cardsContainer">
      {/* card do bruto */}
      <div className="card">
        <p className="cardTitle">bruto</p>
        <div className="cardContent">
          <p className="text-green-500">
            {DataHandlers.localeDecimal(amount)}
            {/* {DataHandlers.localeDecimal(String(amount).replace(".", ","))} */}
          </p>
        </div>
      </div>

      {/* card das despesas */}
      <div className="card relative z-[2]">
        <p className="cardTitle">despesas</p>

        <div className="cardContent">
          <p className="text-red-500">
            {DataHandlers.localeDecimal(String(expenses).replace(".", ","))}
          </p>
        </div>

        <div className="absolute bottom-0 right-0">
          <MoreOptsBtn
            func={(e) => Access.handlerWrapper(e, setCardExpendes)}
            type="dots"
          >
            <ExpensesPanel open={cardExpendes} setOpen={setCardExpendes} />
          </MoreOptsBtn>
        </div>
      </div>

      {/* card da receita */}
      <div className="card">
        <p className="cardTitle">receita</p>

        <div className="cardContent">
          <p className={`text-${color}-500`}>
            {`${income < 0 ? "-" : ""}${DataHandlers.localeDecimal(
              String(income).replace(".", ",")
            )}`}
          </p>
        </div>
      </div>

      {/* ================ grafico =============== */}
      <Graph handlerGraph={graphData} />
    </div>
  );
}
