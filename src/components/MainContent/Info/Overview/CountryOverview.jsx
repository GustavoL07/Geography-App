import "./CountryOverview.css";
export default function CountryOverview({ country }) {
  return (
    <div className="overview-wrapper">
      <img className="overview-flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
      <p className="overview-title">{country.name.informal}</p>
      <p className="overview-subtitle">
        {country.name.formal} ({country.name.symbol})
      </p>
    </div>
  );
}
