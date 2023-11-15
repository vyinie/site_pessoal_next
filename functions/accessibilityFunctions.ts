import { SetBoo } from "./interfaces";

export class accessibility {
  /**
   * e = event
   * setOpen = setState
   */
  closeEsc(e: KeyboardEvent, setOpen: SetBoo) {
    if (e.key === "Escape") {
      setOpen(() => false);

      const classBody = document.body.style;
      classBody.overflow = "";
    }
  }

  enterAct(e: any, func: (e?) => void) {
    // func = função à executar
    // key = e.key
    if (e.key === "Enter") {
      func(e);
    }
  }

  closeWrapper(e, setOpen: SetBoo) {
    // e = event
    // setOpen = setState que fecha o wrapper
    const target = e.target.className;

    if (
      typeof target === "string" &&
      target.includes("close-on-click")
    ) {
      
      setOpen(() => false);
      const classBody = document.body.style;
      classBody.overflow = "";
    }
  }
  /**
   ** e = event
   ** setOpen = setStateAction<bollean>
   ** hidden = bodyoverflow
   */
  handlerWrapper(e, setOpen: SetBoo, hidden?: boolean) {
    const target = e.target.className;
    if (
      typeof target === "string" &&
      target.includes("change-on-click")
    ) {
      setOpen((old) => !old);
      if (hidden) {
        const classBody = document.body.style;
        classBody.overflow = classBody.overflow == "" ? "hidden" : "";
      }
    }
  }
}
