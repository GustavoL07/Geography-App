import { useState } from "react";

export default function useMapOptions() {
  const [minZoom, setMinZoom] = useState(2);
  const [maxZoom, setMaxZoom] = useState(5.5);
  const [zoom, setZoom] = useState(3);

  const mapOptions = useMemo(
    () => ({
      minZoom,
      maxZoom,
      inertia: true,
      zoomControl: true,
      boxZoom: true,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      keyboard: false,
      tap: true,
      touchZoom: true,
      maxBounds: [
        [-90, -225],
        [90, 225],
      ],
      maxBoundsViscosity: 1,
    }),
    [minZoom, maxZoom]
  );

  return {
    zoom,
    setZoom,
    minZoom,
    setMinZoom,
    maxZoom,
    setMaxZoom,
    mapOptions,
  };
}
