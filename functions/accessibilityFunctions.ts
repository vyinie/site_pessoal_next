import { SetStateAction } from "react";

export class accessibility {
  closeEsc(e: any, setOpen: (v: SetStateAction<boolean>) => void) {
    /* e = event
       setOpen = setState
    */
    if (e.key === "Escape") {
      setOpen(() => false);

      const classBody = document.body.style;
      classBody.overflow = "";
    }
  }

  enterAct(func: (e?) => void, e: any) {
    // func = função à executar
    // key = e.key
    if (e.key === "Enter") {
      func(e);
    }
  }

  closeWrapper(e: any, setOpen: (v: SetStateAction<boolean>) => void) {
    // e = event
    // setOpen = setState que fecha o wrapper
    const target = e.target.className;

    if (
      typeof target === "string" &&
      target.split(" ").some((i) => i === "close-on-click")
    ) {
      setOpen(() => false);
      const classBody = document.body.style;
      classBody.overflow = "";
    }
  }

  handlerWrapper(e: any, setOpen: (v: SetStateAction<boolean>) => void) {
    // e = event
    // setOpen = setState que dita se o wrapper está aberto

    const target = e.target.className;
    if (
      typeof target === "string" &&
      target.split(" ").some((i) => i === "change-on-click")
    ) {
      setOpen((old) => !old);
      const classBody = document.body.style;
      classBody.overflow = classBody.overflow == "" ? "hidden" : "";
    }
  }
}
