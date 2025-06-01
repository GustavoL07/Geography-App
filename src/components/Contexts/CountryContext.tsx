import { createContext, useContext, useState, useEffect } from "react";
import getData from "../../utils/Fetch/getData";
import useSearchFilter from "../Hooks/useSearchFilter";
import Country from "../../utils/Country/Country";
import { SortKeys } from "../../utils/Organizing/sorter";

type DisplayKey = "intro" | "full" | "worldMap";

export type CountryContext = {
  countryList: Country[];
  filteredCountries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortValue: SortKeys;
  setSortValue: (value: SortKeys) => void;
  filterBy: string[];
  setFilterBy: (filters: string[]) => void;

  displayMode: DisplayKey;
  setDisplayMode: (newMode: DisplayKey) => void;
};

const CountryContext = createContext<CountryContext>({
  countryList: [],
  filteredCountries: [],
  selectedCountry: null,
  setSelectedCountry: () => {},
  searchValue: "",
  setSearchValue: () => {},
  sortValue: "",
  setSortValue: () => {},
  filterBy: [],
  setFilterBy: () => {},

  displayMode: "intro",
  setDisplayMode: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useState<CountryContext["countryList"]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryContext["selectedCountry"]>(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<SortKeys>();
  const [filterBy, setFilterBy] = useState<CountryContext["filterBy"]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayKey>("intro");

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  const filteredCountries = useSearchFilter(countryList, searchValue, sortValue, filterBy);

  return (
    <CountryContext.Provider
      value={{
        countryList,
        filteredCountries,
        selectedCountry,
        setSelectedCountry,
        searchValue,
        setSearchValue,
        sortValue,
        setSortValue,
        filterBy,
        setFilterBy,
        displayMode,
        setDisplayMode,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
