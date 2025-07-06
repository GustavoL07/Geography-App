import { createContext, useContext, useEffect, useState } from "react";
import useSearchFilter from "@/components/Hooks/useSearchFilter";
import useLocalStorage from "@/components/Hooks/useLocalStorage";
import { MapTileKey, SortKey, FilterKey, DisplayKey, CountryList, SortMode } from "@/types";

type ContextType = {
  mapTile: MapTileKey;
  setMapTile: (newTile: MapTileKey) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortValue: SortKey;
  setSortValue: (value: SortKey) => void;
  sortMode: SortMode;
  setSortMode: (value: SortMode) => void;
  filterValue: FilterKey;
  setFilterValue: (filters: FilterKey) => void;
  filteredList: CountryList;
  displayMode: DisplayKey;
  setDisplayMode: (newMode: DisplayKey) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  cityImageVisibility: boolean;
  toggleCityVisibility: () => void;
};
const SettingsContext = createContext<ContextType | null>(null);

type Props = {
  list: CountryList;
  children: any;
};
export function SettingsProvider({ list, children }: Props) {
  const [mapTile, setMapTile] = useLocalStorage<MapTileKey>("mapTile", "light");
  const [sortMode, setSortMode] = useState<SortMode>("asc");
  const [sortValue, setSortValue] = useState<SortKey>("name");
  const [filterValue, setFilterValue] = useState<FilterKey>("UNMember");
  const [cityImageVisibility, setCityImageVisibility] = useLocalStorage<boolean>(
    "cityImage",
    false
  );
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function toggleCityVisibility() {
    setCityImageVisibility((prev) => !prev);
  }

  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayKey>("intro");
  const filteredList = useSearchFilter(list, searchValue, sortValue, sortMode, filterValue);

  const value = {
    mapTile,
    setMapTile,
    searchValue,
    setSearchValue,
    sortValue,
    setSortValue,
    sortMode,
    setSortMode,
    filterValue,
    setFilterValue,
    filteredList,
    displayMode,
    setDisplayMode,
    theme,
    toggleTheme,
    cityImageVisibility,
    toggleCityVisibility,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("Context Error");
  return context;
}
