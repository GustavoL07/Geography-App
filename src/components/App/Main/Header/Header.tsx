import "./Header.css";
import Button from "@/components/Custom/Button/Button";
import Dialog from "@/components/Custom/CustomDialog/Dialog";
import SettingsOptions from "../../../Custom/CustomDialog/SettingsDialog/SettingsOptions.js";
import { useState } from "react";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import earthGlobe from "@/assets/earth-globe.png";

type Props = {
  title?: string;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};
export default function Header({ closeSidebar, isSidebarOpen, title = "Geography App" }: Props) {
  const { setSelectedCountry, countryList } = useCountryContext();
  const { setDisplayMode, setSearchValue } = useSettingsContext();
  const [dialogToggle, setDialogToggle] = useState(false);

  const mapIcon = <i className="fa-solid fa-map-location-dot"></i>;
  const introIcon = <i className="fa-solid fa-globe"></i>;
  const settingsIcon = <i className="fa-solid fa-gear"></i>;
  const compareIcon = <i className="fa-solid fa-chart-pie"></i>;

  return (
    <div className={`header-container ${isSidebarOpen ? "closed" : ""}`}>
      <img src={earthGlobe} alt="" />
      <p>{title}</p>
      <div className="opt-btns">
        <Button
          icon={introIcon}
          onClick={() => {
            setDisplayMode("intro");
            setSelectedCountry(null);
          }}
        />

        {countryList && (
          <Button
            icon={mapIcon}
            onClick={() => {
              closeSidebar();
              setTimeout(() => {
                setDisplayMode("worldMap");
                setSelectedCountry(null);
                setSearchValue(""); // time for the sidebar to close completely and avoid map colors to go missing
              }, 0.6 * 1000);
            }}
          />
        )}

        <Button
          icon={compareIcon}
          onClick={() => {
            setDisplayMode("compare");
            setSelectedCountry(null);
          }}
        />

        <Button
          icon={<i className="fa-solid fa-star"></i>}
          onClick={() => {
            setDisplayMode("favorite");
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
