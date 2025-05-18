import "./SettingsButton.css";
import Dialog from "../../../../CustomDialog/Dialog";
import { useState } from "react";

export default function SettingsButton({ isVisible }) {
  const [dialogToggle, setDialogToggle] = useState(false);

  function openSettings() {
    setDialogToggle(true);
  }

  function closeSettings() {
    setDialogToggle(false);
  }

  return (
    <>
      <button onClick={openSettings} className={`settings-btn ${isVisible ? "" : "off"}`}>
        <i className="fa-solid fa-gear"></i>
      </button>
      <Dialog title={"Settings"} isOpen={dialogToggle} onClose={closeSettings}>
        AAA
      </Dialog>
    </>
  );
}
