import { SortKey, SortMode, CountryList, Country } from "@/types";

type Filds = {
  key: string;
  value: (c: Country) => number | string | undefined;
  formatOption: string;
  text: string;
};

export const SortOptions = [
  { key: "name", value: (c) => c.name.informal, formatOption: "name", text: "Name" },
  { key: "area", value: (c) => c.geography.area, formatOption: "area", text: "Area" },
  { key: "pop", value: (c) => c.geography.population, formatOption: "pop", text: "Population" },
  {
    key: "popDensity",
    value: (c) => c.geography.populationDensity,
    formatOption: "popDensity",
    text: "Population Density",
  },
  {
    key: "latitude",
    value: (c) => c.geography.position.latitude,
    formatOption: "latitude",
    text: "Latitude",
  },
  {
    key: "longitude",
    value: (c) => c.geography.position.longitude,
    formatOption: "longitude",
    text: "Longitude",
  },
  {
    key: "internetUsage",
    value: (c) => c.indicators.technology.internetUsage?.[0],
    formatOption: "internetUsage",
    text: "Internet Usage",
  },
  {
    key: "electricityAccess",
    value: (c) => c.indicators.technology.electricityAccess?.[0],
    formatOption: "electricityAccess",
    text: "Electricity Access",
  },
  {
    key: "basicWaterService",
    value: (c) => c.indicators.technology.basicWaterService?.[0],
    formatOption: "basicWaterService",
    text: "Water Services",
  },
  {
    key: "basicSanitationService",
    value: (c) => c.indicators.technology.basicWaterService?.[0],
    formatOption: "basicSanitationService",
    text: "Sanitation Services",
  },
  {
    key: "literacyRate",
    value: (c) => c.indicators.population.literacyRate?.[0],
    formatOption: "literacyRate",
    text: "Literacy Rate",
  },
  {
    key: "lifeExpectancy",
    value: (c) => c.indicators.population.lifeExpectancy?.[0],
    formatOption: "lifeExpectancy",
    text: "Life Expectancy",
  },
  {
    key: "infantMortality",
    value: (c) => c.indicators.population.infantMortality?.[0],
    formatOption: "infantMortality",
    text: "Infant Mortality",
  },
  {
    key: "birthRate",
    value: (c) => c.indicators.population.birthRate?.[0],
    formatOption: "birthRate",
    text: "Birth Rate",
  },
  {
    key: "popGrowthRate",
    value: (c) => c.indicators.population.growthRate?.[0],
    formatOption: "popGrowthRate",
    text: "Pop. Growth Rate",
  },
  {
    key: "urbanPop",
    value: (c) => c.indicators.population.urbanPercent?.[0],
    formatOption: "urbanPop",
    text: "Urban Population",
  },
  {
    key: "ruralPop",
    value: (c) => c.indicators.population.ruralPercent?.[0],
    formatOption: "ruralPop",
    text: "Rural Population",
  },
  {
    key: "malePop",
    value: (c) => c.indicators.population.malePercent?.[0],
    formatOption: "malePop",
    text: "Male Population",
  },
  {
    key: "femalePop",
    value: (c) => c.indicators.population.femalePercent?.[0],
    formatOption: "femalePop",
    text: "Female Population",
  },
  {
    key: "elderlyPop",
    value: (c) => c.indicators.population.elderlyPercent?.[0],
    formatOption: "elderlyPop",
    text: "Elderly Population",
  },
  { key: "GDP", value: (c) => c.indicators.economy.gdp?.[0], formatOption: "GDP", text: "GDP" },
  {
    key: "GDPPerCapita",
    value: (c) => c.indicators.economy.gdpPerCapita?.[0],
    formatOption: "GDPPerCapita",
    text: "GDP Per Capita",
  },
  {
    key: "inflationRate",
    value: (c) => c.indicators.economy.inflationRate?.[0],
    formatOption: "inflationRate",
    text: "Inflation Rate",
  },
  {
    key: "exports",
    value: (c) => c.indicators.economy.exports?.[0],
    formatOption: "exports",
    text: "Exports",
  },
  {
    key: "imports",
    value: (c) => c.indicators.economy.imports?.[0],
    formatOption: "imports",
    text: "Imports",
  },
  {
    key: "workingAgePop",
    value: (c) => c.indicators.economy.workingAgePopulation?.[0],
    formatOption: "workingAgePop",
    text: "Working Age Population",
  },
  {
    key: "totalLaborForce",
    value: (c) => c.indicators.economy.totalLaborForce?.[0],
    formatOption: "totalLaborForce",
    text: "Total Labor Force",
  },
  {
    key: "unemploymentRate",
    value: (c) => c.indicators.economy.unemploymentRate?.[0],
    formatOption: "unemploymentRate",
    text: "Unemployement Rate",
  },
  {
    key: "giniIndex",
    value: (c) => c.indicators.economy.giniIndex?.[0],
    formatOption: "giniIndex",
    text: "Gini Index",
  },
  { key: "HDI", value: (c) => c.indicators.economy.HDI?.[0], formatOption: "HDI", text: "HDI" },
  {
    key: "homicideRate",
    value: (c) => c.indicators.population.homicideRate?.[0],
    formatOption: "homicideRate",
    text: "Homicide Rate",
  },
  {
    key: "agriculturalArea",
    value: (c) => c.indicators.environment.agriculturalLandPercent?.[0],
    formatOption: "agriculturalArea",
    text: "Agricultural Land",
  },
  {
    key: "forestArea",
    value: (c) => c.indicators.environment.forestAreaPercent?.[0],
    formatOption: "forestArea",
    text: "Forest Area",
  },
] as const satisfies readonly Filds[];

function getFildValue(key: SortKey) {
  return SortOptions.find((obj) => obj.key === key)?.value;
}

function getFildFormatOption(key: SortKey) {
  return SortOptions.find((obj) => key === obj.key)?.formatOption;
}

function getSortFunction(key: SortKey, mode: SortMode) {
  return (a: Country, b: Country) => {
    const value = getFildValue(key);
    if (!value) {
      return 0;
    }

    const aValue = value(a);
    const bValue = value(b);

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return mode === "asc" ? 1 : -1;
    if (bValue === undefined) return mode === "asc" ? -1 : 1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return mode === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return mode === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  };
}

export function getFormatOption(key: SortKey) {
  return getFildFormatOption(key);
}

export function getSorted(list: CountryList, key: SortKey, mode: SortMode) {
  const sortFunction = getSortFunction(key, mode);
  return [...list].sort(sortFunction);
}
