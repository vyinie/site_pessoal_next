// ===================== vaiaveis =====================
export interface ToDoItem {
  id: number;
  text: string;
  done: boolean;
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
