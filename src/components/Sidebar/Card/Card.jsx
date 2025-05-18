import { memo, useMemo } from "react";
import { useCountryContext } from "../../Contexts/CountryContext";
import "./Card.css";

function Card({ isOpen, country, description }) {
  const { selectedCountry, setSelectedCountry } = useCountryContext();

  const attribute = useMemo(() => {
    return country?.getAttribute(description);
  }, [country, description]);

  if (!country) return null;

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
        <p>{attribute}</p>
      </div>
    </div>
  );
}

export default memo(Card);
