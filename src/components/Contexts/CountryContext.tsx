import { createContext, useContext, useState, useEffect } from "react";
import { Country, CountryContextInterface, CountryList } from "@/types";
import getData from "@/utils/Fetch/getData";

const CountryContext = createContext<CountryContextInterface>({
  countryList: [],

  selectedCountry: null,
  setSelectedCountry: () => {},

  favoriteList: [],
  setFavoriteList: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useState<CountryList>([]);

  const [selectedCountry, setSelectedCountry] =
    useState<CountryContextInterface["selectedCountry"]>(null);

  const [favoriteList, setFavoriteListState] = useState<CountryList>([]);
  function setFavoriteList(country: Country) {
    setFavoriteListState((prevList) => {
      const exists = prevList.some((c) => c.name.symbol === country.name.symbol);
      return exists
        ? prevList.filter((c) => c.name.symbol !== country.name.symbol)
        : [...prevList, country];
    });
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countryList,
        selectedCountry,
        setSelectedCountry,
        favoriteList,
        setFavoriteList,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
