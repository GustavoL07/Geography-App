import "./Card.css";

export default function Card({
  isOpen,
  country,
  description,
  selectedCountry,
  setSelectedCountry,
}) {
  if (!country) return null;
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
