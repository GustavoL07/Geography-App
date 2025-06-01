import { CountryContext } from "../../components/Contexts/CountryContext";

export default function isoToCountry(list: CountryContext["countryList"], iso3: string) {
  return list.find(country => iso3 === country.name.symbol) || null
};
