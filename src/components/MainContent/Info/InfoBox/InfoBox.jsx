import "./InfoBox.css";

export default function InfoBox({ text, value }) {
  return (
    <div className="info-box">
      <strong>{text}</strong> {value}
    </div>
  );
}
