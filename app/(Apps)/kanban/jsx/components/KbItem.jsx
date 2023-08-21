/* ================ materialUI ================ */
import { Popover } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

/* ================ react ================ */
import { useState } from "react";

const KbItem = ({ text, id, items, cardId, itemId, lists, setLists }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const open = Boolean(anchorEl);

  function delItem(e) {
    const newItemArr = items.filter((i) => i.id != id);

    items = newItemArr;
    /* gambiarra */
    localStorage.setItem("lists", JSON.stringify(lists));
    setLists(()=>JSON.parse(localStorage.getItem("lists")));

    setAnchorEl(null);
    console.log(items);
  }

  return (
    <div id={`item${id}`} className="cardItem">
      <p className="kbItemText">{text}</p>
      <MoreVertOutlinedIcon onClick={handleClick} className="kbMoreOpt" />
      <Popover
        sx={{ boxShadow: "none" }}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div className="kbPopover">
          <span className="dadCover">
            <div
              onClick={delItem}
              id={"deletbtn" + id}
              className="btnHover cover"
            ></div>
            <DeleteIcon />
          </span>
          <hr />
          <span className="dadCover">
            <div id={"editbtn" + id} className="btnHover cover"></div>
            <EditIcon className="btnHover" />
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default KbItem;
