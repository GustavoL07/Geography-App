import { Continents } from "../Country/Country.types";

export function style(layer: L.Path, continent: Continents) {
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