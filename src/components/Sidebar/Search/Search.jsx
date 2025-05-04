import "./Search.css";

export default function Search({isOpen}) {
  return (
    <div className={`search-wrapper ${!isOpen ? "closed" : ""}`}>
      <i className={`fas fa-search search-icon ${!isOpen ? "closed" : ""}`}></i>
      <input className="search-input" type="text" placeholder="Search..." />
    </div>
  );
}
