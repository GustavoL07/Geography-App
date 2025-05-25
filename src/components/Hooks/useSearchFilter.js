import { useMemo } from "react";
import Country from "../../utils/Country/Country";
import { getSorted } from "../../utils/Organizing/sorter";

export default function useSearchFilter(countryList, searchValue, sortValue, filterBy = []) {
  return useMemo(() => {
    const lowerSearch = (searchValue || "").toLowerCase();
    let filtered = countryList.filter((country) => {
      const checked = [];

      checked.push(country.name.informal.toLowerCase().includes(lowerSearch));

      if (filterBy.includes("capital")) {
        checked.push(country.getFormattedCapital().toLowerCase().includes(lowerSearch));
      }
      if (filterBy.includes("continent")) {
        checked.push(country.getFormattedContinent().toLowerCase().includes(lowerSearch));
      }

      return checked.some(Boolean);
    });

    if (sortValue) {
      filtered = getSorted(filtered, sortValue);
    }

    return filtered;
  }, [countryList, searchValue, sortValue, filterBy]);
}
