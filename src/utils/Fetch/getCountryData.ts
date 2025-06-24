import { RestCountry } from "@/types/restCountries";
import createSymbolToNameMap from "../Country/symbolToNameMap";

export default async function getCountryData() {
  const URLS = [
    "https://restcountries.com/v3.1/independent?status=true",
    "https://restcountries.com/v3.1/independent?status=false",
  ];

  try {
    const responses = await Promise.all(URLS.map((url) => fetch(url)));
    const dataArrays = await Promise.all(responses.map((res) => res.json()));
    const data: RestCountry[] = [].concat(...dataArrays);

    const symbolToNameMap = createSymbolToNameMap(data);

    return {
      list: data,
      symbolToNameMap,
    };
  } catch (error) {
    console.log("Restcountries API error", error);
    throw error;
  }
}
