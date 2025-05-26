import "./FullCountryInfo.css";
import { useCountryContext } from "../../../Contexts/CountryContext.js";
import { formatOptions } from "../../../../utils/Organizing/formatter.js";
import CountryOverview from "../Overview/CountryOverview.js";
import InfoBox from "../InfoBox/InfoBox.js";

export default function FullCountryInfo({}) {
  const { selectedCountry } = useCountryContext();
  if (!selectedCountry) return null;

  return (
    <div className="info-container">
      <CountryOverview country={selectedCountry} />

      <section className="info-grid">
        {formatOptions.map((obj, index) => {
          return (
            <InfoBox
              key={index}
              text={`${obj.text}:`}
              value={selectedCountry.getFormatted(obj.key)}
            />
          );
        })}
      </section>
    </div>
  );
}
