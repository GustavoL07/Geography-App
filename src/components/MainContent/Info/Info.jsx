import "./Info.css";
import InfoBox from "./InfoBox/InfoBox.jsx";
import CountryOverview from "./Overview/CountryOverview.jsx";

export default function Info({ country }) {
  return (
    <div className="info-container">
      <CountryOverview country={country} />

      <section className="info-grid">
        <InfoBox
          text={country.getCapitalsQuantity() === 1 ? "Capital:" : "Capitals:"}
          value={country.getFormattedCapital()}
        />
        <InfoBox text={"Continent: "} value={country.getFormattedContinent()} />
        <InfoBox text={"Subregion: "} value={country.geography.position.region} />
        <InfoBox text={"Population: "} value={country.getFormattedPopulation()} />
        <InfoBox text={"Area: "} value={country.getFormattedArea()} />
        <InfoBox text={"Population Density: "} value={country.getFormattedPopulationDensity()} />
        <InfoBox
          text={
            country.getLanguagesQuantity() === 1
              ? "Language:"
              : `Languages (${country.getLanguagesQuantity()}):`
          }
          value={country.getFormattedLanguage()}
        />
        <InfoBox text={"Currency: "} value={country.getFormattedCurrency()} />
        <InfoBox
          text={
            country.getTimezonesQuantity() === 1
              ? "Timezone:"
              : `Timezones (${country.getTimezonesQuantity()}):`
          }
          value={country.getFormattedTimezone()}
        />
        <InfoBox text={"Latitude: "} value={country.getFormattedPosition("latitude")} />
        <InfoBox text={"Longitude: "} value={country.getFormattedPosition("longitude")} />
        <InfoBox
          text={
            country.getBordersQuantity() > 0
              ? `Borders (${country.getBordersQuantity()}) :`
              : "Borders:"
          }
          value={country.getFormattedBorder()}
        />
      </section>
    </div>
  );
}
