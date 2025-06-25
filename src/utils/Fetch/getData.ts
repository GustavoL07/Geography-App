import Country from "../Country/Country";
import getCountryData from "./getCountryData";
import getCountryMetrics from "./getCountryMetrics";
import threeDigit from "../Country/symbol";

export default async function getData() {
  try {
    const { list, symbolToNameMap } = await getCountryData();
    const countryMetrics = await getCountryMetrics();

    const countryList = list.map((country: any) => {
      const countrySymbol = threeDigit(country.cca2);
      const metric = countryMetrics.has(countrySymbol) ? countryMetrics.get(countrySymbol) : {};

      return new Country(country, symbolToNameMap, metric);
    });
    return countryList;
  } catch (error) {
    throw error;
  }
}
