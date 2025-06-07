import Country from "../../utils/Country/Country";
import { createContext, useContext, useState } from "react";
import { SortKeys } from "../../utils/Organizing/sorter";
import useSearchFilter from "../Hooks/useSearchFilter";

type MapTileKey = "light" | "dark" | "earth";
type DisplayKey = "intro" | "full" | "worldMap";
export type FilterKey = "continent" | "name" | "iso3" | "capital";

export type SettingsContext = {
  mapTile: MapTileKey;
  setMapTile: (newTile: MapTileKey) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  sortValue: SortKeys;
  setSortValue: (value: SortKeys) => void;

  filterBy: Array<FilterKey>;
  setFilterBy: (filters: FilterKey[]) => void;

  filteredList: Array<Country>;

  displayMode: DisplayKey;
  setDisplayMode: (newMode: DisplayKey) => void;
};

const SettingsContext = createContext<SettingsContext>({
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
  const [sortValue, setSortValue] = useState<SortKeys>("");
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
