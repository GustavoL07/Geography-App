import "./Popup.css";
import Country from "../../../../utils/Country/Country";

type Props = {
  country: Country;
};

export default function Popup({ country }: Props) {
  return (
    <div className="popup-wrapper">
      <img className="popup-flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
      <p className="popup-title">{country.name.informal}</p>
      <p className="popup-subtitle">{country.getFormatted("capital")}</p>
    </div>
  );
}
