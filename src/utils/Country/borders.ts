export default function getBorders(data: any, borderNameMap: Map<string, string>) {
  const borderSymbols = data.borders || [];
  const borderNames = borderSymbols.map((code: any) => borderNameMap.get(code) || code);

  return {
    symbols: borderSymbols,
    names: borderNames,
  };
}
