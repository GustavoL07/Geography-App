import "./Sort.css";

export default function Sort({ isOpen, onChange}){
  return(
    <div className={`select-wrapper ${isOpen ? "" : "closed"}`}>
      <i class="fa-solid fa-square-caret-down sort-icon"></i>
      <select className="sort-input">
        <option value="">Sort...</option>
        <option value="">A</option>
        <option value="">A</option>
      </select>
    </div>
  )
}