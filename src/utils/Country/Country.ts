import { formatCountryValue } from "../Organizing/formatter";
import threeDigit from "./symbol";
import getCurrencyInfo from "./currency";
import getBorders from "./borders";

import {
  CountryName,
  Continents,
  CountryMoney,
  CountryGeography,
  CountryIndicators,
  FormatKey,
} from "@/types";

export default class Country {
  static #none = "None";
  static #unknown = "Unknown";

  name: CountryName;
  capital: string[];
  continent: Continents;
  flag: string;
  money: CountryMoney;
  language: string[];
  geography: CountryGeography;
  indicators: CountryIndicators;
  favorited: boolean;

  constructor(data: any, borderNameMap: Map<string, string>, metrics: any) {
    this.name = {
      formal: data.name.official || Country.#unknown,
      informal: data.name.common || Country.#unknown,
      symbol: threeDigit(data.cca2) || Country.#none,
    };

    this.capital = data.capital || [Country.#unknown];
    this.continent = data.continents[0] || [Country.#unknown];
    this.flag = data.flags.svg || "";
    this.money = getCurrencyInfo(data);
    this.language = Object.values(data.languages || {}) || [Country.#none];

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
      borders: { ...getBorders(data, borderNameMap) },
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
        HDI: metrics.HDI,
      },

      environment: {
        agriculturalLandPercent: metrics.agriculturalLandPercent,
        forestAreaPercent: metrics.forestAreaPercent,
      },
    };

    this.favorited = false;
  }

  toJSON() {
    return {
      name: this.name,
      capital: this.capital,
      continent: this.continent,
      flag: this.flag,
      money: this.money,
      language: this.language,
      geography: this.geography,
      indicators: this.indicators,
      favorited: this.favorited,
    };
  }

  static fromJSON(obj: any): Country {
    const dummy = Object.create(Country.prototype);
    return Object.assign(dummy, obj);
  }

  setFavorited() {
    this.favorited = !this.favorited;
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
}
