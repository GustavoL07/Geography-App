export type MetricsGroup = [number, number] | undefined;
export type Continents =
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
    symbols: string[] | [];
    names: string[];
  };
}

export interface CountryIndicators {
  technology: {
    internetUsage: MetricsGroup,
    electricityAccess: MetricsGroup,
    basicWaterService: MetricsGroup,
    basicSanitationService: MetricsGroup,
  },

  population: {
    birthRate: MetricsGroup,
    growthRate: MetricsGroup,
    urbanPercent: MetricsGroup,
    ruralPercent: MetricsGroup,
    malePercent: MetricsGroup,
    femalePercent: MetricsGroup,
    elderlyPercent: MetricsGroup,
    infantMortality: MetricsGroup,
    lifeExpectancy: MetricsGroup,
    literacyRate: MetricsGroup,
    homicideRate: MetricsGroup,
  },

  economy: {
    gdp: MetricsGroup,
    gdpPerCapita: MetricsGroup,
    inflationRate: MetricsGroup,
    exports: MetricsGroup,
    imports: MetricsGroup,
    workingAgePopulation: MetricsGroup,
    totalLaborForce: MetricsGroup,
    unemploymentRate: MetricsGroup,
    giniIndex: MetricsGroup,
    HDI: MetricsGroup,
  },

  environment: {
    agriculturalLandPercent: MetricsGroup,
    forestAreaPercent: MetricsGroup,
  },
}