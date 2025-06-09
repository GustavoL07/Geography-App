import "./InfoBox.css";

interface Props {
  text: string;
  value: string;
}
export default function InfoBox({ text, value }: Props) {
  return (
    <div className="info-box">
      <p>
        <strong>{text}</strong> {value}
      </p>
    </div>
  );
}
