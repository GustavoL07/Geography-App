import "./Main.css";
import FullCountry from "./FullCountry/FullCountry";
import WorldMap from "./WorldMap/WorldMap";
import Intro from "./Intro/Intro";
import Header from "./Header/Header";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { useCallback } from "react";
import { Country } from "@/types";

interface Props {
  isSidebarOpen: boolean;
}

export default function Main({ isSidebarOpen }: Props) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const { displayMode, setDisplayMode } = useSettingsContext();

  const handleMapClick = useCallback((c: Country) => {
    setSelectedCountry(c);
    setDisplayMode("full");
  }, []);

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
