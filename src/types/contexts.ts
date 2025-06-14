import { DisplayKey, FilterKey, MapTileKey, SortKey, SortMode } from "./keys";
import { CountryList, SelectedCountry } from "./country";

export interface CountryContextInterface {
  countryList: CountryList;
  selectedCountry: SelectedCountry;
  setSelectedCountry: (country: SelectedCountry) => void;
}
export interface SettingsContextInterface {
  mapTile: MapTileKey;
  setMapTile: (newTile: MapTileKey) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  sortValue: SortKey;
  setSortValue: (value: SortKey) => void;
  sortMode: SortMode;
  setSortMode: (value: SortMode) => void

  filterBy: FilterKey[];
  setFilterBy: (filters: FilterKey[]) => void;

  filteredList: CountryList;

  displayMode: DisplayKey;
  setDisplayMode: (newMode: DisplayKey) => void;
}
