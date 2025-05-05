import "./Sidebar.css";
import Card from "../Card/Card.jsx";
import ToggleButton from "../ToggleButton/ToggleButton.jsx";
import Search from "../Search/Search.jsx";

export default function Sidebar({ isOpen, toggleSidebar, countryList, setSelectedCountry }) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-top">
        <ToggleButton toggleSidebar={toggleSidebar} />
        <Search isOpen={isOpen} />
      </div>

      {countryList ? (
        <div>
          <ul>
            {countryList.map((country, index) => {
              return (
                <li key={index}>
                  <Card isOpen={isOpen} country={country} setSelectedCountry={setSelectedCountry} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </aside>
  );
}
