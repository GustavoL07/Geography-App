import "./Popup.css";
import { Country } from "@/types";

type Props = {
  country: Country;
  handleImageClick: (c: Country) => void;
};

export default function Popup({ country, handleImageClick }: Props) {
  return (
    <div className="popup-wrapper">
      <img
        className="popup-flag"
        onClick={() => handleImageClick(country)}
        src={country.flag}
        alt={`${country.name.informal}'s flag`}
      />
      <p id="popup-title">{country.name.informal}</p>
      <p id="popup-subtitle">{country.capital[0]}</p>
    </div>
  );
}
