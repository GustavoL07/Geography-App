import { createContext, useContext, useState } from "react";
import useSearchFilter from "@/components/Hooks/useSearchFilter";
import useLocalStorage from "@/components/Hooks/useLocalStorage";
import {
  SettingsContextInterface,
  MapTileKey,
  SortKey,
  FilterKey,
  DisplayKey,
  CountryList,
  SortMode,
} from "@/types";

const SettingsContext = createContext<SettingsContextInterface>({
  mapTile: "light",
  setMapTile: () => {},

  searchValue: "",
  setSearchValue: () => {},

  sortValue: "none",
  setSortValue: () => {},
  sortMode: "asc",
  setSortMode: () => {},

  filterValue: "UNMember",
  setFilterValue: () => {},

  filteredList: [],

  displayMode: "intro",
  setDisplayMode: () => {},
});

type Props = {
  list: CountryList;
  children: any;
};
export function SettingsProvider({ list, children }: Props) {
  const [mapTile, setMapTile] = useLocalStorage<MapTileKey>("mapTile", "light");
  const [sortMode, setSortMode] = useState<SortMode>("asc");
  const [sortValue, setSortValue] = useState<SortKey>("name");
  const [filterValue, setFilterValue] = useState<FilterKey>("UNMember");

  const [searchValue, setSearchValue] = useState("");
  const [displayMode, setDisplayMode] = useState<DisplayKey>("intro");

  const filteredList = useSearchFilter(list, searchValue, sortValue, sortMode, filterValue);

  return (
    <SettingsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingsContext);
}
