import "./InfoBox.css";

export default function InfoBox({ text, value }) {
  return (
    <div className="info-box">
      <p><strong>{text}</strong> {value}</p>
    </div>
  );
}
