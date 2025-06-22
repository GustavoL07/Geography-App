import "./Main.css";
import FullCountry from "./FullCountry/FullCountry";
import WorldMap from "./WorldMap/WorldMap";
import Intro from "./Intro/Intro";
import Header from "./Header/Header";
import CompareCountry from "./CompareCountry/CompareCountry";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { useCallback } from "react";
import { Country } from "@/types";
import Favorite from "./Favorite/Favorite";

interface Props {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function Main({ isSidebarOpen, closeSidebar }: Props) {
  const { countryList, setSelectedCountry } = useCountryContext();
  const { displayMode, setDisplayMode } = useSettingsContext();

  const handleMapClick = useCallback((c: Country) => {
    setSelectedCountry(c);
    setDisplayMode("full");
  }, []);

  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <Header closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="display-area">
        {(() => {
          switch (displayMode) {
            case "intro":
              return <Intro />;

            case "compare":
              return <CompareCountry />;

            case "worldMap":
              return <WorldMap list={countryList} onPopupClick={handleMapClick} />;

            case "full":
              return <FullCountry />;

            case "favorite":
              return <Favorite />;

            default:
              return <Intro />;
          }
        })()}
      </div>
    </main>
  );
}
