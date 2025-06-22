import "./FullCountry.css";
import { useCountryContext } from "../../../Contexts/CountryContext.js";
import { FormatOptions } from "@/utils/Organizing/formatter";
import Overview from "./Overview/Overview";
import InfoBox from "./InfoBox/InfoBox";
import Map from "@/components/App/Main/FullCountry/Map/Map";
import Button from "@/components/Custom/Button/Button";

export default function FullCountry({}) {
  const { selectedCountry, setFavoriteCountry } = useCountryContext();
  if (!selectedCountry) return null;

  return (
    <div className="info-container">
      <Overview country={selectedCountry} />

      <section className="info-grid">
        {FormatOptions.map((obj, index) => {
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

      <Map toDisplay={[selectedCountry]} />
      <Button
        icon={<i className="fa-solid fa-star"></i>}
        onClick={() => setFavoriteCountry(selectedCountry)}
      />
    </div>
  );
}
