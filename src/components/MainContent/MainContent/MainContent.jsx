import "./MainContent.css";
import Map from "../../Maps/Map.jsx";
import CountryInfo from "../Info/Info.jsx";
import { useCountryContext } from "../../Contexts/CountryContext.jsx";

export default function MainContent({ isSidebarOpen }) {
  const {selectedCountry} = useCountryContext();
  if (!selectedCountry) return null;
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <CountryInfo country={selectedCountry} />
      <Map selectedCountry={selectedCountry} />
    </main>
  );
}
