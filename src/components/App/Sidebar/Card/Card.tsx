import { Country } from "@/types";
import { getFormatOption } from "@/utils/Organizing/sorter";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import "./Card.css";

interface Card {
  isOpen: boolean;
  country: Country;
}

export default function Card({ isOpen, country }: Card) {
  if (!country) return null;
  const {
    countryList,
    setCountryList,
    selectedCountry,
    setSelectedCountry,
    favoriteList,
    setFavoriteList,
  } = useCountryContext();
  const { sortValue, setDisplayMode } = useSettingsContext();
  const isSelected = country === selectedCountry;

  const handleClick = () => {
    setSelectedCountry(country);
    setDisplayMode("full");
    console.log(selectedCountry);
  };
  const handleFavorite = () => {
    country.setFavorited();
    setFavoriteList(country);
    setCountryList(countryList.map((c) => (c.name.symbol === country.name.symbol ? country : c)));
  };
  const isFavorited = (country: Country) => {
    return favoriteList.some((c) => c.name.symbol === country.name.symbol);
  };

  function getDescription() {
    const formatOption = getFormatOption(sortValue) || "capital";
    return country.getFormatted(formatOption);
  }

  return (
    <div
      className={`card-container ${!isOpen ? "closed" : ""} ${isSelected ? "selected" : ""}`}
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
      <div
        className="favoriting"
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite();
        }}
      >
        <i className={`fa-solid fa-star ${isFavorited(country) ? "yellow" : ""}`}></i>
      </div>
    </div>
  );
}
