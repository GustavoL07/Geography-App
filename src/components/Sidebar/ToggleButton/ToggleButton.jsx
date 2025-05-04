import "./ToggleButton.css";

export default function ToggleButton({ toggleSidebar }) {
  return (
    <div className={`btn-wrapper`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  );
}
