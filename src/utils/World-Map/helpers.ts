import Country from "../Country/Country";
import { Feature } from "geojson";
import isoToCountry from "../Country/isoCountry";
import { useCountryContext } from "../../components/Contexts/CountryContext";

export type Continents =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";

function style(layer: L.Path, continent: Continents) {
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

export function getContinentColor(continent: Continents): string {
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

export function useOnEachCountry(feature: Feature, layer: L.Path) {
  const isoCode = feature.properties?.iso_a3;
  const countryName = feature.properties?.name;
  const continent = feature.properties?.continent;

  useHandleClick(layer, isoCode);

  style(layer, continent);

  if (isoCode && countryName) {
    layer.bindPopup(`<strong>${countryName}</strong> (${isoCode})`);
  }
}

function useHandleClick(layer: L.Path, iso3: string){
  const { countryList, setSelectedCountry } = useCountryContext();

  layer.on("click", ()=>{
    const clickedCountry = isoToCountry(countryList, iso3);
    setSelectedCountry(clickedCountry);
  });
}
