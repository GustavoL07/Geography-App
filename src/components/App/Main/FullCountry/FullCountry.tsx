import "./FullCountry.css";
import { useCountryContext } from "../../../Contexts/CountryContext.js";
import { FormatOptions } from "@/utils/Organizing/formatter";
import Overview from "./Overview/Overview";
import InfoBox from "./InfoBox/InfoBox";
import Map from "@/components/App/Main/FullCountry/Map/Map";
import Button from "@/components/Custom/Button/Button";
import CapitalImage from "./Capital/CapitalImage";
import { useParams } from "react-router-dom";

type Props = {};
export default function FullCountry({}) {
  const { setFavoriteCountry, getCountryFromId } = useCountryContext();
  const { id } = useParams();
  const country = getCountryFromId(id ?? "");
  if (!country) return;

  const { latitude, longitude } = country.geography.position;
  const mapCenter: [number, number] = [latitude, longitude];

  return (
    <div className="info-container">
      <Overview country={country} />

      <CapitalImage capital={country.capital[0]} />

      <section className="info-grid">
        {FormatOptions.map((obj, index) => {
          if (obj.key === "name") return null;

          return (
            <InfoBox key={index} text={`${obj.text}:`} value={country.getFormatted(obj.key)} />
          );
        })}
      </section>

      <Map toDisplay={[country]} center={mapCenter} />
      <Button
        icon={<i className="fa-solid fa-star"></i>}
        onClick={() => setFavoriteCountry(country)}
      />
    </div>
  );
}
