import "./CountryOverview.css";
export default function CountryOverview({ country }) {
  return (
    <div className="overview-wrapper">
      <img className="overview-flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
      <h1>{country.name.informal}</h1>
      <h2>
        {country.name.formal} ({country.name.symbol})
      </h2>
    </div>
  );
}
