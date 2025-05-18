import { useCountryContext } from "../Contexts/CountryContext";
import "./Intro.css";

export default function Intro({}) {
  const { setSelectedCountry, countryList } = useCountryContext();
  return (
    <div className="intro">
      <p className="app-title">Geography App</p>
      <img
        width={300}
        height={300}
        className="app-image"
        src="/earth-globe.png"
        alt="Earth Globe"
        onClick={() =>
          setSelectedCountry(countryList[Math.floor(Math.random() * countryList.length)])
        }
      />
      <section>
        <p className="app-desc">
          Open the sidebar and search for any country you would like to know more about!
        </p>
        <p className="app-desc">
          Discover detailed information about countries, including population, area, languages, and
          more!
        </p>
        <p className="app-desc">Make sure to also check out the maps and the other features!</p>
      </section>
    </div>
  );
}
