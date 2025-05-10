import { useState } from "react";
import "./ToggleButton.css";

export default function ToggleButton({ toggleSidebar }) {
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
