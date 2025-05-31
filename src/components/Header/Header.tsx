import "./Header.css";
import Button from "../CustomButton/Button";

type Props = {
  title?: string;
  isSidebarOpen: boolean;
};

export default function Header({ isSidebarOpen, title = "Geography App" }: Props) {
  const btnIcon = <i className="fa-solid fa-map-location-dot"></i>;
  return (
    <div className={`header-container ${isSidebarOpen ? "closed" : ""}`}>
      <img src="public/earth-globe.png" alt="" />
      <p>{title}</p>
      <div className="opt-btns">
        <Button icon={btnIcon} />
      </div>
    </div>
  );
}
