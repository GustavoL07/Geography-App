import "./Dialog.css";
import { useEffect, useRef } from "react";
import Button from "../CustomButton/Button";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: any;
}
export default function Dialog({ title, isOpen, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        <p className="title">{title}</p>
        <Button icon={<i className="fa-solid fa-xmark close-icon"></i>} onClick={handleClose} />
      </div>
      {children}
    </dialog>
  );
}
