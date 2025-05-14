import { useCountryContext } from "../../Contexts/CountryContext";
import "./Card.css";

export default function Card({
  isOpen,
  country,
  description
}) {
  if (!country) return null;
  const {selectedCountry, setSelectedCountry} = useCountryContext();
  const attribute = country.getAttribute(description);

  return (
    <div
      className={`container ${!isOpen ? "closed" : ""} ${
        country === selectedCountry ? "selected" : ""
      }`}
      onClick={() => setSelectedCountry(country)}
    >
      <img className="flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
      <div className="description">
        <p>{country.name.informal}</p>
        <p>{attribute}</p>
      </div>
    </div>
  );
}
