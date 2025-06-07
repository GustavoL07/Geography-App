import "./Header.css";
import Button from "../CustomButton/Button";
import Dialog from "../CustomDialog/Dialog";
import SettingsOptions from "../CustomDialog/SettingsDialog/SettingsOptions.js";
import { useCountryContext } from "../Contexts/CountryContext";
import { useState } from "react";
import { useSettingsContext } from "../Contexts/SettingsContext";

type Props = {
  title?: string;
  isSidebarOpen: boolean;
};

export default function Header({ isSidebarOpen, title = "Geography App" }: Props) {
  const { setSelectedCountry, countryList } = useCountryContext();
  const { setDisplayMode, setSearchValue } = useSettingsContext();
  const [dialogToggle, setDialogToggle] = useState(false);

  const mapIcon = <i className="fa-solid fa-map-location-dot"></i>;
  const introIcon = <i className="fa-solid fa-globe"></i>;
  const settingsIcon = <i className="fa-solid fa-gear"></i>;

  return (
    <div className={`header-container ${isSidebarOpen ? "closed" : ""}`}>
      <img src="/earth-globe.png" alt="" />
      <p>{title}</p>
      <div className="opt-btns">
        {countryList && (
          <Button
            icon={mapIcon}
            onClick={() => {
              setDisplayMode("worldMap");
              setSelectedCountry(null);
              setSearchValue("");
            }}
          />
        )}

        <Button
          icon={introIcon}
          onClick={() => {
            setDisplayMode("intro");
            setSelectedCountry(null);
          }}
        />

        <Button
          icon={settingsIcon}
          onClick={() => {
            setDialogToggle(!dialogToggle);
          }}
        />
        <Dialog
          title={"Settings"}
          isOpen={dialogToggle}
          onClose={() => {
            setDialogToggle(false);
          }}
        >
          <SettingsOptions />
        </Dialog>
      </div>
    </div>
  );
}
