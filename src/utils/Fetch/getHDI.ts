import HDIData from "./HDI.json";

function getHDI(key: string) {
  const obj = HDIData.find((obj: any) => key === obj.iso3);
  return obj ? [parseFloat(obj.HDI), 2023] : undefined;
}

export default function addHDIToMap(map: Map<string, object>) {
  map.forEach((value, key) => {
    const hdiValue = getHDI(key);
    map.set(key, { ...value, HDI: hdiValue });
  });
}
