import "./MainContent.css";
import CountryInfo from "../Info/Info.jsx";

export default function MainContent({ isSidebarOpen, selectedCountry }) {
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </main>
  );
}
