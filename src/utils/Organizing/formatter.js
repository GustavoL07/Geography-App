const numericalPrecision = 2;
export const formatOptions = [
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

  { text: "Gini Index", key: "giniIndex" },
  { text: "Homicide Rate", key: "homicideRate" },

  { text: "Agricultural Land", key: "agriculturalLandPercent" },
  { text: "Forest Area", key: "forestAreaPercent" },
];

const FORMATTERS = {
  country: {
    capital: (value) => {
      return value.getCapitalsQuantity() === 1
        ? value.capital[0]
        : value.capital.sort((a, b) => a.localeCompare(b)).join(", ");
    },

    population: (country) => `${country.geography.population.toLocaleString()}`,
    area: (country) => `${country.geography.area.toLocaleString()} km²`,
    populationDensity: (country) =>
      `${country.geography.populationDensity.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} people/km²`,
    language: (country) => {
      const languages = country.getLanguagesQuantity() > 0 ? country.language : [];
      const sortedLanguages = languages.sort((a, b) => a.localeCompare(b));
      return sortedLanguages.length > 0 ? sortedLanguages.join(", ") : "None";
    },
    latitude: (country) => `${country.geography.position.latitude.toFixed(numericalPrecision)}°`,
    longitude: (country) => `${country.geography.position.longitude.toFixed(numericalPrecision)}°`,
    currency: (country) => `${country.money.name} (${country.money.symbol})`,
    timezone: (country) => {
      return country.getTimezonesQuantity() === 1
        ? country.geography.timezone[0]
        : country.geography.timezone.join(", ");
    },
    borderNames: (country) => {
      const borders = country.getBordersQuantity() > 0 ? country.geography.borders.names : [];
      const orderedBorders = borders.sort((a, b) => a.localeCompare(b));
      return orderedBorders.length > 0 ? orderedBorders.join(", ") : "None";
    },
    continent: (country) =>
      country.getContinentsQuantity() === 1
        ? `${country.continent[0]}`
        : country.continent.join(", "),
  },

  metrics: {
    internetUsage: (value) => `${value.toFixed(numericalPrecision)}%`,
    electricityAccess: (value) => `${value.toFixed(numericalPrecision)}%`,
    basicWaterService: (value) => `${value.toFixed(numericalPrecision)}%`,
    basicSanitationService: (value) => `${value.toFixed(numericalPrecision)}%`,

    literacyRate: (value) => `${value.toFixed(numericalPrecision)}%`,

    infantMortality: (value) => `${value.toFixed(numericalPrecision)} per 1.000 live births`,
    lifeExpectancy: (value) => `${value.toFixed(numericalPrecision)} years`,

    birthRate: (value) => `${value.toFixed(numericalPrecision)} per 1.000 people`,
    growthRate: (value) => `${value.toFixed(2)}%`,
    urbanPercent: (value) => `${value.toFixed(numericalPrecision)}%`,
    ruralPercent: (value) => `${value.toFixed(numericalPrecision)}%`,
    malePercent: (value) => `${value.toFixed(numericalPrecision)}%`,
    femalePercent: (value) => `${value.toFixed(numericalPrecision)}%`,
    elderlyPercent: (value) => `${value.toFixed(numericalPrecision)}% (+65 years)`,

    gdp: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    gdpPerCapita: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    inflationRate: (value) => `${value.toFixed(2)}%`,
    exports: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    imports: (value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    workingAgePopulation: (value) => value.toLocaleString(),
    totalLaborForce: (value) => value.toLocaleString(),
    unemploymentRate: (value) => `${value.toFixed(numericalPrecision)}% of Total Labor Force`,

    giniIndex: (value) => value.toFixed(2),
    homicideRate: (value) => `${value.toFixed(2)} per 100.000 people`,

    agriculturalLandPercent: (value) => `${value.toFixed(numericalPrecision)}%`,
    forestAreaPercent: (value) => `${value.toFixed(numericalPrecision)}%`,
  },
};

export function formatCountryValue(country, key) {
  if (!key) return "";

  const formatterType = getFormatType(key);
  const formatFunction = FORMATTERS[formatterType][key];

  if (formatterType === "country") {
    return formatFunction(country);
  } else if (formatterType === "metrics") {
    const type = getCountryIndicatorType(country, key);

    const value = country.indicators[type][key][0];
    return value !== null ? formatFunction(value) : "Unknown";
  }
}

function getFormatType(key) {
  for (const type in FORMATTERS) {
    if (key in FORMATTERS[type]) return type;
  }
}

function getCountryIndicatorType(country, key) {
  for (const type in country.indicators) {
    if (key in country.indicators[type]) return type;
  }
  return null;
}
