import "./Sort.css";
import { useState, useEffect, useRef } from "react";
import { SORTER, SortKeys } from "../../../../utils/Organizing/sorter.js";
import Button from "../../../CustomButton/Button";
import { useSettingsContext } from "../../../Contexts/SettingsContext";

const icons = {
  AZ: <i className="fa-solid fa-arrow-down-short-wide"></i>,
  ZA: <i className="fa-solid fa-arrow-down-wide-short"></i>,
};

interface Props {
  isOpen: boolean;
}
export default function Sort({ isOpen }: Props) {
  const { setSortValue } = useSettingsContext();

  const [openSort, setOpenSort] = useState(false);
  const [sortText, setSortText] = useState("Sort...");
  const [selectedSortOption, setSelectedSortOption] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSort(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOptionClicks(
    sortValue: SortKeys,
    sortText: string,
    selectedSortOption: number | null
  ) {
    setSortValue(sortValue);
    setOpenSort(false);
    setSortText(sortText);
    setSelectedSortOption(selectedSortOption);
  }

  return (
    <div
      ref={wrapperRef}
      className={`select-wrapper ${isOpen ? "" : "closed"} ${openSort ? "options-open" : ""}`}
    >
      <div
        className="select-container"
        onClick={() => {
          if (isOpen) setOpenSort(!openSort);
        }}
      >
        <i className="fa-solid fa-sort sort-icon"></i>
        <p>{sortText}</p>
      </div>
      {isOpen && (
        <Button
          icon={<i className="fa-solid fa-xmark close-icon"></i>}
          onClick={() => {
            handleOptionClicks("", "Sort...", null);
          }}
        />
      )}

      <div className="sort-wrapper">
        {openSort && isOpen && (
          <div className="sort-container">
            <div
              className="indicators"
              onClick={() => {
                handleOptionClicks("", "Sort...", null);
              }}
            >
              <div className="symbols">{icons["AZ"]}</div>
              <div className="symbols">{icons["ZA"]}</div>
            </div>
            <div className="sort-modes">
              {SORTER.map((obj, index) => (
                <div
                  key={index}
                  className={`sort-option ${index === selectedSortOption ? "active" : ""}`}
                  onClick={() => handleOptionClicks(obj.key, obj.text, index)}
                >
                  {obj.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
