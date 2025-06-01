import Country from "./Country";

export default function isoToCountry(list: Country[], iso3: string) {
  return list.find(country => iso3 === country.name.symbol) || null
};
