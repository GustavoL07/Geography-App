import "./Main.css";
import Map from "../../Maps/Map.jsx";
import FullCountryInfo from "../Info/Full Info/FullCountryInfo.jsx";
import Intro from "../../Default/Intro.jsx";
import { useCountryContext } from "../../Contexts/CountryContext.jsx";

export default function Main({ isSidebarOpen }) {
  const { selectedCountry } = useCountryContext();
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      {selectedCountry ? (
        <>
          <FullCountryInfo />
          <Map />
        </>
      ) : (
        <Intro />
      )}
    </main>
  );
}
