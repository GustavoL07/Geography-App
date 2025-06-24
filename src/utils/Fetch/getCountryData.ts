import createSymbolToNameMap from "../Country/symbolToNameMap.js";

export default async function getCountryData() {
  const URL = "https://restcountries.com/v3.1/independent?status=true";

  try {
    const response = await fetch(URL);
    const data = await response.json();
    const filtered = data.filter((country: any) => country.unMember);
    const symbolToNameMap = createSymbolToNameMap(filtered);

    return {
      list: filtered,
      symbolToNameMap,
    };
  } catch (error) {
    console.log("Restcountries API error", error);
    throw error;
  }
}
