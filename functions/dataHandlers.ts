import { Dispatch, SetStateAction } from "react";
import { debt, note } from "./interfaces";

export class dataHandlers {
  /**
  **e = event
  **handler = setState()
  essa função precisa de um state em objeto, só funciona com
  inputs com o 'name' igual a key do objeto, e existe apenas pra mostrar
  melhormente as informações pro user
  */
  getData(e, setStateAction: Dispatch<SetStateAction<object>>) {
    if (e.target.inputMode === "numeric") {
      if (e.target.value == "0") {
        setStateAction((old) => ({
          ...old,
          [e.target.name]: "",
        }));
      } else {
        setStateAction((old) => ({
          ...old,
          [e.target.name]: this.localeDecimal(e.target.value),
        }));
      }
    } else {
      setStateAction((old) => ({
        ...old,
        [e.target.name]: e.target.value,
      }));
    }
  }

  localeDecimal(n: string | number) {
    /* se o param 'num' tiver casas decimais elas tem de ser 
    separadas por virgula e o inteiro tem de ser junto (1000,58)
    .replace('.',',')
    */
    // bloqueia letras e pontos
    const num = typeof n == "number" ? n.toString() : n;
    const one = num.replace(/[^0-9\,]/g, "");

    // separa as casas decimais
    const two = one.split(",");

    // add os pontos automaticamente
    const three = two[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // devolve as casas decimais
    const four = two[1] != undefined ? `${three},${two[1].slice(0, 2)}` : three;
    return four;
  }

  ISODecimal(num: string | number) {
    const n1 = typeof num === "number" ? num.toString() : num;
    const n2 = n1.split(".");
    const n3 = n2[1] ? `${n2[0]}.${n2[1].slice(0, 2)}` : n2;

    return Number(n3);
  }

  localeDate(date: string) {
    const d1 = new Date(date.split("T")[0] + " ").toLocaleString();
    const d2 = d1.split(",")[0];
    return d2;
  }

  formatForms(Note) {
    /* essa função é pra formatar dados de objetos do tipo 
    'note' => /functions/interfaces.ts:2
    antes de enviar pra adicionar ou editar. Formatando a data
    e valor pra ISO */
    const note = Note;
    note.date = new Date(Note.date).toISOString();
    note.value = Number(
      Note.value
        .toString()
        .split(".")
        .reduce((a, b) => a + b)
        .replace(",", ".")
    );
    Number(note.value);
    return note;
  }
}
