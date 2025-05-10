import "./Sort.css";
import Country from "../../../utils/Country.js";

export default function Sort({ isOpen, sortValue, setSortValueOnChange }) {
  return (
    <div className={`select-wrapper ${isOpen ? "" : "closed"}`}>
      <i className="fa-solid fa-square-caret-down sort-icon"></i>
      <select
        id="sort"
        className="sort-input"
        value={sortValue}
        onChange={(e) => setSortValueOnChange(e.target.value)}
      >
        <option value="">Sort...</option>
        {Country.SORT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}
