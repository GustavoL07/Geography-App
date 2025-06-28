import { useMemo } from "react";
import { getSorted } from "@/utils/Organizing/sorter";
import { CountryList, FilterKey, SortKey, SortMode } from "@/types";

export default function useSearchFilter(
  list: CountryList,
  searchValue: string,
  sortValue: SortKey,
  sortMode: SortMode,
  filterValue: FilterKey
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

        case "Africa":
          return country.continent === "Africa" && country;
        case "Asia":
          return country.continent === "Asia" && country;
        case "Europe":
          return country.continent === "Europe" && country;
        case "North America":
          return country.continent === "North America" && country;
        case "South America":
          return country.continent === "South America" && country;
        case "Oceania":
          return country.continent === "Oceania" && country;
        case "Antarctica":
          return country.continent === "Antarctica" && country;

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
