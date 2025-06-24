import { RestCountry } from "@/types";

export default function getCurrencyInfo(data: RestCountry) {
  const codes = data.currencies ? Object.keys(data.currencies) : [];
  const code = codes.length > 0 ? codes[0] : "None";
  const currency = (data.currencies && data.currencies[code]) || {
    name: "Unknown",
    symbol: "None",
  };

  return {
    code,
    name: currency.name || "Unknown",
    symbol: currency.symbol || "None",
  };
}
