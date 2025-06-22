import "./Bottom.css";

type Props = {
  isOpen: boolean;
  text?: string;
};
export default function Bottom({ isOpen, text = "" }: Props) {
  if (!isOpen) return;
  return (
    <div className="bottom">
      <p className="text">{text}</p>
    </div>
  );
}
