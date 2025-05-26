import "./Sidebar.css";
import Card from "../Card/Card.js";
import ToggleButton from "../Inputs/Buttons/ToggleButton/ToggleButton.js";
import SettingsButton from "../Inputs/Buttons/SettingsButton/SettingsButton.js";
import Search from "../Inputs/Search/Search.js";
import Sort from "../Inputs/Sort/Sort.js";
import Results from "../Results/Results.js";
import StartButton from "../Inputs/Buttons/DefaultPageButton/StartButton.js";
import { useCountryContext } from "../../Contexts/CountryContext.js";

interface Sidebar {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export default function Sidebar({ isOpen, toggleSidebar }: Sidebar) {
  const { searchValue, filteredCountries } = useCountryContext();
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-top">
        <div className={`btns-wrapper ${isOpen ? "" : "off"}`}>
          <ToggleButton toggleSidebar={toggleSidebar} />
          <SettingsButton isVisible={isOpen} />
        </div>
        {!isOpen && <StartButton />}
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
