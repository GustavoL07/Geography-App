import "./Dialog.css";
import { useEffect, useRef } from "react";

export default function Dialog({ title, isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
    } else {
      if (dialogRef.current.open) {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    if (onClose) onClose();
  };

  return (
    <dialog ref={dialogRef}>
      <div className="btn-wrapper">
        <p>{title}</p>
        <button onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {children}
    </dialog>
  );
}
