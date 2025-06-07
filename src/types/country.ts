import CountryType from "@/utils/Country/Country";
export type Country = CountryType;
export type SelectedCountry = Country | null;
export type CountryList = Country[];

export interface CountryName {
  formal: string;
  informal: string;
  symbol: string;
}

export interface CountryMoney {
  code: string;
  name: string;
  symbol: string;
}

export interface CountryGeography {
  timezone: string[];
  area: number;
  population: number;
  populationDensity: number;
  position: {
    latitude: number;
    longitude: number;
    region: string;
  };
  borders: {
    symbols: string[];
    names: string[];
  };
}

export type Continents =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";
