import countries from "i18n-iso-countries";

export default function threeDigit(twoDigit: string): string {
  return countries.alpha2ToAlpha3(twoDigit.toUpperCase()) || twoDigit;
}
