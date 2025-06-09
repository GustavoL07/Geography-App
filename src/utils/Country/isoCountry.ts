import { CountryList } from "@/types";

export default function isoToCountry(list: CountryList, iso3: string) {
  return list.find((country) => iso3 === country.name.symbol) || null;
}
