export default class Country {
  constructor(data, borderNameMap) {
    this.name = {
      formal: data.name.official,
      informal: data.name.common,
      symbol: data.cca2,
    };

    this.capital = data.capital;
    this.continent = data.continents;
    this.flag = data.flags.svg;
    this.money = Country.getCurrencyInfo(data);
    this.language = Object.values(data.languages);

    const borderSymbols = data.borders || [];
    const borderNames = borderSymbols.map((code) => borderNameMap.get(code) || code);

    this.geography = {
      timezone: data.timezones,
      area: data.area,
      population: data.population,
      populationDensity: Math.round(data.population / data.area),
      position: {
        latitude: data.latlng[0],
        longitude: data.latlng[1],
        region: data.subregion,
      },
      borders: {
        symbols: borderSymbols,
        names: borderNames,
      },
    };
  }

  static getCurrencyInfo(data) {
    const currencyCode = Object.keys(data.currencies)[0];
    const currency = data.currencies[currencyCode];

    return {
      code: currencyCode,
      name: currency.name,
      symbol: currency.symbol,
    };
  }

  getFormattedBorder() {
    return this.geography.borders.names.length > 0
      ? this.geography.borders.names.join(", ")
      : "None";
  }

  /*  */

  getCapitalsQuantity() {
    return this.capital.length;
  }
  getLanguagesQuantity(){
    return this.language.length;
  }
  getBordersQuantity(){
    return this.geography.borders.names.length;
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
  getFormattedPopulationDensity(){
    return `${this.geography.populationDensity.toLocaleString()} people/km²`;
  }
  getFormattedLanguage(){
    return this.getLanguagesQuantity() === 1 ? this.language[0] : this.language.join(", ");
  }
  getFormattedPosition(value = "latitude" || "longitude"){
    return this.geography.position[value].toFixed(2) + "°"
  }
}
