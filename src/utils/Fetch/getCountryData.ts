import createSymbolToNameMap from "../Country/symbolToNameMap.js";
import { RawCountry } from "@/types/rawCountry.js";

export default async function getCountryData() {
  const URL = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(URL);
    const rawData = await response.json();
    console.log(rawData);
    const data = [...rawData];

    const symbolToNameMap = createSymbolToNameMap(data);

    return {
      list: data,
      symbolToNameMap,
    };
  } catch (error) {
    console.log(error);
    return {
      list: [],
      symbolToNameMap: new Map(),
    };
  }
}
