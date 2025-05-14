import "./Main.css";
import Map from "../../Maps/Map.jsx";
import FullCountryInfo from "../Info/Full Info/FullCountryInfo.jsx";
import { useCountryContext } from "../../Contexts/CountryContext.jsx";

export default function Main({ isSidebarOpen }) {
  const { selectedCountry } = useCountryContext();
  if (!selectedCountry) return null;
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <FullCountryInfo />
      <Map selectedCountry={selectedCountry} />
    </main>
  );
}
