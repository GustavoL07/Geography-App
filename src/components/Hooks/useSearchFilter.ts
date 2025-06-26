import { useMemo } from "react";
import { getSorted } from "@/utils/Organizing/sorter";
import { CountryList, FilterKey, SortKey, SortMode } from "@/types";

type SearchValue = string;
type filterValue = FilterKey;

export default function useSearchFilter(
  list: CountryList,
  searchValue: SearchValue,
  sortValue: SortKey,
  sortMode: SortMode,
  filterValue: filterValue
) {
  return useMemo(() => {
    const lowerSearch = searchValue.toLowerCase();
    let filtered = list.filter((country) => {
      switch (filterValue) {
        case "UNMember":
          return country.unMember;
        case "notUNMember":
          return !country.unMember && country;

        case "independent":
          return country.independent;
        case "notIndependent":
          return !country.independent && country;
        default:
          return country;
      }
    });

    if (lowerSearch) {
      filtered = filtered.filter((country) =>
        country.name.informal.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortValue) {
      filtered = getSorted(filtered, sortValue, sortMode);
    }

    return filtered;
  }, [list, searchValue, sortValue, sortMode, filterValue]);
}
