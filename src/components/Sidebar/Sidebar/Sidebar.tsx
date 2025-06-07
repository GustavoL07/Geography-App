import "./Sidebar.css";
import Button from "../../CustomButton/Button";
import Card from "../Card/Card.js";
import Search from "../Inputs/Search/Search.js";
import Sort from "../Inputs/Sort/Sort.js";
import Results from "../Results/Results.js";
import { useSettingsContext } from "../../Contexts/SettingsContext";

interface Sidebar {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: Sidebar) {
  const { filteredList } = useSettingsContext();
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
      </div>

      {filteredList && (
        <ul>
          {filteredList.map((country, index) => {
            return (
              <li key={index}>
                <Card isOpen={isOpen} country={country} />
              </li>
            );
          })}
        </ul>
      )}

      {isOpen && <Results value={filteredList?.length} />}
    </aside>
  );
}
