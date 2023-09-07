"use client";
import "./style.css";
import { useState } from "react";
import { accessibility } from "@/functions/accessibilityFunctions";
import Link from "next/link";
import { MoreOptsBtn } from "@/components/projects/components/global/buttons";

const Access = new accessibility();

export default function FinnanceSideBar() {
  const [wrapperToggle, setWrapperToggle] = useState(false);
  const asideLinks = [
    {
      link: "",
      text: "dashboard",
      id: 0,
    },
    {
      link: "/dividas",
      text: "dividas",
      id: 1,
    },
    {
      link: "/calc-juros",
      text: "calculadora de juros",
      id: 2,
    },
    {
      link: "/carteira",
      text: "carteira de investimentos",
      id: 3,
    },
  ];

  const [sideBarTitle, setSideBarTitle] = useState(asideLinks[0].text);

  function asideToggle(e) {
    Access.handlerWrapper(e, setWrapperToggle);
  }
  return (
    <>
      <div className="fixed top-[10px] right-2 bg-neutral-300 rounded">
        <MoreOptsBtn func={asideToggle} type="lines" />
      </div>

      <div
        onClick={(e) => Access.closeWrapper(e, setWrapperToggle)}
        className={`${
          wrapperToggle
            ? "moblet:opacity-100 moblet:z-30"
            : "moblet:opacity-0 moblet:-z-10"
        } side_bar_wrapper border-r-2 border-neutral-500 close-on-click`}
      >
        <div
          className={`${
            wrapperToggle ? "moblet:ml-0" : "moblet:-ml-60"
          } template_side_bar justify-center bg-slate-100 transition-all`}
        >
          {/* titulo */}
          <h1 className="w-full h-full grid place-items-center text-2xl tracking-wider font-bold uppercase">
            {sideBarTitle}
          </h1>
          <div>
            <div className="grid w-full">
              {asideLinks.map((i) => (
                /* links */
                <Link
                key={`finnance_link${i.id}`}
                  href={`/finnance/${i.link}`}
                  className="w-full py-2 border-b-2 border-neutral-500 text-center text-lg capitalize bg_hover close-on-click"
                >
                  {i.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
