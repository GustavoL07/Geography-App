import { RestCountry } from "@/types/restCountries";

export default function createSymbolToNameMap(
  rawData: RestCountry[]
): Map<RestCountry["cca3"], string> {
  const map = new Map();

  rawData.forEach((c) => map.set(c.cca3, c.name.common));

  return map;
}
