import Country from "../Country/Country";
import getCountryData from "./getCountryData";
import getCountryMetrics from "./getCountryMetrics";
import threeDigit from "../Country/symbol";

export default async function getData(): Promise<Array<Country> | []> {
  try {
    const countryData = await getCountryData();
    const countryMetrics = await getCountryMetrics();

    const countryList = countryData.list.map((country: any) => {
      const countrySymbol = threeDigit(country.cca2);
      const metric = countryMetrics.has(countrySymbol) ? countryMetrics.get(countrySymbol) : {};

      return new Country(country, countryData.symbolToNameMap, metric);
    });

    return countryList;
  } catch (error) {
    console.log(error);
    return [];
  }
}
