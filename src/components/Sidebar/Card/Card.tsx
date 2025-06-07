import Country from "../../../utils/Country/Country";
import { getFormatOption } from "../../../utils/Organizing/sorter";
import { useCountryContext } from "../../Contexts/CountryContext";
import { useSettingsContext } from "../../Contexts/SettingsContext";
import "./Card.css";

interface Card {
  isOpen: boolean;
  country: Country;
}

export default function Card({ isOpen, country }: Card) {
  if (!country) return null;
  const { selectedCountry, setSelectedCountry } = useCountryContext();
  const { sortValue, setDisplayMode } = useSettingsContext();
  const isSelected = country === selectedCountry;

  const handleClick = () => {
    setSelectedCountry(country);
    setDisplayMode("full");
  };

  function getDescription() {
    const formatOption = getFormatOption(sortValue);
    return country.getFormatted(formatOption);
  }

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
        <p>{getDescription()}</p>
      </div>
    </div>
  );
}
