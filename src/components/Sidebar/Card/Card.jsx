import "./Card.css";

export default function Card({ isOpen, country, setSelectedCountry }) {
  if (!country) return null;
  
  return (
    <div className={`container ${!isOpen ? "closed" : ""}`} onClick={() => setSelectedCountry(country)}>
      <img className="flag" src={country.flag} alt="" />
      <div className="description">
        <p>{country.name.informal}</p>
        {country.capital.lenght === 1 ? (
          <p>{country.capital[0]}</p>
        ) : (
          <p>{country.capital.join(", ")}</p>
        )}
      </div>
    </div>
  );
}
