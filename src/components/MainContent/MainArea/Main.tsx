import "./Main.css";
import FullCountry from "../Info/Full Info/FullCountryInfo.js";
import WorldMap from "../../Maps/World/WorldMap";
import Intro from "../../Intro/Intro.js";
import Header from "../../Header/Header.js";
import { useCountryContext } from "../../Contexts/CountryContext.js";

interface Props {
  isSidebarOpen: boolean;
}

export default function Main({ isSidebarOpen }: Props) {
  const { displayMode } = useCountryContext();

  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <Header isSidebarOpen={isSidebarOpen} />

      <div className="display-area">
        {(() => {
          switch (displayMode) {
            case "intro":
              return <Intro />;

            case "worldMap":
              return <WorldMap />;

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
