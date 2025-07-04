import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import ROUTES from "@/routes";
import earthGlobe from "@/assets/earth-globe.png";
import Button from "@/components/Custom/Button/Button";
import Dialog from "@/components/Custom/CustomDialog/Dialog";
import SettingsOptions from "@/components/Custom/CustomDialog/SettingsDialog/SettingsOptions";

type Props = {
  title?: string;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};
export default function Header({ closeSidebar, isSidebarOpen, title = "Geography App" }: Props) {
  const navigate = useNavigate();
  const { countryList } = useCountryContext();
  const [dialogToggle, setDialogToggle] = useState(false);

  const mapIcon = <i className="fa-solid fa-map-location-dot"></i>;
  const introIcon = <i className="fa-solid fa-globe"></i>;
  const settingsIcon = <i className="fa-solid fa-gear"></i>;
  const compareIcon = <i className="fa-solid fa-chart-pie"></i>;
  const starIcon = <i className="fa-solid fa-star"></i>;

  const navToIntro = () => navigate(ROUTES.HOME);
  const navToCompare = () => navigate(ROUTES.COMPARE);
  const navToWorldMap = () => navigate(ROUTES.WORLDMAP);
  const navToFavorites = () => navigate(ROUTES.FAVORITES);

  return (
    <div className={`header-container ${isSidebarOpen ? "closed" : ""}`}>
      <img src={earthGlobe} alt="" />
      <p>{title}</p>
      <div className="opt-btns">
        <Button
          icon={introIcon}
          onClick={() => {
            navToIntro();
          }}
        />

        {countryList && (
          <Button
            icon={mapIcon}
            onClick={() => {
              closeSidebar();
              setTimeout(() => {
                navToWorldMap();
              }, 0.6 * 1000);
            }}
          />
        )}

        <Button
          icon={compareIcon}
          onClick={() => {
            navToCompare();
          }}
        />
        <Button
          icon={starIcon}
          onClick={() => {
            navToFavorites();
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
