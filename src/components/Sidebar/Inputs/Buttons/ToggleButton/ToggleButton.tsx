import { useState } from "react";
import "./ToggleButton.css";

interface Props {
  toggleSidebar: () => void
}

export default function ToggleButton({ toggleSidebar }: Props) {
  const [btnOn, setBtnOn] = useState(false);
  return (
    <button className={`toggle-btn ${btnOn ? "" : "off"}`} onClick={()=> {
      toggleSidebar();
      setBtnOn(!btnOn)
    }}>
      <i className="fa-solid fa-bars"></i>
    </button>
  );
}
