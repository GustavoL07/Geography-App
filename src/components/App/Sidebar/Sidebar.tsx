import "./Sidebar.css";
import { useSettingsContext } from "../../Contexts/SettingsContext";
import Top from "./Sidebar/Top/Top";
import Card from "./Card/Card";
import Bottom from "./Sidebar/Bottom/Bottom";
import { useNavigate } from "react-router-dom";

interface Sidebar {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export default function Sidebar({ isOpen, toggleSidebar }: Sidebar) {
  const { filteredList } = useSettingsContext();
  const navigate = useNavigate();
  const bottomText = filteredList.length > 0 ? `${filteredList.length} Results` : "No results";

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <Top isOpen={isOpen} toggleIsOpen={toggleSidebar} />

      {filteredList && (
        <ul>
          {filteredList.map((country, index) => {
            return (
              <li key={index} onClick={() => navigate(`/country/${country.name.symbol}`)}>
                <Card isOpen={isOpen} country={country} />
              </li>
            );
          })}
        </ul>
      )}

      <Bottom isOpen={isOpen} text={bottomText} />
    </aside>
  );
}
