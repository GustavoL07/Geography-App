import "./Sidebar.css";
import Card from "../Card/Card.jsx";
import ToggleButton from "../Inputs/Buttons/ToggleButton/ToggleButton.jsx";
import SettingsButton from "../Inputs/Buttons/SettingsButton/SettingsButton.jsx";
import Search from "../Inputs/Search/Search.jsx";
import Sort from "../Inputs/Sort/Sort.jsx";
import Results from "../Results/Results.jsx";
import StartButton from "../Inputs/Buttons/DefaultPageButton/StartButton.jsx";
import { useCountryContext } from "../../Contexts/CountryContext.jsx";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { searchValue, filteredCountries, sortValue } = useCountryContext();
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
        {searchValue && isOpen && (<Results value={filteredCountries.length} />)}
      </div>

      
      {filteredCountries ? (
        <ul>
          {filteredCountries.map((country, index) => {
            return (
              <li key={index}>
                <Card isOpen={isOpen} country={country} description={sortValue} />
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
