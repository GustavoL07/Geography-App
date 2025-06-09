import { createContext, useContext, useState } from "react";
import useSearchFilter from "@/components/Hooks/useSearchFilter";
import useLocalStorage from "@/components/Hooks/useLocalStorage";
import {
  Country,
  SettingsContextInterface,
  MapTileKey,
  SortKey,
  FilterKey,
  DisplayKey,
} from "@/types";

const SettingsContext = createContext<SettingsContextInterface>({
  mapTile: "light",
  setMapTile: () => {},

  searchValue: "",
  setSearchValue: () => {},

  sortValue: "none",
  setSortValue: () => {},

  filterBy: ["name"],
  setFilterBy: () => {},

  filteredList: [],

  displayMode: "intro",
  setDisplayMode: () => {},
});

type Props = {
  countryList: Country[];
  children: any;
};
export function SettingsProvider({ countryList, children }: Props) {
  const [mapTile, setMapTile] = useLocalStorage<MapTileKey>("mapTile", "light");
  const [sortValue, setSortValue] = useLocalStorage<SortKey>("sortValue", "none");
  const [filterBy, setFilterBy] = useLocalStorage<FilterKey[]>("filterBy", ["name"]);

  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayKey>("intro");

  const filteredList = useSearchFilter(countryList, searchValue, sortValue, filterBy);

  return (
    <SettingsContext.Provider
      value={{
        mapTile,
        setMapTile,

        searchValue,
        setSearchValue,

        sortValue,
        setSortValue,

        filterBy,
        setFilterBy,
        filteredList,

        displayMode,
        setDisplayMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingsContext);
}
