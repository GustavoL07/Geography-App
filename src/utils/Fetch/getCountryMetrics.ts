import { Indicators, WorldBankIndicator } from "@/types";
import addHDIToMap from "./getHDI";

interface IndicatorObject {
  [indicator: string]: [number, number];
}

const INDICATORS = [
  { id: "IT.NET.USER.ZS", key: "internetUsage" },
  { id: "EG.ELC.ACCS.ZS", key: "electricityAccess" },
  { id: "SH.H2O.BASW.ZS", key: "basicWaterService" },
  { id: "SH.STA.BASS.ZS", key: "basicSanitationService" },
  { id: "SE.ADT.1524.LT.ZS", key: "literacyRate" },
  { id: "SP.DYN.IMRT.IN", key: "infantMortality" },
  { id: "SP.DYN.LE00.IN", key: "lifeExpectancy" },
  { id: "SP.DYN.CBRT.IN", key: "birthRate" },
  { id: "SP.POP.GROW", key: "growthRate" },
  { id: "SP.URB.TOTL.IN.ZS", key: "urbanPercent" },
  { id: "SP.RUR.TOTL.ZS", key: "ruralPercent" },
  { id: "SP.POP.TOTL.MA.ZS", key: "malePercent" },
  { id: "SP.POP.TOTL.FE.ZS", key: "femalePercent" },
  { id: "SP.POP.65UP.TO.ZS", key: "elderlyPercent" },
  { id: "NY.GDP.MKTP.CD", key: "gdp" },
  { id: "NY.GDP.PCAP.CD", key: "gdpPerCapita" },
  { id: "FP.CPI.TOTL.ZG", key: "inflationRate" },
  { id: "NE.EXP.GNFS.CD", key: "exports" },
  { id: "NE.IMP.GNFS.CD", key: "imports" },
  { id: "SP.POP.1564.TO", key: "workingAgePopulation" },
  { id: "SL.TLF.TOTL.IN", key: "totalLaborForce" },
  { id: "SL.UEM.TOTL.ZS", key: "unemploymentRate" },
  { id: "SI.POV.GINI", key: "giniIndex" },
  { id: "VC.IHR.PSRC.P5", key: "homicideRate" },
  { id: "AG.LND.AGRI.ZS", key: "agriculturalLandPercent" },
  { id: "AG.LND.FRST.ZS", key: "forestAreaPercent" },
];

const BASE_URL = "https://api.worldbank.org/v2/country/all/indicator/";

export default async function getCountryMetrics() {
  const metricsMap: Map<string, IndicatorObject> = new Map();

  try {
    const fetches = INDICATORS.map(async ({ id, key }) => {
      const response = await fetch(`${BASE_URL}${id}?format=json&per_page=20000`);
      if (!response.ok) return;

      const data = await response.json();
      const entries: WorldBankIndicator[] = data[1];

      for (const entry of entries) {
        const iso = entry.countryiso3code;
        const value = entry.value;
        const date = parseInt(entry.date);

        if (!iso || value == null) continue;
        if (!metricsMap.has(iso)) metricsMap.set(iso, {});

        const countryMetrics = metricsMap.get(iso);
        if (countryMetrics && (!(key in countryMetrics) || (countryMetrics[key][1] ?? 0) < date)) {
          countryMetrics[key] = [value, date];
        }
      }
    });

    await Promise.all(fetches);
    addHDIToMap(metricsMap);

    return cleanMetrics(metricsMap);
  } catch (error) {
    console.log("World bank API error", error);
    throw error;
  }
}

function cleanMetrics(map: Map<string, IndicatorObject>) {
  const cleanedMap = new Map<string, Indicators>();

  for (const [iso3, metric] of map.entries()) {
    const cleaned: Record<string, number> = {};
    for (const [key, [firstValue]] of Object.entries(metric)) {
      cleaned[key] = firstValue;
    }
    cleanedMap.set(iso3, cleaned);
  }

  return cleanedMap;
}

/*
url: https://api.worldbank.org/v2/country/all/indicator/SE.ADT.1524.LT.ZS?format=json&per_page=20000

{
"indicator": {
  "id": "SI.POV.GINI",
  "value": "Gini index"
},
"country": {
  "id": "ZH",
  "value": "Africa Eastern and Southern"
},
"countryiso3code": "AFE",
"date": "2024",
"value": null,
"unit": "",
"obs_status": "",
"decimal": 1
},

*/
