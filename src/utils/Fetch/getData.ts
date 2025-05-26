import Country from "../Country/Country";
import convertSymbolTo3 from "../Country/symbol";
import getCountryData from "./getCountryData";
import getCountryMetrics from "./getCountryMetrics";

export default async function getData(){
  try {
    const countryData = await getCountryData();
    const countryMetrics = await getCountryMetrics();

    const countryList = countryData.list.map((country: any) => {
      const countrySymbol = convertSymbolTo3(country.cca2);
      const metric = countryMetrics.has(countrySymbol) ? countryMetrics.get(countrySymbol) : {};

      return new Country(country, countryData.symbolToNameMap, metric);
    });

    return countryList;
  } catch (error) {
    console.log(error);
    return [];
  }
}
