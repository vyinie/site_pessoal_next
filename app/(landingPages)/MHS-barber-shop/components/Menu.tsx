'use client'

import { useEffect, useState } from "react";

export function BSMenu() {
    const servicos = [
      {
        title: "cabelo",
        items: [
          { name: "infantil", price: "R$ 20" },
          { name: "corte", price: "R$ 25" },
          { name: "escova", price: "R$ 30" },
          { name: "hidratação", price: "R$ 30" },
          { name: "coloração", price: "R$ 40" },
        ],
      },
      {
        title: "barba",
        items: [
          { name: "aparo", price: "R$ 20" },
          { name: "corte", price: "R$ 25" },
          { name: "hidratação", price: "R$ 30" },
          { name: "coloração", price: "R$ 40" },
        ],
      },
    ];
  
    // scrolla o menu
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
      document.querySelector(".BSbtnArrowLeft").style.display =
        scroll === 0 ? "none" : "block";
  
      document.querySelector(".BSbtnArrowRigth").style.display =
        scroll === servicos.length - 1 ? "none" : "block";
    }, [scroll]);
  
    function scrollMenu(direction) {
      const el = document.querySelector(".BScardsContainer");
  
      const toScroll = (el.scrollWidth + 10) / servicos.length;
      el.scrollBy(direction === "left" ? -toScroll : toScroll, 0);
      setScroll((old) => (direction === "left" ? old - 1 : old + 1));
    }
    return (
      <>
        <div className="BScardsContainer">
          {servicos.map((i) => (
            <div key={i.title} className="menuCard">
              <h1 className="BScardTitle">{i.title}</h1>
  
              <table className="BScardItems">
                <tbody className="BStbody">
                  {i.items.map((t) => (
                    <tr className="BSitem" key={t.name}>
                      <td className="BSitemName">{t.name}</td>
  
                      <td className="itemDiv">•</td>
  
                      <td>{t.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
  
        {/* ====== setas pro scroll do mobile ====== */}
        <div onClick={scrollMenu} className="BSbtnArrowRigth"></div>
        <div onClick={() => scrollMenu("left")} className="BSbtnArrowLeft"></div>
      </>
    );
  }
  