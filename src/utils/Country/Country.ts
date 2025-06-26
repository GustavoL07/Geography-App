import {
  FormatKey,
  Continent,
  Indicators,
  RestCountry,
  CountryName,
  CountryMoney,
  CountryGeography,
  CountryIndicator,
} from "@/types";
import { formatCountryValue } from "../Organizing/formatter";
import threeDigit from "./symbol";
import getCurrencyInfo from "./currency";
import getBorders from "./borders";

export default class Country {
  static #none = "None";
  static #unknown = "Unknown";

  name: CountryName;
  capital: string[];
  continent: Continent;
  flag: string;
  money: CountryMoney;
  language: string[];
  independent: boolean;
  unMember: boolean;
  geography: CountryGeography;
  indicators: CountryIndicator;
  favorited: boolean;

  constructor(
    data: RestCountry,
    borderNameMap: Map<string, string>,
    indicator: Indicators | undefined
  ) {
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
    this.independent = data.independent;
    this.unMember = data.unMember;

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
        internetUsage: indicator?.internetUsage ?? null,
        electricityAccess: indicator?.electricityAccess ?? null,
        basicWaterService: indicator?.basicWaterService ?? null,
        basicSanitationService: indicator?.basicSanitationService ?? null,
      },

      population: {
        birthRate: indicator?.birthRate ?? null,
        growthRate: indicator?.growthRate ?? null,
        urbanPercent: indicator?.urbanPercent ?? null,
        ruralPercent: indicator?.ruralPercent ?? null,
        malePercent: indicator?.malePercent ?? null,
        femalePercent: indicator?.femalePercent ?? null,
        elderlyPercent: indicator?.elderlyPercent ?? null,
        infantMortality: indicator?.infantMortality ?? null,
        lifeExpectancy: indicator?.lifeExpectancy ?? null,
        literacyRate: indicator?.literacyRate ?? null,
        homicideRate: indicator?.homicideRate ?? null,
      },

      economy: {
        gdp: indicator?.gdp ?? null,
        gdpPerCapita: indicator?.gdpPerCapita ?? null,
        inflationRate: indicator?.inflationRate ?? null,
        exports: indicator?.exports ?? null,
        imports: indicator?.imports ?? null,
        workingAgePopulation: indicator?.workingAgePopulation ?? null,
        totalLaborForce: indicator?.totalLaborForce ?? null,
        unemploymentRate: indicator?.unemploymentRate ?? null,
        giniIndex: indicator?.giniIndex ?? null,
        HDI: indicator?.HDI ?? null,
      },

      environment: {
        agriculturalLandPercent: indicator?.agriculturalLandPercent ?? null,
        forestAreaPercent: indicator?.forestAreaPercent ?? null,
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
      independent: this.independent,
      unMember: this.unMember,
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
