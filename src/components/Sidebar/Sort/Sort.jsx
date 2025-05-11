import "./Sort.css";
import { useState, useEffect, useRef } from "react";
import Country from "../../../utils/Country.js";

const icons = {
  AZ: <i class="fa-solid fa-arrow-down-short-wide"></i>,
  ZA: <i class="fa-solid fa-arrow-down-wide-short"></i>,
};

export default function Sort({ isOpen, sortValue, setSortValueOnChange }) {
  const [openSort, setOpenSort] = useState(false);
  const [sortText, setSortText] = useState("Sort...");
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

  const handleOptionClicks = (sortValue, sortText) => {
    setSortValueOnChange(sortValue);
    setOpenSort(false);
    setSortText(sortText);
  };

  return (
    <div
      ref={wrapperRef}
      className={`select-wrapper ${isOpen ? "" : "closed"} ${openSort ? "options-open" : ""}`}
    >
      <div
        className="select-container"
        onClick={() => {
          if (isOpen) {
            setOpenSort(!openSort);
          }
        }}
      >
        <i className="fa-solid fa-sort sort-icon"></i>
        <p>{sortText}</p>
      </div>

      <div className="sort-wrapper">
        {openSort && isOpen && (
          <div className="sort-container">
            <div className="symbols" onClick={() => handleOptionClicks(null, "Sort...")}>
              {icons["AZ"]}
            </div>
            <div className="symbols" onClick={() => handleOptionClicks(null, "Sort...")}>
              {icons["ZA"]}
            </div>

            {Country.SORT_OPTIONS.map((opt) => (
              <div
                key={opt.key}
                className={`sort-option ${sortValue === opt.key ? "active" : ""}`}
                onClick={() => handleOptionClicks(opt.key, opt.key)}
              >
                {opt.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
