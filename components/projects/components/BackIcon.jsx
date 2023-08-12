import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function BackIcon({ styles }) {
  const navigate = useNavigate();
  return (
    <div
      style={styles}
      className="backBtn"
      onClick={() => {
        navigate("/");
      }}
    >
      <ArrowBackIcon sx={{ fontSize: "30px" }} />
    </div>
  );
}

export default BackIcon;
