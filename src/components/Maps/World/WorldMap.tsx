import "./worldMap.css";
import "leaflet/dist/leaflet.css";
import rawData from "../../../data/world.json";
import { Feature, GeoJsonObject } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { PathOptions } from "leaflet";
import { useCountryContext } from "../../Contexts/CountryContext";
import isoToCountry from "../../../utils/Country/isoCountry";
import { createRoot } from "react-dom/client";
import Popup from "./Popup/Popup";
import { style } from "../../../utils/World-Map/helpers";
import { CountryContext } from "../../Contexts/CountryContext";
import { memo } from "react";

const geoData = rawData as GeoJsonObject;

function handleClick(layer: L.Path, countryList: CountryContext["countryList"], isoCode: string, setSearchValue: CountryContext["setSearchValue"]) {
  layer.on("click", () => {
    const clickedCountry = isoToCountry(countryList, isoCode);
    if (!clickedCountry) return;

    const popupContainer = document.createElement("div");
    const root = createRoot(popupContainer);
    root.render(<Popup country={clickedCountry} />);

    layer.bindPopup(popupContainer).openPopup();

    setSearchValue(clickedCountry.getFormatted("name"));
  });
}

type Props = {
  list: CountryContext["countryList"];
  setSearchValue: CountryContext["setSearchValue"]
  title?: string;
};

function WorldMap({ list, setSearchValue, title = "The World Map" }: Props) {
  const tileUrl =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";

  const basicStyle: PathOptions = {
    color: "transparent",
    weight: 0,
    fillColor: "transparent",
    fillOpacity: 0,
  };

  function onEachCountry(feature: Feature, layer: L.Path) {
    const isoCode = feature.properties?.iso_a3;
    const continent = feature.properties?.continent;

    handleClick(layer, list, isoCode, setSearchValue);
    style(layer, continent);
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

export default memo(WorldMap);