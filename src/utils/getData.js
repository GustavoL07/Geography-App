import Country from "./Country";
import convertSymbolTo3 from "./countrySymbols";
import getCountryData from "./Fetch/getCountryData";
import getCountryMetrics from "./Fetch/getCountryMetrics";


export default async function getData() {
  try {
    const countryData = await getCountryData();
    const countryMetrics = await getCountryMetrics();

    const countryList = countryData.list.map((country) => {
      const countrySymbol = convertSymbolTo3(country.cca2);
      const metric = countryMetrics.has(countrySymbol) ? countryMetrics.get(countrySymbol) : {}

      return new Country(country, countryData.symbolToNameMap, metric);
    })

    return countryList;
  } catch (error) {
    console.log(error);
    return [];
  }
}
