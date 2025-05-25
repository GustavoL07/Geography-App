import { getFormatOption } from "../../../utils/Organizing/sorter";
import { useCountryContext } from "../../Contexts/CountryContext";
import "./Card.css";

export default function Card({ isOpen, country }) {
  if (!country) return null;
  const { selectedCountry, setSelectedCountry, sortValue } = useCountryContext();

  const isSelected = country === selectedCountry;

  const handleClick = () => {    
    setSelectedCountry(country);
  };

  const description = country.getFormatted(getFormatOption(sortValue)) || country.getFormatted("capital") ;

  return (
    <div
      className={`container ${!isOpen ? "closed" : ""} ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <img
        className="flag"
        src={country.flag}
        alt={`${country.name.informal}'s flag`}
        loading="lazy"
      />
      <div className="description">
        <p>{country.name.informal}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
