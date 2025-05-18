const INDICATORS = [
  { id: "NY.GDP.MKTP.CD", key: "gdp" },
  { id: "NY.GDP.PCAP.CD", key: "gdpPerCapita" },
  { id: "SP.DYN.LE00.IN", key: "lifeExpectancy" },
  { id: "EG.ELC.ACCS.ZS", key: "electricityAccess" },
  { id: "SP.DYN.CBRT.IN", key: "birthRate" },
  { id: "SH.DYN.MORT", key: "mortalityRate" },
  { id: "SE.ADT.LITR.ZS", key: "literacyRate" },
  { id: "SI.POV.GINI", key: "giniIndex" },
  { id: "SH.XPD.CHEX.GD.ZS", key: "healthExpenditure" },
  { id: "IT.NET.USER.ZS", key: "internetUsage" },
  { id: "EN.ATM.CO2E.KT", key: "co2Emissions" },
  { id: "EG.FEC.RNEW.ZS", key: "renewableEnergy" },
  { id: "SP.POP.GROW", key: "populationGrowthRate" },
  { id: "SH.H2O.SAFE.ZS", key: "accessToSafeWater" },
  { id: "SP.DYN.IMRT.IN", key: "infantMortality" },
  { id: "SL.UEM.TOTL.ZS", key: "unemploymentRate" },
  { id: "SE.ENR.TERT.ZS", key: "tertiaryEducationEnrollment" },
  { id: "SP.RUR.TOTL.ZS", key: "ruralPopulationPercent" },
  { id: "SP.URB.TOTL.IN.ZS", key: "urbanPopulationPercent" },

];

const BASE_URL = "https://api.worldbank.org/v2/country/all/indicator/";

/*
https://api.worldbank.org/v2/country/all/indicator/SP.DYN.LE00.IN?format=json&date=2022&per_page=10000
*/

export default async function getCountryMetrics(year = "2022") {
  const metricsMap = new Map();

  const fetches = INDICATORS.map(async ({ id, key }) => {
    const res = await fetch(`${BASE_URL}${id}?format=json&date=${year}&per_page=10000`);
    const data = await res.json();
    const entries = data[1] || [];

    for (const entry of entries) {
      const iso = entry.countryiso3code;
      const value = entry.value;

      if (!iso || value == null) continue;

      if (!metricsMap.has(iso)) {
        metricsMap.set(iso, {});
      }

      metricsMap.get(iso)[key] = value;
    }
  });

  await Promise.all(fetches);
  return metricsMap; // Map { 'BRA' => { gdp: 123, giniIndex: 0.45, ... }, ... }
}
