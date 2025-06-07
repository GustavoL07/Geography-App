type MetricsGroup = [number, number] | undefined;

export interface CountryIndicators {
  technology: {
    internetUsage: MetricsGroup;
    electricityAccess: MetricsGroup;
    basicWaterService: MetricsGroup;
    basicSanitationService: MetricsGroup;
  };

  population: {
    birthRate: MetricsGroup;
    growthRate: MetricsGroup;
    urbanPercent: MetricsGroup;
    ruralPercent: MetricsGroup;
    malePercent: MetricsGroup;
    femalePercent: MetricsGroup;
    elderlyPercent: MetricsGroup;
    infantMortality: MetricsGroup;
    lifeExpectancy: MetricsGroup;
    literacyRate: MetricsGroup;
    homicideRate: MetricsGroup;
  };

  economy: {
    gdp: MetricsGroup;
    gdpPerCapita: MetricsGroup;
    inflationRate: MetricsGroup;
    exports: MetricsGroup;
    imports: MetricsGroup;
    workingAgePopulation: MetricsGroup;
    totalLaborForce: MetricsGroup;
    unemploymentRate: MetricsGroup;
    giniIndex: MetricsGroup;
    HDI: MetricsGroup;
  };

  environment: {
    agriculturalLandPercent: MetricsGroup;
    forestAreaPercent: MetricsGroup;
  };
}
