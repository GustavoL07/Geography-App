import "./WorldMap.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { memo } from "react";
import { PathOptions } from "leaflet";
import { GeoJsonObject } from "geojson";
import Title from "@/components/Custom/Title/Title";
import Country from "@/utils/Country/Country";
import { CountryList } from "@/types";
import rawData from "@/data/world.json";
import backupData from "@/data/backupData.json";
import { onEachCountry } from "@/utils/World-Map/helpers";
const geoData = rawData as GeoJsonObject;

const MAP_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const MAP_ATTRIBUTION =
  "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community";

const BASIC_STYLE: PathOptions = {
  color: "transparent",
  weight: 0,
  fillColor: "transparent",
  fillOpacity: 0,
};

const backupList: CountryList = backupData.map((obj) => Country.fromJSON(obj));

type Props = {
  onPopupClick: (c: Country) => void;
  title?: string;
};
function WorldMap({ title = "The World Map", onPopupClick }: Props) {
  return (
    <div className="worldmap-container">
      <Title title={title} />
      <div className="world-container">
        <MapContainer
          center={[0, 0]}
          zoom={3}
          minZoom={3}
          scrollWheelZoom
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
          inertia
          maxBoundsViscosity={1.25}
        >
          <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_URL} />
          <GeoJSON
            data={geoData}
            style={BASIC_STYLE}
            onEachFeature={onEachCountry(backupList, onPopupClick)}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default memo(WorldMap);
