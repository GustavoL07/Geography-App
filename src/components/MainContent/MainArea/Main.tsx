import "./Main.css";
import FullCountryInfo from "../Info/Full Info/FullCountryInfo.js";
import Map from "../../Maps/Map.js";
import Intro from "../../Default/Intro.js";
import Header from "../../Header/Header.js";
import { useCountryContext } from "../../Contexts/CountryContext.js";

interface Props {
  isSidebarOpen: boolean;
}

export default function Main({ isSidebarOpen }: Props) {
  const { selectedCountry, displayMode } = useCountryContext();

  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <Header isSidebarOpen={isSidebarOpen} />

      {(() => {
        switch (displayMode) {
          case "intro":
            
            return <Intro />;
          case "map":
            return <Map />;
          case "full":
            return selectedCountry ? <FullCountryInfo /> : <Intro />;
          default:
            return <Intro />;
        }
      })()}
    </main>
  );
}
