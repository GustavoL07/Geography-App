import { Continent, MapTileKey } from "@/types";

export function style(layer: L.Path, continent: Continent) {
  function getContinentColor(continent: Continent): string {
    switch (continent) {
      case "Africa":
        return "#f94144";
      case "Asia":
        return "#f3722c";
      case "Europe":
        return "#90be6d";
      case "North America":
        return "#aa00aa";
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

export function getMapUrl(tile: MapTileKey): string {
  switch (tile) {
    case "light":
      return "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    case "dark":
      return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    case "earth":
      return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  }
}

export function getMapAttribution(tile: MapTileKey): string {
  switch (tile) {
    case "light":
    case "dark":
      return '&copy; <a href="https://carto.com/">CARTO</a> | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    case "earth":
      return "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community";

    default:
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  }
}
