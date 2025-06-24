export default function createSymbolToNameMap(countryList: any[]) {
  const map = new Map();

  countryList.forEach((country: any) => {
    map.set(country.cca3, country.name.common);
  });

  return map;
}
