import "./Info.css";
export default function Info({ country }) {
  return (
    <div className="info-container">
      <div className="info-wrapper">
        <img className="info-flag" src={country.flag} alt={`${country.name.informal}'s flag`} />
        <h1>{country.name.informal}</h1>
        <h2>
          {country.name.formal} ({country.name.symbol})
        </h2>
      </div>

      <section className="info-grid">
        {country.getCapitalsQuantity() === 1 ? (
          <div className="info-box">
            <strong>Capital:</strong> {country.getFormattedCapital()}
          </div>
        ) : (
          <div className="info-box">
            <strong>Capitals:</strong> {country.getFormattedCapital()}
          </div>
        )}
        <div className="info-box">
          <strong>Continent:</strong> {country.continent}
        </div>
        <div className="info-box">
          <strong>Subregion:</strong> {country.geography.position.region}
        </div>

        <div className="info-box">
          <strong>Population:</strong> {country.getFormattedPopulation()}
        </div>
        <div className="info-box">
          <strong>Area:</strong> {country.getFormattedArea()}
        </div>
        <div className="info-box">
          <strong>Population Density:</strong> {country.getFormattedPopulationDensity()} 
        </div>

        {country.getLanguagesQuantity() === 1 ? (
          <div className="info-box">
            <strong>Language:</strong> {country.getFormattedLanguage()}
          </div>
        ) : (
          <div className="info-box">
            <strong>Languages:</strong> {country.getFormattedLanguage()}
          </div>
        )}
        <div className="info-box">
          <strong>Currency:</strong> {country.money.name} ({country.money.symbol})
        </div>
        {country.geography.timezone.length === 1 ? (
          <div className="info-box">
            <strong>Timezone:</strong> {country.geography.timezone[0]}
          </div>
        ) : (
          <div className="info-box">
            <strong>Timezones:</strong> {country.geography.timezone.join(", ")}
          </div>
        )}

        <div className="info-box">
          <strong>Latitude:</strong> {country.getFormattedPosition("latitude")}
        </div>
        <div className="info-box">
          <strong>Longitude:</strong> {country.getFormattedPosition("longitude")}
        </div>
        <div className="info-box">
          <p>
            <strong>Borders:</strong>{" "}
            {country.geography.borders.names.length > 0
              ? country.geography.borders.names.join(", ")
              : "None"}
          </p>
        </div>
      </section>
    </div>
  );
}
