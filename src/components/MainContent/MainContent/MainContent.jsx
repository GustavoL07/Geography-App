import "./MainContent.css";
import Map from "../../Maps/Map.jsx";
import CountryInfo from "../Info/Info.jsx";

export default function MainContent({ isSidebarOpen, selectedCountry }) {
  if (!selectedCountry) return null;
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <CountryInfo country={selectedCountry} />
      <Map selectedCountry={selectedCountry} />
    </main>
  );
}
