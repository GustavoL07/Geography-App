import countries from "i18n-iso-countries";

/**
 * Converts ISO alpha-2 country code (e.g. "US") to alpha-3 (e.g. "USA").
 * If conversion fails, returns the original code.
 */
export default function threeDigit(twoDigit: string): string {
  return countries.alpha2ToAlpha3(twoDigit.toUpperCase()) || twoDigit;
}
