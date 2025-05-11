import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

export default function Map({ selectedCountry }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const zoom = 3;
  const mapOptions = {
    minZoom: 2,
    maxZoom: 5,
    inertia: true,
    zoomControl: true,
    boxZoom: true,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: false,
    keyboard: false,
    tap: true,
    touchZoom: true,
    maxBounds: [
      [-90, -180],
      [90, 180],
    ],
    maxBoundsViscosity: 2,
  };

  useEffect(() => {
    const { latitude, longitude } = selectedCountry.geography.position;

    // Create map once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, mapOptions).setView(
        [latitude, longitude],
        zoom
      );

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CartoDB",
      }).addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], zoom);

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
    }
  }, [selectedCountry]);

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef} />
    </div>
  );
}
