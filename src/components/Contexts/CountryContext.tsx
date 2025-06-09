import { createContext, useContext, useState, useEffect } from "react";
import { CountryContextInterface, CountryList } from "@/types";
import getData from "@/utils/Fetch/getData";

const CountryContext = createContext<CountryContextInterface>({
  countryList: [],
  selectedCountry: null,
  setSelectedCountry: () => {},
});

export function CountryProvider({ children }: any) {
  const [countryList, setCountryList] = useState<CountryList>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryContextInterface["selectedCountry"]>(null);

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
