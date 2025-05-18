import { createContext, useContext, useState } from "react";
import useMapOptions from "../Hooks/useMapOptions";

const SettingsContext = createContext();

export function SettingsProvider({children}){
  const mapSettings = useMapOptions();
  const [theme, setTheme] = useState(true);
  const [searchModes, setSearchModes] = useState(['name', 'capital', 'continent']);

  return (
    <SettingsContext.Provider
    value={{mapSettings, theme, setTheme}}>
      {children}
    </SettingsContext.Provider>
  )
}

export function UseSettingsContext(){
  return useContext(SettingsContext);
}