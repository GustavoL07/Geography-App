import "./FullCountryInfo.css";
import { useCountryContext } from "../../../Contexts/CountryContext.jsx";
import InfoBox from "../InfoBox/InfoBox.jsx";
import CountryOverview from "../Overview/CountryOverview.jsx";
import { formatOptions } from "../../../../utils/Organizing/formatter.js";

export default function FullCountryInfo({}) {
  const { selectedCountry } = useCountryContext();
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
