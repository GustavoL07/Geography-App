import { createContext, useContext, useState, useEffect } from "react";
import { CountryContextInterface, CountryList } from "@/types";
import getData from "@/utils/Fetch/getData";
import useLocalStorage from "../Hooks/useLocalStorage";
import backupInformation from "../../data/backupData.json";
import Country from "@/utils/Country/Country";

const CountryContext = createContext<CountryContextInterface>({
  countryList: [],
  setCountryList: () => {},

  selectedCountry: null,
  setSelectedCountry: () => {},

  favoriteList: [],
  setFavoriteCountry: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useLocalStorage<CountryList>("countryList", []);
  const favoriteList = countryList
    .filter((c) => c.favorited)
    .sort((a, b) => a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()));

  function setFavoriteCountry(country: Country) {
    country.setFavorited();
    setCountryList(countryList.map((c) => (c.name.symbol === country.name.symbol ? country : c)));
  }

  const [selectedCountry, setSelectedCountry] =
    useState<CountryContextInterface["selectedCountry"]>(null);

  useEffect(() => {
    async function fetchData() {
      if (countryList.length > 0) return; /* If there is something in localStorage, it will be used*/

      try {
        const data = await getData();
        setCountryList(data);
      } catch (error) {
        console.log("Using backup\nSomething went wrong...", error);
        const backUpList = backupInformation.map((obj: any) => Country.fromJSON(obj));
        setCountryList(backUpList);
      }
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
        setFavoriteCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
