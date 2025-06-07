import "./Main.css";
import FullCountry from "../Info/Full Info/FullCountryInfo.js";
import WorldMap from "../../Maps/World/WorldMap";
import Intro from "../../Intro/Intro.js";
import Header from "../../Header/Header.js";
import { useCountryContext } from "../../Contexts/CountryContext.js";
import Country from "../../../utils/Country/Country";
import { useSettingsContext } from "../../Contexts/SettingsContext";

interface Props {
  isSidebarOpen: boolean;
}

export default function Main({ isSidebarOpen }: Props) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const { displayMode, setDisplayMode } = useSettingsContext();

  function handleMapClick(c: Country) {
    setSelectedCountry(c);
    setDisplayMode("full");
  }

  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <Header isSidebarOpen={isSidebarOpen} />

      <div className="display-area">
        {(() => {
          switch (displayMode) {
            case "intro":
              return <Intro />;

            case "worldMap":
              return <WorldMap list={countryList} onPopupClick={handleMapClick} />;

            case "full":
              return (
                <>
                  <FullCountry />
                </>
              );

            default:
              return <Intro />;
          }
        })()}
      </div>
    </main>
  );
}
