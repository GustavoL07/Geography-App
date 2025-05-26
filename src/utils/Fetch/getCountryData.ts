import createSymbolToNameMap from "../Country/symbolToNameMap.js";

export default async function getCountryData() {
  const URL = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(URL);
    const data = await response.json();
    const filtered = data.filter((country: any) => country.unMember); /* Only UN members */
    const symbolToNameMap = createSymbolToNameMap(filtered);

    return {
      list: filtered,
      symbolToNameMap,
    };
  } catch (error) {
    console.log(error);
    return {
      countryList: [],
      symbolToNameMap: new Map(),
    };
  }
}
