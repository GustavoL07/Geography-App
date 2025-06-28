import "./Map.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from "react";
import { useMap, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CountryList } from "@/types";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { getMapUrl, getMapAttribution } from "@/utils/World-Map/helpers";

function MapCenterer({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

type Props = {
  toDisplay: CountryList;
  center: [number, number];
  zoom?: number;
};
export default function Map({ toDisplay, center, zoom = 3 }: Props) {
  const { mapTile } = useSettingsContext();

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={2}
        scrollWheelZoom={true}
        maxBounds={[
          [-90, -225],
          [90, 225],
        ]}
        maxBoundsViscosity={1}
      >
        <MapCenterer center={center} />
        <TileLayer attribution={getMapAttribution(mapTile)} url={getMapUrl(mapTile)} />
        {toDisplay.map((country) => {
          const { latitude, longitude } = country.geography.position;
          return (
            <Marker key={country.name.symbol} position={[latitude, longitude]}>
              <Popup>
                <b>{country.name.informal}</b>
                <br />
                {country.getFormatted("continent")}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
