import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function FlyToCountry({ lat, lng, zoom = 3 }: Props) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [lat, lng, zoom, map]);

  return null;
}
