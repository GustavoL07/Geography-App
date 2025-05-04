export default async function getData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data.filter((country) => country.unMember).map(processData);
  } catch (error) {
    console.log("Something went wrong: " + error);
    return null;
  }
}

function processData(data) {
  const name = {
    formal: data.name.official,
    informal: data.name.common,
    symbol: data.cca2,
  };
  const capital = data.capital[0];
  const continent = data.continents;
  const flag = data.flags.svg;
  const money = getCurrencyInfo(data);
  const language = Object.values(data.languages)[0];

  const geography = {
    timezone: data.timezones,
    area: data.area,
    population: data.population,
    populationDensity: Math.round(data.population / data.area),
    position: {
      latitude: data.latlng[0],
      longitude: data.latlng[1],
      region: data.subregion,
    },
    borders: data.borders || "",
  };

  return { name, capital, continent, money, flag, language, geography };
}

function getCurrencyInfo(country) {
  const currencyCode = Object.keys(country.currencies)[0];
  const currency = country.currencies[currencyCode];

  return {
    code: currencyCode,
    name: currency.name,
    symbol: currency.symbol,
  };
}
