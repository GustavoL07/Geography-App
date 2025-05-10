export default class Country {
  static #none = "None";
  static #unknown = "Unknown";
  static SORT_OPTIONS = [
    {
      key: "nameAZ",
      text: "Name ",
      compareFunction: (a, b) => {
        return a.name.informal.localeCompare(b.name.informal);
      },
    },
    {
      key: "nameZA",
      text: "Name ↑",
      compareFunction: (a, b) => {
        return b.name.informal.localeCompare(a.name.informal);
      },
    },

    {
      key: "capitalAZ",
      text: "Capitals ↓",
      compareFunction: (a, b) => {
        const aCapital = a.getFormattedCapital();
        const bCapital = b.getFormattedCapital();
        return aCapital.localeCompare(bCapital);
      },
    },
    {
      key: "capitalZA",
      text: "Capitals ↑",
      compareFunction: (a, b) => {
        const aCapital = a.getFormattedCapital();
        const bCapital = b.getFormattedCapital();
        return bCapital.localeCompare(aCapital);
      },
    },

    {
      key: "populationAscending",
      text: "Population ↓",
      compareFunction: (a, b) => {
        return a.geography.population - b.geography.population;
      },
    },
    {
      key: "populationDescending",
      text: "Population ↑",
      compareFunction: (a, b) => {
        return b.geography.population - a.geography.population;
      },
    },

    {
      key: "populationDensityAscending",
      text: "Pop Density ↓",
      compareFunction: (a, b) => {
        return a.geography.populationDensity - b.geography.populationDensity;
      },
    },
    {
      key: "populationDensityDescending",
      text: "Pop Density ↑",
      compareFunction: (a, b) => {
        return b.geography.populationDensity - a.geography.populationDensity;
      },
    },

    {
      key: "areaAscending",
      text: "Area ↓",
      compareFunction: (a, b) => {
        return a.geography.area - b.geography.area;
      },
    },
    {
      key: "areaDescending",
      text: "Area ↑",
      compareFunction: (a, b) => {
        return b.geography.area - a.geography.area;
      },
    },
  ];

  static sortCountries(countryList, sortKey) {
    const sortOption = Country.SORT_OPTIONS.find((opt) => opt.key === sortKey);
    if (!sortOption) return countryList;

    return [...countryList].sort(sortOption.compareFunction);
  }

  constructor(data, borderNameMap) {
    this.name = {
      formal: data.name.official || Country.#unknown,
      informal: data.name.common || Country.#unknown,
      symbol: data.cca2 || Country.#none,
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

  getFormattedCapital() {
    return this.getCapitalsQuantity() === 1 ? this.capital[0] : this.capital.join(", ");
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
    return this.getLanguagesQuantity() === 1 ? this.language[0] : this.language.join(", ");
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
    return this.getBordersQuantity() > 0 ? this.geography.borders[value].join(", ") : Country.#none;
  }
}
