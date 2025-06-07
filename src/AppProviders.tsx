import { ReactNode } from "react";
import { CountryProvider, useCountryContext } from "./components/Contexts/CountryContext";
import { SettingsProvider } from "./components/Contexts/SettingsContext";

function SettingsWrapper({ children }: { children: ReactNode }) {
  const { countryList } = useCountryContext();
  if (!countryList || countryList.length === 0) return null;

  return <SettingsProvider countryList={countryList}>{children}</SettingsProvider>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CountryProvider>
      <SettingsWrapper>{children}</SettingsWrapper>
    </CountryProvider>
  );
}
