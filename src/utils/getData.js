import Country from "./Country.js";
import createBorderNameMap from "./borderNameMap.js";

export default async function getData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const filtered = data.filter((country) => country.unMember);
    const borderNameMap = createBorderNameMap(filtered);

    const processed = filtered.map((rawCountryData) => new Country(rawCountryData, borderNameMap));

    return processed;
  } catch (error) {
    console.log("Something went wrong: " + error);
    return [];
  }
}
