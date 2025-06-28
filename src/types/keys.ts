import { SortOptions } from "@/utils/Organizing/sorter";
import { FormatOptions } from "@/utils/Organizing/formatter";
import { Continent } from "./country";

export type FormatKey = (typeof FormatOptions)[number]["key"];
export type SortKey = (typeof SortOptions)[number]["key"] | "none";
export type MapTileKey = "light" | "dark" | "earth";
export type DisplayKey = "intro" | "full" | "worldMap" | "compare" | "favorite";
export type SortMode = "asc" | "desc";
export type FilterKey =
  | "none"
  | "UNMember"
  | "independent"
  | "notUNMember"
  | "notIndependent"
  | Continent;
