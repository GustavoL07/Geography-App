import { useCountryContext } from "@/components/Contexts/CountryContext";
import "./Intro.css";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";

export default function Intro({}) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const {setDisplayMode} = useSettingsContext()

  function onImageClick(){
    const randomCountry = countryList[Math.round(Math.random() * countryList.length)];
    setSelectedCountry(randomCountry);
    setDisplayMode("full");
  }

  return (
    <div className="intro">
      <p className="app-title">Geography App</p>
      <img className="app-image" src="/earth-globe.png" alt="Earth Globe" onClick={() => onImageClick()}/>
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
