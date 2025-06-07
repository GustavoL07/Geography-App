import "./Popup.css";
import Country from "../../../../utils/Country/Country";

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
      <p className="popup-title">{country.name.informal}</p>
      <p className="popup-subtitle">{country.getFormatted("capital")}</p>
    </div>
  );
}
