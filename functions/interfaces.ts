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
export interface ColoRGBBlock {
  id: number;
  colorCode: string;
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
