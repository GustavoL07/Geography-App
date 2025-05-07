import "./Info.css";
import InfoBox from "./InfoBox/InfoBox.jsx";
import CountryOverview from "./Overview/CountryOverview.jsx";

export default function Info({ country }) {
  return (
    <div className="info-container">
      <CountryOverview country={country} />

      <section className="info-grid">
        <InfoBox
          text={country.getCapitalsQuantity() === 1 ? "Capital" : "Capitals"}
          value={country.continent}
        />
        <InfoBox text={"Continent: "} value={country.continent} />
        <InfoBox text={"Subregion: "} value={country.geography.position.region} />
        <InfoBox text={"Population: "} value={country.getFormattedPopulation()} />
        <InfoBox text={"Area: "} value={country.getFormattedArea()} />
        <InfoBox text={"Population Density: "} value={country.getFormattedPopulationDensity()} />
        <InfoBox
          text={country.getLanguagesQuantity() === 1 ? "Language" : "Languages"}
          value={country.getFormattedLanguage()}
        />
        <InfoBox text={"Currency: "} value={country.getFormattedCurrency()} />
        <InfoBox
          text={country.getTimezonesQuantity() === 1 ? "Timezone" : "Timezones"}
          value={country.getFormattedTimezone()}
        />
        <InfoBox text={"Latitude: "} value={country.getFormattedPosition("latitude")} />
        <InfoBox text={"Longitude: "} value={country.getFormattedPosition("longitude")} />
        <InfoBox text={"Borders: "} value={country.getFormattedBorder()} />
      </section>
    </div>
  );
}
