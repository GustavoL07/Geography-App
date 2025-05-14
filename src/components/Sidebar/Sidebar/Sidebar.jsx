import "./Sidebar.css";
import Card from "../Card/Card.jsx";
import ToggleButton from "../ToggleButton/ToggleButton.jsx";
import Search from "../Search/Search.jsx";
import Sort from "../Sort/Sort.jsx";

import { useCountryContext } from "../../Contexts/CountryContext.jsx";

export default function Sidebar({
  isOpen,
  toggleSidebar,
}) {
  const {filteredCountries, sortValue} = useCountryContext();
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-top">
        <ToggleButton toggleSidebar={toggleSidebar} />
        <Search isOpen={isOpen} />
        <Sort isOpen={isOpen} />
      </div>

      {filteredCountries ? (
        <ul>
          {filteredCountries.map((country, index) => {
            return (
              <li key={index}>
                <Card
                  isOpen={isOpen}
                  country={country}
                  description={sortValue}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </aside>
  );
}
