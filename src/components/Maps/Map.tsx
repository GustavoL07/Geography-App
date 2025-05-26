import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useCountryContext } from "../Contexts/CountryContext";

export default function Map({}) {
  const { selectedCountry } = useCountryContext();
  if (!selectedCountry) return null;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map>(null);
  const markerRef = useRef<L.Marker>(null);

  const zoom = 3;
  const mapOptions: L.MapOptions = {
    minZoom: 2,
    maxZoom: 5.5,
    inertia: true,
    zoomControl: true,
    boxZoom: true,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    keyboard: false,
    touchZoom: true,
    maxBounds: [
      [-90, -225],
      [90, 225],
    ],
    maxBoundsViscosity: 1,
  };

  useEffect(() => {
    const { latitude, longitude } = selectedCountry.geography.position;

    if (!mapInstanceRef.current && mapContainerRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, mapOptions).setView(
        [latitude, longitude],
        zoom
      );

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CartoDB",
      }).addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([latitude, longitude]);

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(
          `<b>${selectedCountry.name.informal}</b><br>${selectedCountry.getFormatted("continent")}`
        );

      setTimeout(() => {

        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          mapInstanceRef.current.setZoom(zoom);
        }
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 450);
    }
  }, [selectedCountry]);

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef} />
    </div>
  );
}
