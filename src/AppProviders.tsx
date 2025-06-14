import { ReactNode } from "react";
import { SettingsProvider } from "./components/Contexts/SettingsContext";
import { useCountryContext } from "./components/Contexts/CountryContext";
import { CountryProvider } from "./components/Contexts/CountryContext";

function SettingsWrapper({ children }: { children: ReactNode }) {
  const { countryList } = useCountryContext();
  if (!countryList || countryList.length === 0) return null;

  return <SettingsProvider list={countryList}>{children}</SettingsProvider>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CountryProvider>
      <SettingsWrapper>{children}</SettingsWrapper>
    </CountryProvider>
  );
}
