import "./MainContent.css";
import Info from "../Info/Info.jsx";

export default function MainContent({ isSidebarOpen, selectedCountry }) {
  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      {selectedCountry && <Info country={selectedCountry} />}
    </main>
  );
}
