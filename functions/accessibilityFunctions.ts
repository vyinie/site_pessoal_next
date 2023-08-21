import { SetStateAction } from "react";

export class accessibility {
  closeEsc(open: boolean, setOpen: any) {
    /* open = state
       setOpen = setState
    */
    if (open) {
      document.addEventListener("keydown", (e) => {
        e.key === "Escape" && setOpen(() => false);
        const classBody = document.body.style;
        classBody.overflow = "";
      });
    }
  }

  enterAct(func: (e?) => void, key: string) {
    if (key === "Enter") {
      func();
    }
  }

  closeWrapper(e: any, setOpen: (v: SetStateAction<boolean>) => void) {
    /* e = event
       setOpen = setState que fecha o wrapper
     */
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
    /* e = event
       setOpen = setState que muda o stado do wrapper
     */
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
