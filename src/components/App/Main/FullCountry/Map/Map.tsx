import "./Map.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCountryContext } from "@/components/Contexts/CountryContext";
import FlyToCountry from "./FlyMap";
import L from "leaflet";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import { getMapUrl, getMapAttribution } from "@/utils/World-Map/helpers";

export default function Map() {
  const { selectedCountry } = useCountryContext();
  const { mapTile } = useSettingsContext();
  const markerRef = useRef<L.Marker>(null);

  if (!selectedCountry) return null;

  const { latitude, longitude } = selectedCountry.geography.position;

  useEffect(() => {
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 1500);
  }, [selectedCountry]);

  return (
    <div className="map-container">
      <MapContainer
        center={[latitude, longitude]}
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
        <TileLayer attribution={getMapAttribution(mapTile)} url={getMapUrl(mapTile)} />

        <Marker position={[latitude, longitude]} ref={markerRef}>
          <Popup>
            <b>{selectedCountry.name.informal}</b>
            <br />
            {selectedCountry.getFormatted("continent")}
          </Popup>
        </Marker>

        <FlyToCountry lat={latitude} lng={longitude} />
      </MapContainer>
    </div>
  );
}
