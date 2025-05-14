import { useCountryContext } from "../../../Contexts/CountryContext.jsx";
import "./FullCountryInfo.css";
import InfoBox from "../InfoBox/InfoBox.jsx";
import CountryOverview from "../Overview/CountryOverview.jsx";

export default function FullCountryInfo({}) {
  const { selectedCountry } = useCountryContext();
  return (
    <div className="info-container">
      <CountryOverview country={selectedCountry} />

      <section className="info-grid">
        <InfoBox
          text={selectedCountry.getCapitalsQuantity() === 1 ? "Capital:" : "Capitals:"}
          value={selectedCountry.getFormattedCapital()}
        />
        <InfoBox text={"Continent: "} value={selectedCountry.getFormattedContinent()} />
        <InfoBox text={"Subregion: "} value={selectedCountry.geography.position.region} />
        <InfoBox text={"Population: "} value={selectedCountry.getFormattedPopulation()} />
        <InfoBox text={"Area: "} value={selectedCountry.getFormattedArea()} />
        <InfoBox
          text={"Population Density: "}
          value={selectedCountry.getFormattedPopulationDensity()}
        />
        <InfoBox
          text={
            selectedCountry.getLanguagesQuantity() === 1
              ? "Language:"
              : `Languages (${selectedCountry.getLanguagesQuantity()}):`
          }
          value={selectedCountry.getFormattedLanguage()}
        />
        <InfoBox text={"Currency: "} value={selectedCountry.getFormattedCurrency()} />
        <InfoBox
          text={
            selectedCountry.getTimezonesQuantity() === 1
              ? "Timezone:"
              : `Timezones (${selectedCountry.getTimezonesQuantity()}):`
          }
          value={selectedCountry.getFormattedTimezone()}
        />
        <InfoBox text={"Latitude: "} value={selectedCountry.getFormattedPosition("latitude")} />
        <InfoBox text={"Longitude: "} value={selectedCountry.getFormattedPosition("longitude")} />
        <InfoBox
          text={
            selectedCountry.getBordersQuantity() > 0
              ? `Borders (${selectedCountry.getBordersQuantity()}) :`
              : "Borders:"
          }
          value={selectedCountry.getFormattedBorder()}
        />
      </section>
    </div>
  );
}
