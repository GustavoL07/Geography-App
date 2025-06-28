import "./WorldMap.css";
import "leaflet/dist/leaflet.css";
import { PathOptions } from "leaflet";
import { Feature, GeoJsonObject } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { memo, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { style } from "@/utils/World-Map/helpers";
import { CountryList } from "@/types";
import isoToCountry from "@/utils/Country/isoCountry";
import Popup from "./Popup/Popup";
import Title from "@/components/Custom/Title/Title";
import Country from "@/utils/Country/Country";

import backupData from "@/data/backupData.json";
import rawData from "@/data/world.json";
const geoData = rawData as GeoJsonObject;

function handleClick(
  layer: L.Path,
  countryList: CountryList,
  isoCode: string,
  onPopupClick: (c: Country) => void
) {
  layer.on("click", () => {
    const clickedCountry = isoToCountry(countryList, isoCode);
    if (!clickedCountry) return;

    const popupContainer = document.createElement("div");
    const root = createRoot(popupContainer);
    root.render(<Popup country={clickedCountry} handleImageClick={onPopupClick} />);

    layer.bindPopup(popupContainer).openPopup();
  });
}

type Props = {
  onPopupClick: (c: Country) => void;
  title?: string;
};
function WorldMap({ title = "The World Map", onPopupClick }: Props) {
  const list = useCallback((): CountryList => {
    return backupData.map((obj) => Country.fromJSON(obj));
  }, []);

  const url =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const attribution =
    "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community";
  const basicStyle: PathOptions = {
    color: "transparent",
    weight: 0,
    fillColor: "transparent",
    fillOpacity: 0,
  };

  function onEachCountry(feature: Feature, layer: L.Path) {
    const isoCode = feature.properties?.iso_a3;
    const continent = feature.properties?.continent;

    handleClick(layer, list(), isoCode, onPopupClick);
    style(layer, continent);
  }

  return (
    <div className="worldmap-container">
      <Title title={title} />
      <div className="world-container">
        <MapContainer
          center={[0, 0]}
          zoom={2.5}
          minZoom={1.25}
          scrollWheelZoom={true}
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
          inertia={true}
          maxBoundsViscosity={1.25}
        >
          <TileLayer attribution={attribution} url={url} />
          <GeoJSON data={geoData} style={basicStyle} onEachFeature={onEachCountry} />
        </MapContainer>
      </div>
    </div>
  );
}

export default memo(WorldMap);
