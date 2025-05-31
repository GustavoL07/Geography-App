import "./Header.css";
import Button from "../CustomButton/Button";
import Dialog from "../CustomDialog/Dialog";
import { useCountryContext } from "../Contexts/CountryContext";
import { useState } from "react";

type Props = {
  title?: string;
  isSidebarOpen: boolean;
};

export default function Header({ isSidebarOpen, title = "Geography App" }: Props) {
  const { setDisplayMode, setSelectedCountry } = useCountryContext();
  const [dialogToggle, setDialogToggle] = useState(false);

  const mapIcon = <i className="fa-solid fa-map-location-dot"></i>;
  const introIcon = <i className="fa-solid fa-globe"></i>;
  const settingsIcon = <i className="fa-solid fa-gear"></i>;

  return (
    <div className={`header-container ${isSidebarOpen ? "closed" : ""}`}>
      <img src="public/earth-globe.png" alt="" />
      <p>{title}</p>
      <div className="opt-btns">
        <Button icon={mapIcon} />

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
        ></Dialog>
      </div>
    </div>
  );
}
