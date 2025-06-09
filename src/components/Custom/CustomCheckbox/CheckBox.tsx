import "./CheckBox.css";

type Props = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};
export default function CheckBox({ id, checked, onChange }: Props) {
  return (
    <div className="checkbox-wrapper-3">
      <input
        type="checkbox"
        id={id}
        className="switch-toggle"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="switch-label">
        <span></span>
      </label>
    </div>
  );
}
