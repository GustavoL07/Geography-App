import "./Intro.css";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Title from "@/components/Custom/Title/Title";
import earthGlobe from "@/assets/earth-globe.png";

export default function Intro({}) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const { setDisplayMode } = useSettingsContext();

  function onImageClick() {
    const randomCountry = countryList[Math.round(Math.random() * countryList.length)];
    setSelectedCountry(randomCountry);
    setDisplayMode("full");
  }

  return (
    <div className="intro">
      <Title title="Geography App" />
      <img
        className="app-image"
        src={earthGlobe}
        alt="Earth Globe"
        onClick={() => onImageClick()}
      />
      <section className="app-desc">
        <p className="center">
          Made by{" "}
          <a href="https://github.com/GustavoL07" target="_blank">
            Gustavo Lepinsk Carvalho
          </a>
        </p>
      </section>
    </div>
  );
}
