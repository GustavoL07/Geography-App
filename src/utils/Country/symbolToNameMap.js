export default function createSymbolToNameMap(countryList) {
  const map = new Map();

  countryList.forEach((country) => {
    map.set(country.cca3, country.name.common);
  });

  return map;
}