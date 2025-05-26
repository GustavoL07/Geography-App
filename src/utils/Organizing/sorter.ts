import Country from "../Country/Country";
import { FormatKey } from "./formatter";

export type SortKeys = (typeof SORTER)[number]["key"] | undefined | "";
export const SORTER = [
  {
    key: "name-asc",
    text: "Name",
    formatOption: "name",
    function: (a: Country, b: Country) =>
      a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()),
  },
  {
    key: "name-desc",
    text: "Name",
    formatOption: "name",
    function: (a: Country, b: Country) =>
      b.name.informal.toLowerCase().localeCompare(a.name.informal.toLowerCase()),
  },

  {
    key: "area-asc",
    text: "Area",
    formatOption: "area",
    function: (a: Country, b: Country) => a.geography.area - b.geography.area,
  },
  {
    key: "area-desc",
    text: "Area",
    formatOption: "area",
    function: (a: Country, b: Country) => b.geography.area - a.geography.area,
  },

  {
    key: "population-asc",
    text: "Population",
    formatOption: "population",
    function: (a: Country, b: Country) => a.geography.population - b.geography.population,
  },
  {
    key: "population-desc",
    text: "Population",
    formatOption: "population",
    function: (a: Country, b: Country) => b.geography.population - a.geography.population,
  },

  {
    key: "populationDensity-asc",
    text: "Population Density",
    formatOption: "populationDensity",
    function: (a: Country, b: Country) =>
      a.geography.populationDensity - b.geography.populationDensity,
  },
  {
    key: "populationDensity-desc",
    text: "Population Density",
    formatOption: "populationDensity",
    function: (a: Country, b: Country) =>
      b.geography.populationDensity - a.geography.populationDensity,
  },

  {
    key: "latitude-asc",
    text: "Latitude",
    formatOption: "latitude",
    function: (a: Country, b: Country) =>
      a.geography.position.latitude - b.geography.position.latitude,
  },
  {
    key: "latitude-desc",
    text: "Latitude",
    formatOption: "latitude",
    function: (a: Country, b: Country) =>
      b.geography.position.latitude - a.geography.position.latitude,
  },

  {
    key: "longitude-asc",
    text: "Longitude",
    formatOption: "longitude",
    function: (a: Country, b: Country) =>
      a.geography.position.longitude - b.geography.position.longitude,
  },
  {
    key: "longitude-desc",
    text: "Longitude",
    formatOption: "longitude",
    function: (a: Country, b: Country) =>
      b.geography.position.longitude - a.geography.position.longitude,
  },

  {
    key: "internetUsage-asc",
    text: "Internet Usage",
    formatOption: "internetUsage",
    function: sortFunction((country: Country) => country.indicators.technology.internetUsage?.[0]),
  },
  {
    key: "internetUsage-desc",
    text: "Internet Usage",
    formatOption: "internetUsage",
    function: sortFunction(
      (country: Country) => country.indicators.technology.internetUsage?.[0],
      "desc"
    ),
  },

  {
    key: "electricityAccess-asc",
    text: "Electricity Access",
    formatOption: "electricityAccess",
    function: sortFunction(
      (country: Country) => country.indicators.technology.electricityAccess?.[0]
    ),
  },
  {
    key: "electricityAccess-desc",
    text: "Electricity Access",
    formatOption: "electricityAccess",
    function: sortFunction(
      (country: Country) => country.indicators.technology.electricityAccess?.[0],
      "desc"
    ),
  },

  {
    key: "basicWaterService-asc",
    text: "Water Services",
    formatOption: "basicWaterService",
    function: sortFunction(
      (country: Country) => country.indicators.technology.basicWaterService?.[0]
    ),
  },
  {
    key: "basicWaterService-desc",
    text: "Water Services",
    formatOption: "basicWaterService",
    function: sortFunction(
      (country: Country) => country.indicators.technology.basicWaterService?.[0],
      "desc"
    ),
  },

  {
    key: "literacyRate-asc",
    text: "Literacy Rate",
    formatOption: "literacyRate",
    function: sortFunction((country: Country) => country.indicators.population.literacyRate?.[0]),
  },
  {
    key: "literacyRate-desc",
    text: "Literacy Rate",
    formatOption: "literacyRate",
    function: sortFunction(
      (country: Country) => country.indicators.population.literacyRate?.[0],
      "desc"
    ),
  },

  {
    key: "lifeExpectancy-asc",
    text: "Life Expectancy",
    formatOption: "lifeExpectancy",
    function: sortFunction((country: Country) => country.indicators.population.lifeExpectancy?.[0]),
  },
  {
    key: "lifeExpectancy-desc",
    text: "Life Expectancy",
    formatOption: "lifeExpectancy",
    function: sortFunction(
      (country: Country) => country.indicators.population.lifeExpectancy?.[0],
      "desc"
    ),
  },

  {
    key: "infantMortality-asc",
    text: "Infant Mortality",
    formatOption: "infantMortality",
    function: sortFunction(
      (country: Country) => country.indicators.population.infantMortality?.[0]
    ),
  },
  {
    key: "infantMortality-desc",
    text: "Infant Mortality",
    formatOption: "infantMortality",
    function: sortFunction(
      (country: Country) => country.indicators.population.infantMortality?.[0],
      "desc"
    ),
  },

  {
    key: "birthRate-asc",
    text: "Birth Rate",
    formatOption: "birthRate",
    function: sortFunction((country: Country) => country.indicators.population.birthRate?.[0]),
  },
  {
    key: "birthRate-desc",
    text: "Birth Rate",
    formatOption: "birthRate",
    function: sortFunction(
      (country: Country) => country.indicators.population.birthRate?.[0],
      "desc"
    ),
  },

  {
    key: "growthRate-asc",
    text: "Pop. Growth Rate",
    formatOption: "growthRate",
    function: sortFunction((country: Country) => country.indicators.population.growthRate?.[0]),
  },
  {
    key: "growthRate-desc",
    text: "Pop. Growth Rate",
    formatOption: "growthRate",
    function: sortFunction(
      (country: Country) => country.indicators.population.growthRate?.[0],
      "desc"
    ),
  },

  {
    key: "urbanPercent-asc",
    text: "Urban Population",
    formatOption: "urbanPercent",
    function: sortFunction((country: Country) => country.indicators.population.urbanPercent?.[0]),
  },
  {
    key: "urbanPercent-desc",
    text: "Urban Population",
    formatOption: "urbanPercent",
    function: sortFunction(
      (country: Country) => country.indicators.population.urbanPercent?.[0],
      "desc"
    ),
  },

  {
    key: "ruralPercent-asc",
    text: "Rural Population",
    formatOption: "ruralPercent",
    function: sortFunction((country: Country) => country.indicators.population.ruralPercent?.[0]),
  },
  {
    key: "ruralPercent-desc",
    text: "Rural Population",
    formatOption: "ruralPercent",
    function: sortFunction(
      (country: Country) => country.indicators.population.ruralPercent?.[0],
      "desc"
    ),
  },

  {
    key: "malePercent-asc",
    text: "Male Population",
    formatOption: "malePercent",
    function: sortFunction((country: Country) => country.indicators.population.malePercent?.[0]),
  },
  {
    key: "malePercent-desc",
    text: "Male Population",
    formatOption: "malePercent",
    function: sortFunction(
      (country: Country) => country.indicators.population.malePercent?.[0],
      "desc"
    ),
  },

  {
    key: "femalePercent-asc",
    text: "Female Population",
    formatOption: "femalePercent",
    function: sortFunction((country: Country) => country.indicators.population.femalePercent?.[0]),
  },
  {
    key: "femalePercent-desc",
    text: "Female Population",
    formatOption: "femalePercent",
    function: sortFunction(
      (country: Country) => country.indicators.population.femalePercent?.[0],
      "desc"
    ),
  },

  {
    key: "elderlyPercent-asc",
    text: "Elderly Population",
    formatOption: "elderlyPercent",
    function: sortFunction((country: Country) => country.indicators.population.elderlyPercent?.[0]),
  },
  {
    key: "elderlyPercent-desc",
    text: "Elderly Population",
    formatOption: "elderlyPercent",
    function: sortFunction(
      (country: Country) => country.indicators.population.elderlyPercent?.[0],
      "desc"
    ),
  },

  {
    key: "gdp-asc",
    text: "GDP",
    formatOption: "gdp",
    function: sortFunction((country: Country) => country.indicators.economy.gdp?.[0]),
  },
  {
    key: "gdp-desc",
    text: "GDP",
    formatOption: "gdp",
    function: sortFunction((country: Country) => country.indicators.economy.gdp?.[0], "desc"),
  },

  {
    key: "gdpPerCapita-asc",
    text: "GDP Per Capita",
    formatOption: "gdpPerCapita",
    function: sortFunction((country: Country) => country.indicators.economy.gdpPerCapita?.[0]),
  },
  {
    key: "gdpPerCapita-desc",
    text: "GDP Per Capita",
    formatOption: "gdpPerCapita",
    function: sortFunction(
      (country: Country) => country.indicators.economy.gdpPerCapita?.[0],
      "desc"
    ),
  },

  {
    key: "inflationRate-asc",
    text: "Inflation Rate",
    formatOption: "inflationRate",
    function: sortFunction((country: Country) => country.indicators.economy.inflationRate?.[0]),
  },
  {
    key: "inflationRate-desc",
    text: "Inflation Rate",
    formatOption: "inflationRate",
    function: sortFunction((country: Country) => country.indicators.economy.exports?.[0], "desc"),
  },

  {
    key: "exports-asc",
    text: "Exports",
    formatOption: "exports",
    function: sortFunction((country: Country) => country.indicators.economy.exports?.[0]),
  },
  {
    key: "exports-desc",
    text: "Exports",
    formatOption: "exports",
    function: sortFunction((country: Country) => country.indicators.economy.exports?.[0], "desc"),
  },

  {
    key: "imports-asc",
    text: "Imports",
    formatOption: "imports",
    function: sortFunction((country: Country) => country.indicators.economy.imports?.[0]),
  },
  {
    key: "imports-desc",
    text: "Imports",
    formatOption: "imports",
    function: sortFunction((country: Country) => country.indicators.economy.imports?.[0], "desc"),
  },

  {
    key: "workingAgePopulation-asc",
    text: "Working Age Population",
    formatOption: "workingAgePopulation",
    function: sortFunction(
      (country: Country) => country.indicators.economy.workingAgePopulation?.[0]
    ),
  },
  {
    key: "workingAgePopulation-desc",
    text: "Working Age Population",
    formatOption: "workingAgePopulation",
    function: sortFunction(
      (country: Country) => country.indicators.economy.workingAgePopulation?.[0],
      "desc"
    ),
  },

  {
    key: "totalLaborForce-asc",
    text: "Total Labor Force",
    formatOption: "totalLaborForce",
    function: sortFunction((country: Country) => country.indicators.economy.totalLaborForce?.[0]),
  },
  {
    key: "totalLaborForce-desc",
    text: "Total Labor Force",
    formatOption: "totalLaborForce",
    function: sortFunction(
      (country: Country) => country.indicators.economy.totalLaborForce?.[0],
      "desc"
    ),
  },

  {
    key: "unemploymentRate-asc",
    text: "Unemployement Rate",
    formatOption: "unemploymentRate",
    function: sortFunction((country: Country) => country.indicators.economy.unemploymentRate?.[0]),
  },
  {
    key: "unemploymentRate-desc",
    text: "Unemployement Rate",
    formatOption: "unemploymentRate",
    function: sortFunction(
      (country: Country) => country.indicators.economy.unemploymentRate?.[0],
      "desc"
    ),
  },

  {
    key: "giniIndex-asc",
    text: "Gini Index",
    formatOption: "giniIndex",
    function: sortFunction((country: Country) => country.indicators.economy.giniIndex?.[0]),
  },
  {
    key: "giniIndex-desc",
    text: "Gini Index",
    formatOption: "giniIndex",
    function: sortFunction((country: Country) => country.indicators.economy.giniIndex?.[0], "desc"),
  },

  {
    key: "homicide-asc",
    text: "Homicide Rate",
    formatOption: "homicideRate",
    function: sortFunction((country: Country) => country.indicators.population.homicideRate?.[0]),
  },
  {
    key: "homicide-desc",
    text: "Homicide Rate",
    formatOption: "homicideRate",
    function: sortFunction(
      (country: Country) => country.indicators.population.homicideRate?.[0],
      "desc"
    ),
  },

  {
    key: "agriculturalLandPercent-asc",
    text: "Agricultural Land",
    formatOption: "agriculturalLandPercent",
    function: sortFunction(
      (country: Country) => country.indicators.environment.agriculturalLandPercent?.[0]
    ),
  },
  {
    key: "agriculturalLandPercent-desc",
    text: "Agricultural Land",
    formatOption: "agriculturalLandPercent",
    function: sortFunction(
      (country: Country) => country.indicators.environment.agriculturalLandPercent?.[0],
      "desc"
    ),
  },

  {
    key: "forestAreaPercent-asc",
    text: "Forest Area",
    formatOption: "forestAreaPercent",
    function: sortFunction((country: Country) => country.indicators.environment.forestAreaPercent),
  },
  {
    key: "forestAreaPercent-desc",
    text: "Forest Area",
    formatOption: "forestAreaPercent",
    function: sortFunction(
      (country: Country) => country.indicators.environment.forestAreaPercent?.[0],
      "desc"
    ),
  },
] as const;

export function getFormatOption(key: SortKeys): FormatKey {
  const option = SORTER.find((obj) => key === obj.key);
  return option?.formatOption !== undefined ? option.formatOption : "capital";
}

export function getSorted(list: Country[], key: SortKeys) {
  const sortFunction = getSortFunction(key);
  return [...list].sort(sortFunction);
}

function sortFunction(path: any, order = "asc") {
  return (a: Country, b: Country) => {
    const aValue = path(a);
    const bValue = path(b);

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    return order === "asc" ? aValue - bValue : bValue - aValue;
  };
}

function getSortFunction(key: SortKeys) {
  const sortObject = SORTER.find((obj) => key === obj.key);

  const sortFunction = sortObject ? sortObject.function : undefined;
  return sortFunction;
}
