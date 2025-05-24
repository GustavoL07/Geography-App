import { memo } from "react";
import { useCountryContext } from "../../Contexts/CountryContext";
import "./Card.css";

export default function Card({ isOpen, country, description }) {
  if (!country) return null;
  const { selectedCountry, setSelectedCountry } = useCountryContext();

  const isSelected = country === selectedCountry;

  const handleClick = () => {    
    setSelectedCountry(country);
  };

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
        <p>{country.name.informal}</p>
      </div>
    </div>
  );
}
