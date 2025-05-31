import "./Sidebar.css";
import Button from "../../CustomButton/Button";
import Card from "../Card/Card.js";
import Search from "../Inputs/Search/Search.js";
import Sort from "../Inputs/Sort/Sort.js";
import Results from "../Results/Results.js";
import { useCountryContext } from "../../Contexts/CountryContext.js";

interface Sidebar {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: Sidebar) {
  const { searchValue, filteredCountries } = useCountryContext();
  const sidebarIcon = <i className="fa-solid fa-bars"></i>;

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-top">
        <div className={`btns-wrapper ${isOpen ? "" : "off"}`}>
          <Button
            icon={sidebarIcon}
            onClick={() => {
              toggleSidebar();
            }}
          />
        </div>
        <Search isOpen={isOpen} />
        <Sort isOpen={isOpen} />
        {searchValue && isOpen && <Results value={filteredCountries.length} />}
      </div>

      {filteredCountries ? (
        <ul>
          {filteredCountries.map((country, index) => {
            return (
              <li key={index}>
                <Card isOpen={isOpen} country={country} />
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
