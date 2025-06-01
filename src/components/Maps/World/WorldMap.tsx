import "./worldMap.css";
import "leaflet/dist/leaflet.css";
import rawData from "../../../data/world.json";
import { Feature, GeoJsonObject } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { PathOptions } from "leaflet";
import { useCountryContext } from "../../Contexts/CountryContext";
import { Continents, getContinentColor } from "../../../utils/World-Map/helpers";
import isoToCountry from "../../../utils/Country/isoCountry";
import Country from "../../../utils/Country/Country";
import { createRoot } from "react-dom/client";
import Popup from "./Popup/Popup";

const geoData = rawData as GeoJsonObject;
const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";

const basicStyle: PathOptions = {
  color: "transparent",
  weight: 0,
  fillColor: "transparent",
  fillOpacity: 0,
};

type Props = {
  title?: string;
};

export default function WorldMap({ title = "The World Map" }: Props) {
  const { countryList } = useCountryContext();

  function onEachCountry(feature: Feature, layer: L.Path) {
    const isoCode = feature.properties?.iso_a3;
    const continent = feature.properties?.continent;

    styles(continent, layer);

    handleClick(layer, countryList, isoCode);
  }

  return (
    <div className="worldmap-container">
      <p className="map-title">{title}</p>
      <div className="world-container">
        <MapContainer
          center={[0, 0]}
          zoom={2.5}
          minZoom={2.5}
          scrollWheelZoom={true}
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
          maxBoundsViscosity={1.25}
        >
          <TileLayer attribution="&copy; OpenStreetMap &copy; CartoDB" url={tileUrl} />
          <GeoJSON data={geoData} style={basicStyle} onEachFeature={onEachCountry} />
        </MapContainer>
      </div>
    </div>
  );
}

function handleClick(
  layer: L.Path,
  countryList: Country[],
  isoCode: string,
) {
  layer.on("click", () => {
    const clickedCountry = isoToCountry(countryList, isoCode);

    if (!clickedCountry) return;

    const popupContainer = document.createElement("div");

    const root = createRoot(popupContainer);
    root.render(<Popup country={clickedCountry} />);

    layer.bindPopup(popupContainer).openPopup();
  });
}


function styles(continent: Continents, layer: L.Path) {
  const baseColor = getContinentColor(continent);
  layer.setStyle({
    fillColor: baseColor,
    fillOpacity: 0.5,
    color: "#ffffff",
    weight: 0.5,
  });

  layer.on("mouseover", function () {
    layer.setStyle({ fillOpacity: 1, weight: 1 });
  });
  layer.on("mouseout", function () {
    layer.setStyle({ fillOpacity: 0.5, weight: 0.5 });
  });
}
