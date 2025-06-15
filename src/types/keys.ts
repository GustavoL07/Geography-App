import { SortOptions } from "@/utils/Organizing/sorter";
import { FormatOptions } from "@/utils/Organizing/formatter";

export type FormatKey = (typeof FormatOptions)[number]["key"];
export type SortKey = (typeof SortOptions)[number]["key"] | "none";
export type MapTileKey = "light" | "dark" | "earth";
export type DisplayKey = "intro" | "full" | "worldMap" | "compare";
export type FilterKey = "continent" | "name" | "iso3" | "capital";
export type SortMode = "asc" | "desc";
