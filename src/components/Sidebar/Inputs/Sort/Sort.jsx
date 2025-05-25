import "./Sort.css";
import { useState, useEffect, useRef } from "react";
import { useCountryContext } from "../../../Contexts/CountryContext.jsx";
import { SORTER } from "../../../../utils/Organizing/sorter.js";

const icons = {
  AZ: <i class="fa-solid fa-arrow-down-short-wide"></i>,
  ZA: <i class="fa-solid fa-arrow-down-wide-short"></i>,
};

export default function Sort({ isOpen }) {
  const { setSortValue } = useCountryContext();

  const [openSort, setOpenSort] = useState(false);
  const [sortText, setSortText] = useState("Sort...");
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenSort(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClicks = (sortValue, sortText, selectedSortOption) => {
    setSortValue(sortValue);
    setOpenSort(false);
    setSortText(sortText);
    setSelectedSortOption(selectedSortOption);
  };

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
