import { createContext, useContext, useState, useEffect } from "react";
import { CountryList } from "@/types";
import getData from "@/utils/Fetch/getData";
import useLocalStorage from "../Hooks/useLocalStorage";
import backupInformation from "../../data/backupData.json";
import Country from "@/utils/Country/Country";

type ContextType = {
  countryList: CountryList;
  setCountryList: React.Dispatch<React.SetStateAction<CountryList>>;
  favoriteList: Country[];
  setFavoriteCountry: (country: Country) => void;
  getCountryFromId: (id: string) => Country | undefined;
};

const CountryContext = createContext<ContextType | null>(null);

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useLocalStorage<CountryList>("countryList", []);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const favoriteList = countryList
    .filter((c) => c.favorited)
    .sort((a, b) => a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()));

  function setFavoriteCountry(country: Country) {
    country.setFavorited();
    setCountryList(countryList.map((c) => (c.name.symbol === country.name.symbol ? country : c)));
  }

  function getCountryFromId(id: string) {
    const c = countryList.find((c) => id === c.name.symbol);
    setSelectedCountry(c);
    return c;
  }

  function cleanSelectedCountry() {
    setSelectedCountry(undefined);
  }

  useEffect(() => {
    async function fetchData() {
      if (countryList.length > 0)
        return; /* If there is something in localStorage, it will be used*/

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

  const value = {
    countryList,
    setCountryList,
    favoriteList,
    setFavoriteCountry,
    getCountryFromId,
  };

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountryContext() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("Context Error");
  return context;
}
