"use client";
import { useState } from "react";

import { DelBtn, EditBtn, MoreOptsBtn } from "../../components/global/buttons";
import { accessibility } from "@/functions/accessibilityFunctions";

const Access = new accessibility();

export default function KbCardMoreOpts() {
  const [optsToggle, setOptsToggle] = useState(false);

  return (
    <>
      {/* fecha o pop-over qndo clicar fora */}
      <div
        onClick={(e) => Access.closeWrapper(e, setOptsToggle)}
        className={`${
          optsToggle ? "fixed" : "hidden"
        } h-screen w-screen top-0 left-0 close-on-click`}
      ></div>

      <div className="absolute right-2 bottom-1/2 translate-y-1/2">
        <MoreOptsBtn type="dots" func={() => setOptsToggle((old) => !old)}>
          <div
            className={`${
              optsToggle ? "w-12 h-24 border-2" : "w-0 h-0"
            } overflow-hidden bg-slate-200 border-zinc-500 rounded-md absolute top-5 left-9 transition-all grid place-items-center close-on-click`}
          >
            <EditBtn rounded="full" setToggle={setOptsToggle} />
            <DelBtn rounded="full" func={() => {}} />
          </div>
        </MoreOptsBtn>
      </div>
    </>
  );
}
