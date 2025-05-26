import { FormatKey, formatCountryValue } from "../Organizing/formatter";
import threeDigit from "./symbol";

interface CountryData {
  name: {
    official: string;
    common: string;
  };
  cca2: string;
  capital: string[];
  continents: string[];
  flags: { svg: string };
  languages: { [key: string]: string };
  borders: string[];
  timezones: string[];
  area: number;
  population: number;
  latlng: [number, number];
  subregion: string;
}

interface MetricsGroup {
  [key: string]: [number, number] | undefined;
}

export default class Country {
  static #none = "None";
  static #unknown = "Unknown";

  static getCurrencyInfo(data: any) {
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

  name: { formal: string; informal: string; symbol: string };
  capital: string[];
  continent: string[];
  flag: string;
  money: { code: string; name: string; symbol: string };
  language: string[];
  geography: {
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
  };
  indicators: {
    technology: MetricsGroup;
    population: MetricsGroup;
    economy: MetricsGroup;
    environment: MetricsGroup;
  };

  constructor(data: CountryData, borderNameMap: Map<string, string>, metrics: MetricsGroup) {
    this.name = {
      formal: data.name.official || Country.#unknown,
      informal: data.name.common || Country.#unknown,
      symbol: threeDigit(data.cca2) || Country.#none,
    };

    this.capital = data.capital || [Country.#unknown];
    this.continent = data.continents || [Country.#unknown];
    this.flag = data.flags.svg || "";
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

    this.indicators = {
      technology: {
        internetUsage: metrics.internetUsage,
        electricityAccess: metrics.electricityAccess,
        basicWaterService: metrics.basicWaterService,
        basicSanitationService: metrics.basicSanitationService,
      },

      population: {
        birthRate: metrics.birthRate,
        growthRate: metrics.growthRate,
        urbanPercent: metrics.urbanPercent,
        ruralPercent: metrics.ruralPercent,
        malePercent: metrics.malePercent,
        femalePercent: metrics.femalePercent,
        elderlyPercent: metrics.elderlyPercent,
        infantMortality: metrics.infantMortality,
        lifeExpectancy: metrics.lifeExpectancy,
        literacyRate: metrics.literacyRate,
        homicideRate: metrics.homicideRate,
      },

      economy: {
        gdp: metrics.gdp,
        gdpPerCapita: metrics.gdpPerCapita,
        inflationRate: metrics.inflationRate,
        exports: metrics.exports,
        imports: metrics.imports,
        workingAgePopulation: metrics.workingAgePopulation,
        totalLaborForce: metrics.totalLaborForce,
        unemploymentRate: metrics.unemploymentRate,
        giniIndex: metrics.giniIndex,
      },

      environment: {
        agriculturalLandPercent: metrics.agriculturalLandPercent,
        forestAreaPercent: metrics.forestAreaPercent,
      },
    };
  }

  getFormatted(key: FormatKey) {
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
