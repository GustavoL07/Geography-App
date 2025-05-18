import Country from "../Country";

export default async function getCountryData() {
  const URL = "https://restcountries.com/v3.1/all";

  try {
      const response = await fetch(URL);
      const data = await response.json();
      const filtered = data.filter((country) => country.unMember);
      const borderNameMap = createBorderNameMap(filtered);
  
      const metricsMap = await getCountryMetrics();
  
      const processed = filtered.map((rawCountryData) => {
        const metrics = metricsMap.get(rawCountryData.cca3) || {};
        return new Country(rawCountryData, borderNameMap, metrics);
      })
  
      return processed;
    } catch (error) {
      console.log(error);
    }
}