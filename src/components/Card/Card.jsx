import "./Card.css";

export default function Card({ isOpen, country, setSelectedCountry }) {
  return (
    <div className={`container ${!isOpen ? "closed" : ""}`} onClick={() => setSelectedCountry(country)}>
      <img className="flag" src={country.flag} alt="" />
      <div className="description">
        <p>{country.name.informal}</p>
        <p>{country.capital}</p>
      </div>
    </div>
  );
}
