import { createContext, useContext, useState, useEffect } from "react";
import getData from "../../utils/Fetch/getData";
import Country from "../../utils/Country/Country";
export type FilterKey = "continent" | "name" | "iso3" | "capital";

export type CountryContext = {
  countryList: [] | Array<Country>;
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country | null) => void;
};

const CountryContext = createContext<CountryContext>({
  countryList: [],
  selectedCountry: null,
  setSelectedCountry: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useState<CountryContext["countryList"]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryContext["selectedCountry"]>(null);

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
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  return useContext(CountryContext);
}
