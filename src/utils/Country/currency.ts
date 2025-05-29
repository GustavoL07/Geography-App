export default function getCurrencyInfo(data: any) {
    const currencyCode = Object.keys(data.currencies || {})[0];
    const currency = data.currencies[currencyCode] || {
      name: "Unknown",
      symbol: "None",
    };

    return {
      code: currencyCode || "None",
      name: currency.name || "Unknown",
      symbol: currency.symbol || "None",
    };
  }