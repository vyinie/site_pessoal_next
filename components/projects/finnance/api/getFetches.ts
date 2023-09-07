'use client'
import { dataHandlers } from "@/functions/dataHandlers";
import { Classes, FinnanceData, debt, note } from "@/functions/interfaces";

const formater = new dataHandlers();

export class getStufs {
  /** pega a lista de classes */
  getClasses() {
    const holder = localStorage.getItem("finnace_data");
    const data: FinnanceData = JSON.parse(holder || "{}");

    return data.notesList.classes;
  }

  /** pega a lista de notas */
  getNotes() {
    const holder = localStorage.getItem("finnace_data") || "[{}]";
    const data: FinnanceData = JSON.parse(holder);

    return data.notesList.notes;
  }

  /** pega a lista de dividas */
  getDebts() {
    const holder = localStorage.getItem("finnace_data") || "{}";
    const data: FinnanceData = JSON.parse(holder);

    return data.debtsList;
  }

  /** soma todas as entradas da lista de notas */
  Amount() {
    const notes = this.getNotes();

    const amount = notes
      .filter((i) => i.flow === "entrada")
      .map((i) => Number(i.value))
      .reduce((a, b) => a + b, 0);

    return amount;
  }

  /** soma todas as despesas da lista de notas */
  notesExpenses() {
    const notes = this.getNotes();

    const expenses = notes
      .filter((i) => i.flow === "saida")
      .map((i) => Number(i.value))
      .reduce((a, b) => a + b, 0);

    return expenses;
  }

  /** soma todas as despesas da lista de dividas */
  debtsExpenses() {
    const debts = this.getDebts();

    const expenses = debts
      .filter((i) => i.remainingInsts > 0)
      .map((i) => Number(i.value / i.installments))
      .reduce((a, b) => a + b, 0)

    return formater.ISODecimal(expenses);
  }

  /** calcula todas as despesas */
  allExpenses() {
    const notes = this.notesExpenses();
    const debts = this.debtsExpenses();

    const expenses = notes + debts;
    return expenses;
  }

  /** calcula a receita
  'conuntDebts' é necessario pra saber se o 
  'income' vai conter as dividas ou só as notas comuns
    */
  Income(countDebts?: boolean) {
    const amount = this.Amount();
    const expenses = countDebts ? this.allExpenses() : this.notesExpenses();

    // calcula a receita
    const income = amount - expenses;

    return income;
  }
}
