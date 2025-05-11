import "./Card.css";

export default function Card({ isOpen, country, description, setSelectedCountry }) {
  if (!country) return null;
  const attribute = country.getAttribute(description);
  return (
    <div
      className={`container ${!isOpen ? "closed" : ""}`}
      onClick={() => setSelectedCountry(country)}
    >
      <img className="flag" src={country.flag} alt="" />
      <div className="description">
        <p>{country.name.informal}</p>
        <p>{attribute}</p>
      </div>
    </div>
  );
}
