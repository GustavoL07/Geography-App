import { useMemo } from "react";
import { getSorted } from "@/utils/Organizing/sorter";
import { CountryList, FilterKey, SortKey, SortMode } from "@/types";

type SearchValue = string;
type filterBy = FilterKey;

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
      switch (filterBy) {
        case "UNMember":
          return country.unMember;
        case "independent":
          return country.independent;
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
  }, [list, searchValue, sortValue, sortMode, filterBy]);
}
