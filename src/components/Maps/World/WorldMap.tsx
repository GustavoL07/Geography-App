import "./worldMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Feature, GeoJsonObject } from "geojson";
import { PathOptions } from "leaflet";
import rawData from "../../../data/world.json";

const geoData = rawData as GeoJsonObject;
const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";

type Props = {
  title?: string;
};

const basicStyle: PathOptions = {
  color: "transparent",
  weight: 0,
  fillColor: "transparent",
  fillOpacity: 0,
};

function onEachCountry(feature: Feature, layer: L.Path) {
  const isoCode = feature.properties?.iso_a3;
  
  const countryName = feature.properties?.name;
  const continent = feature.properties?.continent;
  console.log(countryName, isoCode);

  style(layer, continent);

  if (isoCode && countryName) {
    layer.bindPopup(`<strong>${countryName}</strong> (${isoCode})`);
  }
}

export default function WorldMap({ title = "The World Map" }: Props) {
  return (
    <div className="worldmap-container">
      <p>{title}</p>
      <div className="world-container">
        <MapContainer
          center={[0, 0]}
          zoom={2}
          minZoom={2}
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

type Continents =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";
function getContinentColor(continent: Continents): string {
  switch (continent) {
    case "Africa":
      return "#f94144";
    case "Asia":
      return "#f3722c";
    case "Europe":
      return "#90be6d";
    case "North America":
      return "#43aa8b";
    case "South America":
      return "#5775f0";
    case "Oceania":
      return "#f9c74f";
    case "Antarctica":
      return "#777777";
    default:
      return "";
  }
}

function style(layer: L.Path, continent: Continents) {
  const baseColor = getContinentColor(continent);
  layer.setStyle({
    fillColor: baseColor,
    fillOpacity: 0.5,
    color: "#ffffff",
    weight: 0.5,
  });

  layer.on("mouseover", function () {
    layer.setStyle({
      fillOpacity: 1,
      weight: 1,
    });
  });

  layer.on("mouseout", function () {
    layer.setStyle({
      fillOpacity: 0.5,
      weight: 0.5,
    });
  });
}
