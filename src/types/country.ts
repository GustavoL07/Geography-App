import CountryType from "@/utils/Country/Country";
export type Country = CountryType;
export type SelectedCountry = Country | null;
export type CountryList = Country[];

export type Continent =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";

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

export interface CountryPosition {
  latitude: number;
  longitude: number;
  region: string;
}

export interface CountryBorders {
  symbols: any;
  names: any;
}

export interface CountryGeography {
  timezone: string[];
  area: number;
  population: number;
  populationDensity: number;
  position: CountryPosition;
  borders: CountryBorders;
}

export interface CountryIndicator {
  technology: {
    internetUsage: number | null;
    electricityAccess: number | null;
    basicWaterService: number | null;
    basicSanitationService: number | null;
  };
  population: {
    birthRate: number | null;
    growthRate: number | null;
    urbanPercent: number | null;
    ruralPercent: number | null;
    malePercent: number | null;
    femalePercent: number | null;
    elderlyPercent: number | null;
    infantMortality: number | null;
    lifeExpectancy: number | null;
    literacyRate: number | null;
    homicideRate: number | null;
  };
  economy: {
    gdp: number | null;
    gdpPerCapita: number | null;
    inflationRate: number | null;
    exports: number | null;
    imports: number | null;
    workingAgePopulation: number | null;
    totalLaborForce: number | null;
    unemploymentRate: number | null;
    giniIndex: number | null;
    HDI: number | null;
  };
  environment: {
    agriculturalLandPercent: number | null;
    forestAreaPercent: number | null;
  };
}
