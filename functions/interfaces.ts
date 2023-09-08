import { Dispatch, SetStateAction } from "react";

// ===================== vaiaveis =====================
/** item unico de uma lista  */
export interface ToDoItem {
  id: number;
  text: string;
  done: boolean;
}

/** lista que guarda item, parte do conjunto */
export interface TDList {
  list: ToDoItem[];
  id: number;
  title: string;
}
/** todas as informações de todo o projeto */
export interface ToDoListData {
  globalIds: number;
  lists: TDList[];
  verticalList: boolean;
}

/** bloco de cor */
export interface ColoRGBBlock {
  id: number;
  colorCode: string;
}

/** botão de dificuldade */
export interface ColorDIficultControl {
  text: string;
  setted: boolean;
  lifes: number[];
}

/** ids do kanban */
export interface KanbanIds {
  cardId: number;
  itemId: number;
}

/** obj de card do kanban */
export interface KanbanCard {
  name: string;
  id: string | number;
  items: KanbanItem[];
  color: { bg: string; text: "text-white" | "text-black" };
}

/** item que vai dentro do KanbanCard */
export interface KanbanItem {
  id: number;
  text: string;
}

/** dodos do kanban, salvo no localStorage */
export interface KanbanData {
  globalIds: KanbanIds;
  cards: KanbanCard[];
}

/** item da lista de notas do finnance */
export interface note {
  id?: number;
  name: string;
  value: number;
  noteClass: string;
  date: string;
  flow: "saida" | "entrada";
}

/** item da lista de dividas do finnance */
export interface debt {
  id?: number;
  name: string;
  value: number;
  installments: number;
  remainingInsts: number;
  date: string;
}

/** classe de nota */
export interface Classes {
  id: number;
  text: string;
  flow: "saida" | "entrada";
}

/** dados da calculadora de juros */
export interface Compound {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  aplicationTime: number;
}

/** todos os dados de listas do finnance */
export interface FinnanceData {
  globalIds: number;
  debtsList: debt[];
  notesList: { notes: note[]; classes: Classes[] };
}

export interface GraphData {
  labels: string[];
  series: number[];
}

// ===================== components =====================
export interface CommonInput {
  name: string;
  type: "number" | "text";
  placeholder: string;
  inpValue: string | number;
  className?: string;
  h?: string;
  w?: string;
}

export interface CommonBtn {
  ActFunc: (e?) => void;
  text: string;
  className?: string;
  color?: string;
}

export interface SelectInp {
  name?: string;
  inpValue: string;
  setStateAction: Dispatch<SetStateAction<object>>;
  list: { id: number; text: string; [key: string]: any }[];
  w?: string;
  bgColor?: string;
}

// ===================== functions =====================
/** setState boolean  */
export type SetBoo = (v: SetStateAction<boolean>) => void;
