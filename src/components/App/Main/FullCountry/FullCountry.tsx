import "./FullCountry.css";
import { useCountryContext } from "../../../Contexts/CountryContext.js";
import { formatOptions } from "@/utils/Organizing/formatter";
import Overview from "./Overview/Overview";
import InfoBox from "./InfoBox/InfoBox";
import Map from "@/components/App/Main/FullCountry/Map/Map";

export default function FullCountry({}) {
  const { selectedCountry } = useCountryContext();
  if (!selectedCountry) return null;

  return (
    <div className="info-container">
      <Overview country={selectedCountry} />

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
