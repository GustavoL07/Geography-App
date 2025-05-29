import addHDIToMap from "./getHDI";

const INDICATORS = [
  /*TECHNOLOGY*/
  { id: "IT.NET.USER.ZS", key: "internetUsage" }, // Uso da internet (% população)
  { id: "EG.ELC.ACCS.ZS", key: "electricityAccess" }, // Acesso à eletricidade (% população)
  { id: "SH.H2O.BASW.ZS", key: "basicWaterService" }, // Acesso a serviço básico de água
  { id: "SH.STA.BASS.ZS", key: "basicSanitationService" }, // Acesso a serviço básico de saneamento

  { id: "SE.ADT.1524.LT.ZS", key: "literacyRate" }, // Taxa de alfabetização de jovens (15–24)

  /*HEALTH*/
  { id: "SP.DYN.IMRT.IN", key: "infantMortality" }, // Mortalidade infantil (por mil)
  { id: "SP.DYN.LE00.IN", key: "lifeExpectancy" }, // Expectativa de vida ao nascer

  /*POPULATION*/
  { id: "SP.DYN.CBRT.IN", key: "birthRate" }, // Taxa de natalidade (por mil)
  { id: "SP.POP.GROW", key: "growthRate" }, // Taxa de crescimento populacional
  { id: "SP.URB.TOTL.IN.ZS", key: "urbanPercent" }, // % da população em áreas urbanas
  { id: "SP.RUR.TOTL.ZS", key: "ruralPercent" }, // % da população em áreas rurais
  { id: "SP.POP.TOTL.MA.ZS", key: "malePercent" }, // Homens
  { id: "SP.POP.TOTL.FE.ZS", key: "femalePercent" }, // Mulheres
  { id: "SP.POP.65UP.TO.ZS", key: "elderlyPercent" }, // 65+ anos

  /*ECONOMY*/
  { id: "NY.GDP.MKTP.CD", key: "gdp" }, // PIB (US$ atual)
  { id: "NY.GDP.PCAP.CD", key: "gdpPerCapita" }, // PIB per capita (US$ atual)
  { id: "FP.CPI.TOTL.ZG", key: "inflationRate" }, // Taxa de inflação (preços ao consumidor)
  { id: "NE.EXP.GNFS.CD", key: "exports" }, // Exportações
  { id: "NE.IMP.GNFS.CD", key: "imports" }, // Importações
  { id: "SP.POP.1564.TO", key: "workingAgePopulation" }, // População absoluta entre 15 e 64 anos
  { id: "SL.TLF.TOTL.IN", key: "totalLaborForce" }, // Força de trabalho total (% da população em idade ativa)
  { id: "SL.UEM.TOTL.ZS", key: "unemploymentRate" }, // Taxa de desemprego (% da força de trabalho)

  /*SOCIETY*/
  { id: "SI.POV.GINI", key: "giniIndex" }, // Índice de Gini (desigualdade)
  { id: "VC.IHR.PSRC.P5", key: "homicideRate" }, // Taxa de homicídios (por 100 mil)

  /*ENVIROMENT*/
  { id: "AG.LND.AGRI.ZS", key: "agriculturalLandPercent" }, // Uso de terra agrícola (% do total)
  { id: "AG.LND.FRST.ZS", key: "forestAreaPercent" }, // Área florestal (% do território)
];

const BASE_URL = "https://api.worldbank.org/v2/country/all/indicator/";

/*
https://api.worldbank.org/v2/country/all/indicator/SE.ADT.1524.LT.ZS?format=json&per_page=10000
*/

export default async function getCountryMetrics() {
  const metricsMap = new Map();

  try {
    const fetches = INDICATORS.map(async ({ id, key }) => {
      const res = await fetch(`${BASE_URL}${id}?format=json&per_page=20000`);
      const data = await res.json();
      const entries = data[1] || [];

      for (const entry of entries) {
        const iso = entry.countryiso3code;
        const value = entry.value;
        const date = parseInt(entry.date);

        if (!iso || value == null) continue;

        if (!metricsMap.has(iso)) {
          metricsMap.set(iso, {});
        }

        const countryMetrics = metricsMap.get(iso);

        if (!(key in countryMetrics) || (countryMetrics[key][1] ?? 0) < date) {
          countryMetrics[key] = [value, date];
        }
      }
    });

    await Promise.all(fetches);

    addHDIToMap(metricsMap);

    return metricsMap;
  } catch (error) {
    console.log(error);
    return new Map();
  }
}
