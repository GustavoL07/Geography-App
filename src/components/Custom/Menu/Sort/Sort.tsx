import "./Sort.css";
import { SortKey, SortMode } from "@/types";
import { SortOptions } from "@/utils/Organizing/sorter";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "../../Button/Button";

type Props = {
  onClose: () => void;
};

export default function Sort({ onClose }: Props) {
  const { sortValue, sortMode, setSortMode, setSortValue } = useSettingsContext();

  const toggleSortMode = () => (sortMode === "asc" ? setSortMode("desc") : setSortMode("asc"));
  const configSort = (mode: SortMode, key: SortKey, close: boolean = false) => {
    setSortMode(mode);
    setSortValue(key);
    if (close) onClose();
  };

  const sortModeIcon =
    sortMode === "asc" ? (
      <i className="fa-solid fa-arrow-down-a-z"></i>
    ) : (
      <i className="fa-solid fa-arrow-down-z-a"></i>
    );

  const favoritesIcon = <i className="fa-solid fa-star"></i>;
  const resetIcon = <i className="fa-solid fa-xmark close-icon"></i>;

  return (
    <div className="menu-child-wrapper">
      <div className="btns">
        <Button icon={sortModeIcon} onClick={toggleSortMode} />
        <Button icon={favoritesIcon} onClick={() => configSort("desc", "favorite", true)} />
        <Button icon={resetIcon} onClick={() => configSort("asc", "none", true)} />
      </div>
      <div className="sort-content">
        <ul>
          {SortOptions.filter((opt) => opt.text !== "Favorite").map((opt, index) => (
            <li
              className={`sort-opt ${opt.key === sortValue ? "active" : ""}`}
              key={index}
              onClick={() => configSort(sortMode, opt.key, true)}
            >
              {opt.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
