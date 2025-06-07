import { createContext, useContext, useState } from "react";
import useSearchFilter from "../Hooks/useSearchFilter";
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

  sortValue: "",
  setSortValue: () => {},

  filterBy: [],
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
  const [mapTile, setMapTile] = useState<MapTileKey>("light");
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<SortKey>("");
  const [filterBy, setFilterBy] = useState<FilterKey[]>(["name"]);
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
