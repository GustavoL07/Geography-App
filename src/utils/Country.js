import convertSymbolTo3 from "./countrySymbols.js";

export default class Country {
  static #none = "None";
  static #unknown = "Unknown";
  static SORT_OPTIONS = [
    {
      key: "Name (A to Z)",
      text: "Name",
      compareFunction: (a, b) => {
        return a.name.informal.localeCompare(b.name.informal);
      },
    },
    {
      key: "Name (Z to A)",
      text: "Name",
      compareFunction: (a, b) => {
        return b.name.informal.localeCompare(a.name.informal);
      },
    },

    {
      key: "Capitals (A to Z)",
      text: "Capital",
      compareFunction: (a, b) => {
        const aCapital = a.getFormattedCapital();
        const bCapital = b.getFormattedCapital();
        return aCapital.localeCompare(bCapital);
      },
      getDescription: (country) => country.getFormattedCapital(),
    },
    {
      key: "Capitals (Z to A)",
      text: "Capital",
      compareFunction: (a, b) => {
        const aCapital = a.getFormattedCapital();
        const bCapital = b.getFormattedCapital();
        return bCapital.localeCompare(aCapital);
      },
      getDescription: (country) => country.getFormattedCapital(),
    },

    {
      key: "Population (Asc)",
      text: "Population",
      compareFunction: (a, b) => {
        return a.geography.population - b.geography.population;
      },
      getDescription: (country) => country.getFormattedPopulation(),
    },
    {
      key: "Population (Des)",
      text: "Population",
      compareFunction: (a, b) => {
        return b.geography.population - a.geography.population;
      },
      getDescription: (country) => country.getFormattedPopulation(),
    },

    {
      key: "Area (Asc)",
      text: "Area",
      compareFunction: (a, b) => {
        return a.geography.area - b.geography.area;
      },
      getDescription: (country) => country.getFormattedArea(),
    },
    {
      key: "Area (Des)",
      text: "Area",
      compareFunction: (a, b) => {
        return b.geography.area - a.geography.area;
      },
      getDescription: (country) => country.getFormattedArea(),
    },

    {
      key: "Pop. Density (Asc)",
      text: "Pop Density",
      compareFunction: (a, b) => {
        return a.geography.populationDensity - b.geography.populationDensity;
      },
      getDescription: (country) => country.getFormattedPopulationDensity(),
    },
    {
      key: "Pop. Density (Des)",
      text: "Pop Density",
      compareFunction: (a, b) => {
        return b.geography.populationDensity - a.geography.populationDensity;
      },
      getDescription: (country) => country.getFormattedPopulationDensity(),
    },
  ];

  static sortCountries(countryList, sortKey) {
    const sortOption = Country.SORT_OPTIONS.find((opt) => opt.key === sortKey);
    if (!sortOption) return countryList;

    return [...countryList].sort(sortOption.compareFunction);
  }

  static getCurrencyInfo(data) {
    const currencyCode = Object.keys(data.currencies || {})[0];
    const currency = data.currencies[currencyCode] || {
      name: Country.#unknown,
      symbol: Country.#none,
    };

    return {
      code: currencyCode || Country.#none,
      name: currency.name || Country.#unknown,
      symbol: currency.symbol || Country.#none,
    };
  }

  constructor(data, borderNameMap, metrics = {}) {
    this.name = {
      formal: data.name.official || Country.#unknown,
      informal: data.name.common || Country.#unknown,
      symbol: convertSymbolTo3(data.cca2) || Country.#none,
    };

    this.capital = data.capital || [Country.#unknown];
    this.continent = data.continents || [Country.#unknown];
    this.flag = data.flags.svg || null;
    this.money = Country.getCurrencyInfo(data);
    this.language = Object.values(data.languages || {}) || [Country.#none];

    const borderSymbols = data.borders || [];
    const borderNames = borderSymbols.map((code) => borderNameMap.get(code) || code);

    this.geography = {
      timezone: data.timezones || [],
      area: data.area || 0,
      population: data.population || 0,
      populationDensity: data.area && data.population ? Math.round(data.population / data.area) : 0,
      position: {
        latitude: data.latlng[0] || 0,
        longitude: data.latlng[1] || 0,
        region: data.subregion || Country.#unknown,
      },
      borders: {
        symbols: borderSymbols,
        names: borderNames,
      },
    };

    this.indicators = {
      technology: {
        internetUsage: metrics.internetUsage,
        electricityAccess: metrics.electricityAccess,
        basicWaterService: metrics.basicWaterService,
        basicSanitationService: metrics.basicSanitationService,
      },

      education: {
        youthLiteracyRate: metrics.youthLiteracyRate,
        secondaryNetEnrollmentRate: metrics.secondaryNetEnrollmentRate,
        tertiaryEnrollmentRate: metrics.tertiaryEnrollmentRate,
        genderParityPrimaryEducation: metrics.genderParityPrimaryEducation,
      },

      health: {
        infantMortality: metrics.infantMortality,
        lifeExpectancy: metrics.lifeExpectancy,
        healthyLifeExpectancy: metrics.healthyLifeExpectancy,
        healthExpenditurePercentGDP: metrics.healthExpenditurePercentGDP,
        physiciansPerThousand: metrics.physiciansPerThousand,
        mortalityRate: metrics.mortalityRate,
      },

      population: {
        birthRate: metrics.birthRate,
        populationGrowthRate: metrics.populationGrowthRate,
        urbanPopulationPercent: metrics.urbanPopulationPercent,
        urbanPopulation: metrics.urbanPopulation,
        ruralPopulationPercent: metrics.ruralPopulationPercent,
      },

      economy: {
        gdp: metrics.gdp,
        gdpPerCapita: metrics.gdpPerCapita,
        inflationRate: metrics.inflationRate,
        governmentDebtPercentGDP: metrics.governmentDebtPercentGDP,
        exportsPercentGDP: metrics.exportsPercentGDP,
        importsPercentGDP: metrics.importsPercentGDP,
        unemploymentRate: metrics.unemploymentRate,
      },

      society: {
        giniIndex: metrics.giniIndex,
        homicideRate: metrics.homicideRate,
      },

      environment: {
        co2EmissionsPerCapita: metrics.co2EmissionsPerCapita,
        agriculturalLandPercent: metrics.agriculturalLandPercent,
        forestAreaPercent: metrics.forestAreaPercent,
      },
    };
  }

  getAttribute(sortOptionsKey) {
    const obj = Country.SORT_OPTIONS.find((obj) => sortOptionsKey === obj.sortOptionsKey);
    return obj?.getDescription?.(this) || this.getFormattedCapital();
  }

  getCapitalsQuantity() {
    return this.capital.length;
  }

  getLanguagesQuantity() {
    return this.language.length;
  }

  getBordersQuantity() {
    return this.geography.borders.names.length;
  }

  getTimezonesQuantity() {
    return this.geography.timezone.length;
  }

  getContinentsQuantity() {
    return this.continent.length;
  }

  getFormattedCapital() {
    return this.getCapitalsQuantity() === 1
      ? this.capital[0]
      : this.capital.sort((a, b) => a.localeCompare(b)).join(", ");
  }

  getFormattedPopulation() {
    return this.geography.population.toLocaleString();
  }

  getFormattedArea() {
    return `${this.geography.area.toLocaleString()} km²`;
  }

  getFormattedPopulationDensity() {
    return `${this.geography.populationDensity.toLocaleString()} people/km²`;
  }

  getFormattedLanguage() {
    const languages = this.getLanguagesQuantity() > 0 ? this.language : [];
    const sortedLanguages = languages.sort((a, b) => a.localeCompare(b));
    return sortedLanguages.length > 0 ? sortedLanguages.join(", ") : Country.#none;
  }

  getFormattedPosition(value = "latitude") {
    return this.geography.position[value].toFixed(2) + "°";
  }

  getFormattedCurrency() {
    return `${this.money.name} (${this.money.symbol})`;
  }

  getFormattedTimezone() {
    return this.getTimezonesQuantity() === 1
      ? this.geography.timezone[0]
      : this.geography.timezone.join(", ");
  }

  getFormattedBorder(value = "names") {
    const borders = this.getBordersQuantity() > 0 ? this.geography.borders[value] : [];
    const orderedBorders = borders.sort((a, b) => a.localeCompare(b));
    return orderedBorders.length > 0 ? orderedBorders.join(", ") : Country.#none;
  }

  getFormattedContinent() {
    return this.getContinentsQuantity() === 1 ? this.continent[0] : this.continent.join(", ");
  }
}
