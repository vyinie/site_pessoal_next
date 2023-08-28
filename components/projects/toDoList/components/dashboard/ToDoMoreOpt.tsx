import { SetBoo } from "@/functions/interfaces";
import { accessibility } from "@/functions/accessibilityFunctions";
import ListDirectionBtn from "./ListDirectionBtn";
import {
  DelBtn,
  MoreOptsBtn,
} from "@/components/projects/components/global/buttons";

const Access = new accessibility();

export default function ToDoListMoreOpt({
  vert,
  setVert,
  delAllItems,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: SetBoo;
  vert: boolean;
  setVert: SetBoo;
  delAllItems: () => void;
}) {
  return (
    <MoreOptsBtn
      type="dots"
      func={(e) => Access.handlerWrapper(e, setIsOpen)}
      className="h-fit "
      standing
    >
      <div
        onMouseLeave={() => setIsOpen(() => false)}
        className={`${
          isOpen ? "flex" : "hidden"
        } gap-1 justify-center bg-white rounded-md absolute top-1/2 -translate-y-1/2 right-2/3 border border-zinc-400 `}
      >
        <ListDirectionBtn setVert={setVert} vert={vert} />
        <DelBtn className="rounded-md" func={delAllItems} />
      </div>
    </MoreOptsBtn>
  );
}
