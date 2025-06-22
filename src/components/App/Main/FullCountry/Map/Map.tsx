import "./Map.css";
import "leaflet/dist/leaflet.css";
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
};
export default function Map({ toDisplay }: Props) {
  const { mapTile } = useSettingsContext();
  const center: [number, number] =
    toDisplay.length > 1
      ? [0, 0]
      : [
          toDisplay[0]?.geography.position.latitude ?? 0,
          toDisplay[0]?.geography.position.longitude ?? 0,
        ];

  return (
    <div className="map-container">
      <MapContainer
        center={[
          toDisplay[0]?.geography.position.latitude ?? 0,
          toDisplay[0]?.geography.position.longitude ?? 0,
        ]}
        zoom={3}
        minZoom={2}
        maxZoom={5.5}
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
