import { createContext, useContext, useState, useEffect } from "react";
import { Country, CountryContextInterface, CountryList } from "@/types";
import getData from "@/utils/Fetch/getData";
import useLocalStorage from "../Hooks/useLocalStorage";

const CountryContext = createContext<CountryContextInterface>({
  countryList: [],
  setCountryList: () => {},

  selectedCountry: null,
  setSelectedCountry: () => {},

  favoriteList: [],
  setFavoriteList: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useLocalStorage<CountryList>("countryList", []);
  const favoriteList = countryList.filter((c) => c.favorited);

  const [selectedCountry, setSelectedCountry] =
    useState<CountryContextInterface["selectedCountry"]>(null);

  function setFavoriteList(country: Country) {
    setCountryList((prevList) =>
      prevList.map((c) => {
        if (c.name.symbol === country.name.symbol) {
          c.setFavorited();
        }
        return c;
      })
    );
  }

  useEffect(() => {
    async function fetchData() {
      if (countryList.length > 0) return;

      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countryList,
        setCountryList,
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
