const INDICATORS = [
  { id: "IT.NET.USER.ZS", key: "internetUsage" }, // Uso da internet (% população)
  { id: "EG.ELC.ACCS.ZS", key: "electricityAccess" }, // Acesso à eletricidade (% população)
  { id: "SH.H2O.BASW.ZS", key: "basicWaterService" }, // Acesso a serviço básico de água
  { id: "SH.STA.BASS.ZS", key: "basicSanitationService" }, // Acesso a serviço básico de saneamento

  { id: "SE.ADT.1524.LT.ZS", key: "youthLiteracyRate" }, // Taxa de alfabetização de jovens (15–24)
  { id: "SE.SEC.NENR", key: "secondaryNetEnrollmentRate" }, // Matrícula líquida no ensino secundário
  { id: "SE.TER.ENRR", key: "tertiaryEnrollmentRate" }, // Taxa de matrícula no ensino superior
  { id: "SE.ENR.PRSC.FM.ZS", key: "genderParityPrimaryEducation" }, // Paridade de gênero no ensino primário

  { id: "SP.DYN.IMRT.IN", key: "infantMortality" }, // Mortalidade infantil (por mil)
  { id: "SP.DYN.LE00.IN", key: "lifeExpectancy" }, // Expectativa de vida ao nascer
  { id: "SH.HAP.HLYS", key: "healthyLifeExpectancy" }, // Expectativa de vida saudável
  { id: "SH.XPD.CHEX.GD.ZS", key: "healthExpenditurePercentGDP" }, // Gastos com saúde (% do PIB)
  { id: "SH.MED.PHYS.ZS", key: "physiciansPerThousand" }, // Médicos por 1000 habitantes
  { id: "SH.DYN.MORT", key: "mortalityRate" }, // Taxa de mortalidade (geral)

  { id: "SP.DYN.CBRT.IN", key: "birthRate" }, // Taxa de natalidade (por mil)
  { id: "SP.POP.GROW", key: "populationGrowthRate" }, // Taxa de crescimento populacional
  { id: "SP.URB.TOTL.IN.ZS", key: "urbanPopulationPercent" }, // % da população em áreas urbanas
  { id: "SP.URB.TOTL", key: "urbanPopulation" }, // População urbana absoluta
  { id: "SP.RUR.TOTL.ZS", key: "ruralPopulationPercent" }, // % da população em áreas rurais

  { id: "NY.GDP.MKTP.CD", key: "gdp" }, // PIB (US$ atual)
  { id: "NY.GDP.PCAP.CD", key: "gdpPerCapita" }, // PIB per capita (US$ atual)
  { id: "FP.CPI.TOTL.ZG", key: "inflationRate" }, // Taxa de inflação (preços ao consumidor)
  { id: "GC.DOD.TOTL.GD.ZS", key: "governmentDebtPercentGDP" }, // Dívida pública (% do PIB)
  { id: "NE.EXP.GNFS.ZS", key: "exportsPercentGDP" }, // Exportações (% do PIB)
  { id: "NE.IMP.GNFS.ZS", key: "importsPercentGDP" }, // Importações (% do PIB)
  { id: "SL.UEM.TOTL.ZS", key: "unemploymentRate" }, // Taxa de desemprego (% da força de trabalho)

  { id: "SI.POV.GINI", key: "giniIndex" }, // Índice de Gini (desigualdade)
  { id: "VC.IHR.PSRC.P5", key: "homicideRate" }, // Taxa de homicídios (por 100 mil)

  { id: "EN.ATM.CO2E.PC", key: "co2EmissionsPerCapita" }, // Emissões de CO₂ per capita (toneladas)
  { id: "AG.LND.AGRI.ZS", key: "agriculturalLandPercent" }, // Uso de terra agrícola (% do total)
  { id: "AG.LND.FRST.ZS", key: "forestAreaPercent" }, // Área florestal (% do território)
];

const BASE_URL = "https://api.worldbank.org/v2/country/all/indicator/";

/*
https://api.worldbank.org/v2/country/all/indicator/SE.ADT.1524.LT.ZS?format=json&date=2022&per_page=10000
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
  return metricsMap;
}
