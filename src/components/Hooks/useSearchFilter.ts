import { useMemo } from "react";
import { getSorted, SortKeys } from "../../utils/Organizing/sorter";
import Country from "../../utils/Country/Country";

export default function useSearchFilter(countryList: Country[], searchValue: string, sortValue: SortKeys, filterBy: string[] = []) {
  return useMemo(() => {
    const lowerSearch = (searchValue || "").toLowerCase();
    let filtered = countryList.filter((country) => {
      const checked = [];

      checked.push(country.name.informal.toLowerCase().includes(lowerSearch));

      if (filterBy.includes("capital")) {
        checked.push(country.getFormatted("capital").toLowerCase().includes(lowerSearch));
      }
      if (filterBy.includes("continent")) {
        checked.push(country.getFormatted("continent").toLowerCase().includes(lowerSearch));
      }

      return checked.some(Boolean);
    });

    if (sortValue) {
      filtered = getSorted(filtered, sortValue);
    }

    return filtered;
  }, [countryList, searchValue, sortValue, filterBy]);
}
