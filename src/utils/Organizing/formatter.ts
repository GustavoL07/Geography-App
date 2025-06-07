import { Country, FormatKey } from "@/types";

const numericalPrecision = 2;
const unknown = "Unknown";
const formatters = {
  name: (country: Country) => {
    return `${country.name.informal}`;
  },

  capital: (country: Country) => {
    return country.getCapitalsQuantity() === 1
      ? country.capital[0]
      : country.capital.sort((a, b) => a.localeCompare(b)).join(", ");
  },

  population: (country: Country) => `${country.geography.population.toLocaleString()}`,
  area: (country: Country) => `${country.geography.area.toLocaleString()} km²`,
  populationDensity: (country: Country) =>
    `${country.geography.populationDensity.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} people/km²`,
  language: (country: Country) => {
    const languages = country.getLanguagesQuantity() > 0 ? country.language : [];
    const sortedLanguages = languages.sort((a, b) => a.localeCompare(b));
    return sortedLanguages.length > 0 ? sortedLanguages.join(", ") : "None";
  },
  latitude: (country: Country) =>
    `${country.geography.position.latitude.toFixed(numericalPrecision)}°`,
  longitude: (country: Country) =>
    `${country.geography.position.longitude.toFixed(numericalPrecision)}°`,
  currency: (country: Country) => `${country.money.name} (${country.money.symbol})`,
  timezone: (country: Country) => {
    return country.getTimezonesQuantity() === 1
      ? country.geography.timezone[0]
      : country.geography.timezone.join(", ");
  },
  borderNames: (country: Country) => {
    const borders = country.getBordersQuantity() > 0 ? country.geography.borders.names : [];
    const orderedBorders = borders.sort((a, b) => a.localeCompare(b));
    return orderedBorders.length > 0 ? orderedBorders.join(", ") : "None";
  },
  continent: (country: Country) => `${country.continent}`,

  internetUsage: (country: Country) => {
    const value = country.indicators.technology.internetUsage;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  electricityAccess: (country: Country) => {
    const value = country.indicators.technology.electricityAccess;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  basicWaterService: (country: Country) => {
    const value = country.indicators.technology.basicWaterService;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  basicSanitationService: (country: Country) => {
    const value = country.indicators.technology.basicSanitationService;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },

  birthRate: (country: Country) => {
    const value = country.indicators.population.birthRate;
    return value != null ? `${value[0].toFixed(numericalPrecision)} per 1.000 people` : unknown;
  },
  growthRate: (country: Country) => {
    const value = country.indicators.population.growthRate;
    return value != null ? `${value[0].toFixed(2)}%` : unknown;
  },
  urbanPercent: (country: Country) => {
    const value = country.indicators.population.urbanPercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  ruralPercent: (country: Country) => {
    const value = country.indicators.population.ruralPercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  malePercent: (country: Country) => {
    const value = country.indicators.population.malePercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  femalePercent: (country: Country) => {
    const value = country.indicators.population.femalePercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  elderlyPercent: (country: Country) => {
    const value = country.indicators.population.elderlyPercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}% (+65 years)` : unknown;
  },
  infantMortality: (country: Country) => {
    const value = country.indicators.population.infantMortality;
    return value != null
      ? `${value[0].toFixed(numericalPrecision)} per 1.000 live births`
      : unknown;
  },
  lifeExpectancy: (country: Country) => {
    const value = country.indicators.population.lifeExpectancy;
    return value != null ? `${value[0].toFixed(numericalPrecision)} years` : unknown;
  },
  literacyRate: (country: Country) => {
    const value = country.indicators.population.literacyRate;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  homicideRate: (country: Country) => {
    const value = country.indicators.population.homicideRate;
    return value != null ? `${value[0].toFixed(2)} per 100.000 people` : unknown;
  },

  gdp: (country: Country) => {
    const value = country.indicators.economy.gdp;
    return value != null
      ? `$${value[0].toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : unknown;
  },
  gdpPerCapita: (country: Country) => {
    const value = country.indicators.economy.gdpPerCapita;
    return value != null
      ? `$${value[0].toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : unknown;
  },
  inflationRate: (country: Country) => {
    const value = country.indicators.economy.inflationRate;
    return value != null ? `${value[0].toFixed(2)}%` : unknown;
  },
  exports: (country: Country) => {
    const value = country.indicators.economy.exports;
    return value != null
      ? `$${value[0].toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : unknown;
  },
  imports: (country: Country) => {
    const value = country.indicators.economy.imports;
    return value != null
      ? `$${value[0].toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : unknown;
  },
  workingAgePopulation: (country: Country) => {
    const value = country.indicators.economy.workingAgePopulation;
    return value != null ? value[0].toLocaleString() : unknown;
  },
  totalLaborForce: (country: Country) => {
    const value = country.indicators.economy.totalLaborForce;
    return value != null ? value[0].toLocaleString() : unknown;
  },
  unemploymentRate: (country: Country) => {
    const value = country.indicators.economy.unemploymentRate;
    return value != null
      ? `${value[0].toFixed(numericalPrecision)}% of Total Labor Force`
      : unknown;
  },
  giniIndex: (country: Country) => {
    const value = country.indicators.economy.giniIndex;
    return value != null ? value[0].toFixed(2) : unknown;
  },
  hdi: (country: Country) => {
    const value = country.indicators.economy.HDI;
    return value != null ? `${value[0].toFixed(3)}` : unknown;
  },

  agriculturalLandPercent: (country: Country) => {
    const value = country.indicators.environment.agriculturalLandPercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
  forestAreaPercent: (country: Country) => {
    const value = country.indicators.environment.forestAreaPercent;
    return value != null ? `${value[0].toFixed(numericalPrecision)}%` : unknown;
  },
};

export const formatOptions = [
  { text: "Name", key: "name" },
  { text: "Capital", key: "capital" },
  { text: "Continent", key: "continent" },
  { text: "Area", key: "area" },
  { text: "Population", key: "population" },
  { text: "Population Density", key: "populationDensity" },
  { text: "Language", key: "language" },
  { text: "Latitude", key: "latitude" },
  { text: "Longitude", key: "longitude" },
  { text: "Currency", key: "currency" },
  { text: "Timezone", key: "timezone" },
  { text: "Borders", key: "borderNames" },

  { text: "Internet Usage", key: "internetUsage" },
  { text: "Electricity Access", key: "electricityAccess" },
  { text: "Basic Water Service", key: "basicWaterService" },
  { text: "Basic Sanitation Service", key: "basicSanitationService" },

  { text: "Literacy Rate", key: "literacyRate" },

  { text: "Life Expectancy", key: "lifeExpectancy" },
  { text: "Infant Mortality", key: "infantMortality" },

  { text: "Birth Rate", key: "birthRate" },
  { text: "Population Growth Rate", key: "growthRate" },
  { text: "Urban Population", key: "urbanPercent" },
  { text: "Rural Population", key: "ruralPercent" },
  { text: "Male Population", key: "malePercent" },
  { text: "Female Population", key: "femalePercent" },
  { text: "Elderly Population", key: "elderlyPercent" },

  { text: "GDP", key: "gdp" },
  { text: "GDP Per Capita", key: "gdpPerCapita" },
  { text: "Inflation Rate", key: "inflationRate" },
  { text: "Exports", key: "exports" },
  { text: "Imports", key: "imports" },
  { text: "Working Age Population", key: "workingAgePopulation" },
  { text: "Total Labor Force", key: "totalLaborForce" },
  { text: "Unemployment Rate", key: "unemploymentRate" },
  { text: "HDI", key: "hdi" },

  { text: "Gini Index", key: "giniIndex" },
  { text: "Homicide Rate", key: "homicideRate" },

  { text: "Agricultural Land", key: "agriculturalLandPercent" },
  { text: "Forest Area", key: "forestAreaPercent" },
] as const;

export function formatCountryValue(country: Country, key: FormatKey): string {
  const formatFunction = formatters[key];
  return formatFunction(country);
}
