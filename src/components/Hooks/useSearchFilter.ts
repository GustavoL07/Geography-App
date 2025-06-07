import { useMemo } from "react";
import { getSorted, SortKey } from "../../utils/Organizing/sorter";
import { CountryList } from "../../utils/Country/Country";
import { SettingsContext } from "../Contexts/SettingsContext";

export default function useSearchFilter(
  countryList: CountryList,
  searchValue: SettingsContext["searchValue"],
  sortValue: SortKey,
  filterBy: SettingsContext["filterBy"]
) {
  return useMemo(() => {
    const lowerSearch = searchValue.toLowerCase();
    let filtered = countryList.filter((country) => {
      const checked = [];
      checked.push(country.getFormatted("name").toLowerCase().includes(lowerSearch)); // Search by name is always done

      if (filterBy.includes("continent")) {
        checked.push(country.getFormatted("continent").toLowerCase().includes(lowerSearch));
      }
      if (filterBy.includes("capital")) {
        checked.push(country.getFormatted("capital").toLowerCase().includes(lowerSearch));
      }
      if (filterBy.includes("iso3")) {
        checked.push(country.name.symbol.toLowerCase().includes(lowerSearch));
      }

      return checked.some(Boolean);
    });

    if (sortValue) {
      filtered = getSorted(filtered, sortValue);
    }

    return filtered;
  }, [countryList, searchValue, sortValue, filterBy]);
}
