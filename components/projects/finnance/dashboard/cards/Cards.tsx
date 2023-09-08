"use client";
import "./style.css";

import Graph from "./Graps";

import { dataHandlers } from "@/functions/dataHandlers";
import { useEffect, useState } from "react";
import { FinnanceData, GraphData } from "@/functions/interfaces";
import { MoreOptsBtn } from "@/components/projects/components/global/buttons";
import { ExpensesPanel } from "./expensesPanel";
import { accessibility } from "@/functions/accessibilityFunctions";

const DataHandlers = new dataHandlers();
const Access = new accessibility();

export default function Cards({
  finnanceData,
}: {
  finnanceData: FinnanceData;
}) {
  //
  // toggle que mostra apenas despesas do dashboard ou tbm das dividas
  const [showAllExpenses, setShowAllExpenses] = useState(false);

  const [expensesPanelToggle, setExpensesPanelToggle] = useState(false);

  // verifica qual info pegar baseado no 'showAllExpenses'
  const expenses = () => {
    const notesExpenses = finnanceData.notesList.notes.reduce(
      (a, b) => (b.flow === "saida" ? a + b.value : a),
      0
    );
    if (showAllExpenses) {
      const debtsExpenses = finnanceData.debtsList.reduce(
        (a, b) => a + b.value,
        0
      );

      return debtsExpenses + notesExpenses;
    }
    return notesExpenses;
  };
  const amount = () => {
    const data = finnanceData.notesList.notes.reduce(
      (a, b) => (b.flow === "entrada" ? a + b.value : a),
      0
    );
    return data;
  };

  const income = () => {
    const data = amount() - expenses();
    return data;
  };

  // =================================================
  const getGraphData = () => {
    const sums: [string, number][] = [];
    finnanceData.notesList.notes.forEach((i) => {
      /* t[0] = classes da nota
         t[1] = valor da nota

         esse metodo verifica se ja existe um arr com essa classe
         se existir retona o index dela
         */
      const index = sums.findIndex((t) => t[0] === i.noteClass);

      /* se existir, soma o valor dessa nota(i) ao valor atual */
      if (index >= 0) {
        sums[index][1] += Number(i.value);
      } else {
        /* se não existir, cria um novo arr com os dados da classe */
        sums.push([i.noteClass, Number(i.value)]);
      }
    });

    /* cria um obj com os arrs  */
    const data = {
      labels: sums.map((i) => i[0]),
      series: sums.map((i) => i[1]),
    };
    return data;
  };

  function setDebtsInGraph() {
    // apenas info das notas
    const graphNotes: GraphData = getGraphData();

    if (showAllExpenses) {
      // dividas
      const graphDebts = finnanceData.debtsList;

      // adiciona as parcelas
      graphDebts.forEach((i) => {
        if (i.remainingInsts > 0) {
          graphNotes.labels.push("Divida - " + i.name);
          graphNotes.series.push(Math.ceil(i.value / i.installments));
        }
      });
    }

    return graphNotes;
  }

  const graphData = setDebtsInGraph();
  const color = income() < 0 ? "text-red-500" : "text-green-500";

  useEffect(() => {
    const el = document.getElementById("finnance_expenses_only_notes");
    el?.click();
    setExpensesPanelToggle(() => false);
  }, []);

  return (
    <div className="cardsContainer">
      {/* card do bruto */}
      <div className="card">
        <p className="cardTitle">bruto</p>
        <div className="cardContent">
          <p className="text-green-500">
            {DataHandlers.localeDecimal(amount())}
            {/* {DataHandlers.localeDecimal(String(amount).replace(".", ","))} */}
          </p>
        </div>
      </div>

      {/* card das despesas */}
      <div className="card relative z-[2]">
        <p className="cardTitle">despesas</p>

        <div className="cardContent">
          <p className="text-red-500">
            {DataHandlers.localeDecimal(expenses())}
          </p>
        </div>

        <div className="absolute bottom-0 right-0">
          <MoreOptsBtn
            func={(e) => Access.handlerWrapper(e, setExpensesPanelToggle)}
            type="dots"
          >
            <ExpensesPanel
              open={expensesPanelToggle}
              setOpen={setExpensesPanelToggle}
              setShowAllExpenses={setShowAllExpenses}
            />
          </MoreOptsBtn>
        </div>
      </div>

      {/* card da receita */}
      <div className="card">
        <p className="cardTitle">receita</p>

        <div className="cardContent">
          <p className={`${color}`}>
            {`${income() < 0 ? "-" : ""}${DataHandlers.localeDecimal(
              income()
            )}`}
          </p>
        </div>
      </div>

      {/* ================ grafico =============== */}
      <Graph graphData={graphData} />
    </div>
  );
}
