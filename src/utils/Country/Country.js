import { formatCountryValue } from "../Organizing/formatter.js";
import threeDigit from "./symbol.js";

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
      symbol: threeDigit(data.cca2) || Country.#none,
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
      populationDensity: data.area && data.population ? data.population / data.area : 0,
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

    const defaultValue = [null, null];
    this.indicators = {
      technology: {
        internetUsage: metrics.internetUsage || defaultValue,
        electricityAccess: metrics.electricityAccess || defaultValue,
        basicWaterService: metrics.basicWaterService || defaultValue,
        basicSanitationService: metrics.basicSanitationService || defaultValue,
      },

      population: {
        birthRate: metrics.birthRate || defaultValue,
        growthRate: metrics.growthRate || defaultValue,
        urbanPercent: metrics.urbanPercent || defaultValue,
        ruralPercent: metrics.ruralPercent || defaultValue,
        malePercent: metrics.malePercent || defaultValue,
        femalePercent: metrics.femalePercent || defaultValue,
        elderlyPercent: metrics.elderlyPercent || defaultValue,
        infantMortality: metrics.infantMortality || defaultValue,
        lifeExpectancy: metrics.lifeExpectancy || defaultValue,
        literacyRate: metrics.literacyRate || defaultValue,
        homicideRate: metrics.homicideRate || defaultValue,
      },

      economy: {
        gdp: metrics.gdp || defaultValue,
        gdpPerCapita: metrics.gdpPerCapita || defaultValue,
        inflationRate: metrics.inflationRate || defaultValue,
        exports: metrics.exports || defaultValue,
        imports: metrics.imports || defaultValue,
        workingAgePopulation: metrics.workingAgePopulation || defaultValue,
        totalLaborForce: metrics.totalLaborForce || defaultValue,
        unemploymentRate: metrics.unemploymentRate || defaultValue,
        giniIndex: metrics.giniIndex || defaultValue,
      },

      environment: {
        agriculturalLandPercent: metrics.agriculturalLandPercent || defaultValue,
        forestAreaPercent: metrics.forestAreaPercent || defaultValue,
      },
    };
  }

  getAttribute(sortOptionsKey) {
    const obj = Country.SORT_OPTIONS.find((obj) => sortOptionsKey === obj.sortOptionsKey);
    return obj?.getDescription?.(this) || this.getFormattedCapital();
  }

  getFormatted(key) {
    return formatCountryValue(this, key) || "";
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
}
