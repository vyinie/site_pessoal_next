import { SetStateAction } from "react";

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
}

export interface SelectInp {
  inpValue: string;
  dataHandler: any;
  list: { id: number; text: string }[];
  width?: string;
  bgColor?: string;
}

// ===================== functions =====================
/** setState boolean  */
export type SetBoo = (v: SetStateAction<boolean>) => void;
