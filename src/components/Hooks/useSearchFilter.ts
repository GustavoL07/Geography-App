import { useMemo } from "react";
import { getSorted } from "@/utils/Organizing/sorter";
import { CountryList, SettingsContextInterface, SortKey, SortMode } from "@/types";

type SearchValue = SettingsContextInterface["searchValue"];
type filterBy = SettingsContextInterface["filterBy"];

export default function useSearchFilter(
  list: CountryList,
  searchValue: SearchValue,
  sortValue: SortKey,
  sortMode: SortMode,
  filterBy: filterBy
) {
  return useMemo(() => {
    const lowerSearch = searchValue.toLowerCase();
    let filtered = list.filter((country) => {
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
      filtered = getSorted(filtered, sortValue, sortMode);
    }

    return filtered;
  }, [list, searchValue, sortValue, sortMode, filterBy]);
}
