import { createContext, useContext, useState, useEffect, useMemo } from "react";
import getData from "../../utils/getData";
import Country from "../../utils/Country";

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  const filteredCountries = useMemo(() => {
    const lowerSearch = searchValue.toLowerCase();

    let filtered = countryList.filter((country) => {
      const name = country.name.informal.toLowerCase();
      const capital = country.getFormattedCapital().toLowerCase();
      const continent = country.getFormattedContinent().toLowerCase();
      return (
        name.includes(lowerSearch) ||
        capital.includes(lowerSearch) ||
        continent.includes(lowerSearch)
      );
    });

    if (sortValue) {
      filtered = Country.sortCountries(filtered, sortValue);
    }

    return filtered;
  }, [searchValue, sortValue, countryList]);

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
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
