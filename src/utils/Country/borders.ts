import { RestCountry } from "@/types";

export default function getBorders(data: RestCountry, borderNameMap: Map<string, string>) {
  const borderSymbols = data.borders || [];
  const borderNames = borderSymbols.map((code) => borderNameMap.get(code) || code);

  return {
    symbols: borderSymbols,
    names: borderNames,
  };
}
