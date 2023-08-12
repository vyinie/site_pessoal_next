import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SetDisplayToggle } from "/src/functions/SetToggles.jsx";

export default function Item({ title, des, id, link, img }) {
  const projectRef = useRef();

  // ============= mostra a descrição do projeto =============
  const [descToggle, setDescToggle] = useState(false);
  useEffect(() => {
    SetDisplayToggle(projectRef, descToggle);
  }, [descToggle]);

  // ============= retorno =============
  return (
    <div className="itemBox">
      <Link to={link} id={`itemBox${id}`} className="boxLink">
        <img className="itemImg" src={img} alt="coisa" />
      </Link>
      <div className="titleContainer">
        <p className="projectItemTitle">{title}</p>
        <span
          // mostra ou n a descrição
          onClick={() => setDescToggle(!descToggle)}
          onMouseOut={() => setDescToggle(false)}
          className="descBtn"
        >
          i
        </span>
      </div>
      <div ref={projectRef} className="description">
        <p className="descText">{des}</p>
      </div>
    </div>
  );
}
