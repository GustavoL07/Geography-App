import "./FullCountryInfo.css";
import { useCountryContext } from "../../../Contexts/CountryContext.js";
import { formatOptions } from "../../../../utils/Organizing/formatter.js";
import CountryOverview from "../Overview/CountryOverview.js";
import InfoBox from "../InfoBox/InfoBox.js";
import Map from "../../../Maps/Map";

export default function FullCountry({}) {
  const { selectedCountry } = useCountryContext();
  if (!selectedCountry) return null;

  return (
    <div className="info-container">
      <CountryOverview country={selectedCountry} />

      <section className="info-grid">
        {formatOptions.map((obj, index) => {
          if (obj.key === "name") return null;

          return (
            <InfoBox
              key={index}
              text={`${obj.text}:`}
              value={selectedCountry.getFormatted(obj.key)}
            />
          );
        })}
      </section>

      <Map />
    </div>
  );
}
