import { createContext, useContext, useState, useEffect, useMemo } from "react";
import getData from "../../utils/getData";
import useSearchFilter from "../Hooks/useSearchFilter";

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterBy, setFilterBy] = useState([]);

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
        setFilterBy
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
