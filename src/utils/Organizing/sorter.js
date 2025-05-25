export const SORTER = [
  {
    key: "name-asc",
    text: "Name",
    function: (a, b) => a.name.informal.toLowerCase().localeCompare(b.name.informal.toLowerCase()),
  },
  {
    key: "name-desc",
    text: "Name",
    function: (a, b) => b.name.informal.toLowerCase().localeCompare(a.name.informal.toLowerCase()),
  },

  {
    key: "area-asc",
    text: "Area",
    function: (a, b) => a.geography.area - b.geography.area,
  },
  {
    key: "area-desc",
    text: "Area",
    function: (a, b) => b.geography.area - a.geography.area,
  },

  {
    key: "population-asc",
    text: "Population",
    function: (a, b) => a.geography.population - b.geography.population,
  },
  {
    key: "population-desc",
    text: "Population",
    function: (a, b) => b.geography.population - a.geography.population,
  },

  {
    key: "populationDensity-asc",
    text: "Population Density",
    function: (a, b) => a.geography.populationDensity - b.geography.populationDensity,
  },
  {
    key: "populationDensity-desc",
    text: "Population Density",
    function: (a, b) => b.geography.populationDensity - a.geography.populationDensity,
  },

  {
    key: "latitude-asc",
    text: "Latitude",
    function: (a, b) => a.geography.position.latitude - b.geography.position.latitude,
  },
  {
    key: "latitude-desc",
    text: "Latitude",
    function: (a, b) => b.geography.position.latitude - a.geography.position.latitude,
  },

  {
    key: "longitude-asc",
    text: "Longitude",
    function: (a, b) => a.geography.position.longitude - b.geography.position.longitude,
  },
  {
    key: "longitude-desc",
    text: "Longitude",
    function: (a, b) => b.geography.position.longitude - a.geography.position.longitude,
  },

  {
    key: "internetUsage-asc",
    text: "Internet Usage",
    function: sortFunction((country) => country.indicators.technology.internetUsage[0]),
  },
  {
    key: "internetUsage-desc",
    text: "Internet Usage",
    function: sortFunction((country) => country.indicators.technology.internetUsage[0], "desc"),
  },

  {
    key: "electricityAccess-asc",
    text: "Electricity Access",
    function: sortFunction((country) => country.indicators.technology.electricityAccess[0]),
  },
  {
    key: "electricityAccess-desc",
    text: "Electricity Access",
    function: sortFunction((country) => country.indicators.technology.electricityAccess[0], "desc"),
  },

  {
    key: "basicWaterService-asc",
    text: "Water Services",
    function: sortFunction((country) => country.indicators.technology.basicWaterService[0]),
  },
  {
    key: "basicWaterService-desc",
    text: "Water Services",
    function: sortFunction((country) => country.indicators.technology.basicWaterService[0], "desc"),
  },

  {
    key: "literacyRate-asc",
    text: "Literacy Rate",
    function: sortFunction((country) => country.indicators.population.literacyRate[0]),
  },
  {
    key: "literacyRate-desc",
    text: "Literacy Rate",
    function: sortFunction((country) => country.indicators.population.literacyRate[0], "desc"),
  },

  {
    key: "lifeExpectancy-asc",
    text: "Life Expectancy",
    function: sortFunction((country) => country.indicators.population.lifeExpectancy[0]),
  },
  {
    key: "lifeExpectancy-desc",
    text: "Life Expectancy",
    function: sortFunction((country) => country.indicators.population.lifeExpectancy[0], "desc"),
  },

  {
    key: "infantMortality-asc",
    text: "Infant Mortality",
    function: sortFunction((country) => country.indicators.population.infantMortality[0]),
  },
  {
    key: "infantMortality-desc",
    text: "Infant Mortality",
    function: sortFunction((country) => country.indicators.population.infantMortality[0], "desc"),
  },

  {
    key: "birthRate-asc",
    text: "Birth Rate",
    function: sortFunction((country) => country.indicators.population.birthRate[0]),
  },
  {
    key: "birthRate-desc",
    text: "Birth Rate",
    function: sortFunction((country) => country.indicators.population.birthRate[0], "desc"),
  },

  {
    key: "growthRate-asc",
    text: "Pop. Growth Rate",
    function: sortFunction((country) => country.indicators.population.growthRate[0]),
  },
  {
    key: "growthRate-desc",
    text: "Pop. Growth Rate",
    function: sortFunction(
      (country) => country.indicators.population.growthRate[0],
      "desc"
    ),
  },

  {
    key: "urbanPercent-asc",
    text: "Urban Population",
    function: sortFunction((country) => country.indicators.population.urbanPercent[0]),
  },
  {
    key: "urbanPercent-desc",
    text: "Urban Population",
    function: sortFunction(
      (country) => country.indicators.population.urbanPercent[0],
      "desc"
    ),
  },

  {
    key: "ruralPercent-asc",
    text: "Rural Population",
    function: sortFunction((country) => country.indicators.population.ruralPercent[0]),
  },
  {
    key: "ruralPercent-desc",
    text: "Rural Population",
    function: sortFunction(
      (country) => country.indicators.population.ruralPercent[0],
      "desc"
    ),
  },

  {
    key: "malePercent-asc",
    text: "Male Population",
    function: sortFunction((country) => country.indicators.population.malePercent[0]),
  },
  {
    key: "malePercent-desc",
    text: "Male Population",
    function: sortFunction(
      (country) => country.indicators.population.malePercent[0],
      "desc"
    ),
  },

  {
    key: "femalePercent-asc",
    text: "Female Population",
    function: sortFunction((country) => country.indicators.population.femalePercent[0]),
  },
  {
    key: "femalePercent-desc",
    text: "Female Population",
    function: sortFunction(
      (country) => country.indicators.population.femalePercent[0],
      "desc"
    ),
  },

  {
    key: "elderyPopulation-asc",
    text: "Eldery Population",
    function: sortFunction((country) => country.indicators.population.elderyPopulation[0]),
  },
  {
    key: "elderyPopulation-desc",
    text: "Eldery Population",
    function: sortFunction((country) => country.indicators.population.elderyPopulation[0], "desc"),
  },

  {
    key: "gdp-asc",
    text: "GDP",
    function: sortFunction((country) => country.indicators.economy.gdp[0]),
  },
  {
    key: "gdp-desc",
    text: "GDP",
    function: sortFunction((country) => country.indicators.economy.gdp[0], "desc"),
  },

  {
    key: "gdpPerCapita-asc",
    text: "GDP Per Capita",
    function: sortFunction((country) => country.indicators.economy.gdpPerCapita[0]),
  },
  {
    key: "gdpPerCapita-desc",
    text: "GDP Per Capita",
    function: sortFunction((country) => country.indicators.economy.gdpPerCapita[0], "desc"),
  },

  {
    key: "inflationRate-asc",
    text: "Inflation Rate",
    function: sortFunction((country) => country.indicators.economy.inflationRate[0]),
  },
  {
    key: "inflationRate-desc",
    text: "Inflation Rate",
    function: sortFunction((country) => country.indicators.economy.exports[0], "desc"),
  },

  {
    key: "exports-asc",
    text: "Exports",
    function: sortFunction((country) => country.indicators.economy.exports[0]),
  },
  {
    key: "exports-desc",
    text: "Exports",
    function: sortFunction((country) => country.indicators.economy.exports[0], "desc"),
  },

  {
    key: "imports-asc",
    text: "Imports",
    function: sortFunction((country) => country.indicators.economy.imports[0]),
  },
  {
    key: "imports-desc",
    text: "Imports",
    function: sortFunction((country) => country.indicators.economy.imports[0], "desc"),
  },

  {
    key: "workingAgePopulation-asc",
    text: "Working Age Population",
    function: sortFunction((country) => country.indicators.economy.workingAgePopulation[0]),
  },
  {
    key: "workingAgePopulation-desc",
    text: "Working Age Population",
    function: sortFunction((country) => country.indicators.economy.workingAgePopulation[0], "desc"),
  },

  {
    key: "totalLaborForce-asc",
    text: "Total Labor Force",
    function: sortFunction((country) => country.indicators.economy.totalLaborForce[0]),
  },
  {
    key: "totalLaborForce-desc",
    text: "Total Labor Force",
    function: sortFunction((country) => country.indicators.economy.totalLaborForce[0], "desc"),
  },

  {
    key: "unemploymentRate-asc",
    text: "Unemployement Rate",
    function: sortFunction((country) => country.indicators.economy.unemploymentRate[0]),
  },
  {
    key: "unemploymentRate-desc",
    text: "Unemployement Rate",
    function: sortFunction((country) => country.indicators.economy.unemploymentRate[0], "desc"),
  },

  {
    key: "giniIndex-asc",
    text: "Gini Index",
    function: sortFunction((country) => country.indicators.economy.giniIndex[0]),
  },
  {
    key: "giniIndex-desc",
    text: "Gini Index",
    function: sortFunction((country) => country.indicators.economy.giniIndex[0], "desc"),
  },

  {
    key: "homicide-asc",
    text: "Homicide Rate",
    function: sortFunction((country) => country.indicators.population.homicideRate[0]),
  },
  {
    key: "homicide-desc",
    text: "Homicide Rate",
    function: sortFunction((country) => country.indicators.population.homicideRate[0], "desc"),
  },

  {
    key: "agriculturalLandPercent-asc",
    text: "Agricultural Land",
    function: sortFunction((country) => country.environment.agriculturalLandPercent[0]),
  },
  {
    key: "agriculturalLandPercent-desc",
    text: "Agricultural Land",
    function: sortFunction(
      (country) => country.indicators.environment.agriculturalLandPercent[0],
      "desc"
    ),
  },

  {
    key: "forestAreaPercent-asc",
    text: "Forest Area",
    function: sortFunction((country) => country.indicators.environment.forestAreaPercent),
  },
  {
    key: "forestAreaPercent-desc",
    text: "Forest Area",
    function: sortFunction(
      (country) => country.indicators.environment.forestAreaPercent[0],
      "desc"
    ),
  },
];

function sortFunction(path, order = "asc") {
  return (a, b) => {
    const aValue = path(a);
    const bValue = path(b);

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    return order === "asc" ? aValue - bValue : bValue - aValue;
  };
}

function getSortFunction(key) {
  const sortObject = SORTER.find((obj) => key === obj.key);
  const sortFunction = sortObject.function || function () {};
  return sortFunction;
}

export function getSorted(list, key) {
  const sortFunction = getSortFunction(key);
  return [...list].sort(sortFunction);
}
