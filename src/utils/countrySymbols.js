import countries from "i18n-iso-countries";

export default function convertSymbolTo3(twoDigit) {
  return countries.alpha2ToAlpha3(twoDigit.toUpperCase()) || twoDigit;
}
