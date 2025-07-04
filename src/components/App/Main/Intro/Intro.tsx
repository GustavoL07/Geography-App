import "./Intro.css";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import Title from "@/components/Custom/Title/Title";
import earthGlobe from "@/assets/earth-globe.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";

export default function Intro({}) {
  const navigate = useNavigate();
  const { countryList } = useCountryContext();

  function onImageClick() {
    const randomCountry = countryList[Math.round(Math.random() * countryList.length)];
    navigate(ROUTES.COUNTRY(randomCountry.name.symbol));
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
