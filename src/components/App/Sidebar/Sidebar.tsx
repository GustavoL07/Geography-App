import "./Sidebar.css";
import Button from "@/components/Custom/CustomButton/Button";
import Search from "./Inputs/Search/Search";
import Sort from "./Inputs/Sort/Sort";
import Card from "./Card/Card";
import Results from "./Results/Results";
import { useSettingsContext } from "../../Contexts/SettingsContext";

interface Sidebar {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export default function Sidebar({ isOpen, toggleSidebar }: Sidebar) {
  const { filteredList, searchValue, setSearchValue } = useSettingsContext();
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

        {isOpen === true ? (
          <Search
            value={searchValue}
            onSearch={setSearchValue}
            resetSearch={() => setSearchValue("")}
          />
        ) : (
          <i className="fas fa-search search-icon"></i>
        )}

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
