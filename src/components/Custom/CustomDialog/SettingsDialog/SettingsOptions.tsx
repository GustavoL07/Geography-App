import "./SettingsOptions.css";
import Button from "@/components/Custom/Button/Button";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { clearLocalStorage } from "@/components/Hooks/useLocalStorage";
import Menu from "../../Menu/Menu";
import CheckBox from "../../Checkbox/CheckBox";

function OptionSelect({}) {
  const { mapTile, setMapTile } = useSettingsContext();
  const menuIcon = <i className="fas fa-sort"></i>;
  const menuTitle = `${mapTile.charAt(0).toUpperCase()}${mapTile.slice(1)}`;

  return (
    <div className="opt-sel-wrapper">
      <Menu icon={menuIcon} text={menuTitle}>
        <div className="menu-child-wrapper">
          <p
            className={`menu-map-opt ${mapTile === "light" ? "active" : ""}`}
            onClick={() => setMapTile("light")}
          >
            Light
          </p>
          <p
            className={`menu-map-opt ${mapTile === "dark" ? "active" : ""}`}
            onClick={() => setMapTile("dark")}
          >
            Dark
          </p>
          <p
            className={`menu-map-opt ${mapTile === "earth" ? "active" : ""}`}
            onClick={() => setMapTile("earth")}
          >
            Earth
          </p>
        </div>
      </Menu>
    </div>
  );
}

export default function SettingsOptions({}) {
  const { toggleTheme, cityImageVisibility, toggleCityVisibility } = useSettingsContext();
  return (
    <div>
      <div className="option-wrapper">
        <p className="title">Map Mode</p>
        <OptionSelect />
      </div>

      <div className="option-container">
        <CheckBox
          id="cityImage"
          checked={cityImageVisibility}
          onChange={() => toggleCityVisibility()}
        />
        <p>City Capital Image</p>
      </div>

      <div className="option-container">
        <p>Toggle:</p>
        <Button icon={<i className="fa-solid fa-lightbulb"></i>} onClick={() => toggleTheme()} />
      </div>

      <div className="option-container">
        <p>Reset to Default:</p>
        <Button
          icon={<i className="fa fa-refresh" aria-hidden="true"></i>}
          onClick={() => clearLocalStorage()}
        />
      </div>
    </div>
  );
}
