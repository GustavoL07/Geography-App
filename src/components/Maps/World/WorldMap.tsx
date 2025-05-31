import "./worldMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function WorldMap({ title = "The World Map" }) {
  return (
    <div className="worldmap-container">
      <p>{title}</p>
      <div className="world-container">
        <MapContainer
          center={[0, 0]}
          zoom={1}
          minZoom={2}
          scrollWheelZoom={true}
          maxBounds={[
            [-90, -225],
            [90, 225],
          ]}
          maxBoundsViscosity={1}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap &copy; CartoDB"
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
