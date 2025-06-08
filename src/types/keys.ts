import { SORTER } from "@/utils/Organizing/sorter";
import { formatOptions } from "@/utils/Organizing/formatter";

export type FormatKey = (typeof formatOptions)[number]["key"];
export type SortKey = (typeof SORTER)[number]["key"] | "none" ;
export type MapTileKey = "light" | "dark" | "earth";
export type DisplayKey = "intro" | "full" | "worldMap";
export type FilterKey = "continent" | "name" | "iso3" | "capital";
