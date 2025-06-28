import { DisplayKey, FilterKey, MapTileKey, SortKey, SortMode } from "./keys";
import { Country, CountryList, SelectedCountry } from "./country";

export interface CountryContextInterface {
  countryList: CountryList;
  setCountryList: (list: CountryList) => void;

  selectedCountry: SelectedCountry;
  setSelectedCountry: (country: SelectedCountry) => void;

  favoriteList: CountryList;
  setFavoriteCountry: (country: Country) => void;
}

export interface SettingsContextInterface {
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
}
