import {ArrowForwardIos} from "@mui/icons-material";

export default function ToDoArrowBtn({
  left,
  className,
}: {
  left?: boolean;
  className?: string;
}) {
  function scroll() {
    const el = document.getElementsByClassName("list");
    if (left) {
      el.item(0)?.scrollBy(-580, 0);
    } else {
      el.item(0)?.scrollBy(580, 0);
    }
  }
  return (
    <div
      className={`
      ${className || ""}
      absolute top-0 
      ${left ? "-left-24" : "-right-12"}
      btn_hover_md items-center bg-pink-800 h-full w-min moblet:hidden`}
      onClick={scroll}
    >
      <ArrowForwardIos
        className={`${left ? "rotate-180" : ""}`}
        style={{ fontSize: "40px" }}
      />
    </div>
  );
}
