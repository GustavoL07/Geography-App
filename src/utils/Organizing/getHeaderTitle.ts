import { SelectedCountry } from "@/types";

export function getHeaderTitle(country: SelectedCountry, defaultText="Geography App") {
  if (!country) return defaultText;

  const maxCharLength = 25;
  const name = country.getFormatted("name");
  const iso3 = country.name.symbol;
  return name.length < maxCharLength ? name : iso3;
}