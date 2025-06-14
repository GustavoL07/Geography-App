import "./Sort.css";
import { useState, useEffect, useRef } from "react";
import { SortOptions } from "@/utils/Organizing/sorter";
import { SortKey } from "@/types";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "@/components/Custom/CustomButton/Button";

const icons = {
  AZ: <i className="fa-solid fa-arrow-down-short-wide"></i>,
  ZA: <i className="fa-solid fa-arrow-down-wide-short"></i>,
  close: <i className="fa-solid fa-xmark close-icon"></i>,
};

interface Props {
  isOpen: boolean;
}
export default function Sort({ isOpen }: Props) {
  const { setSortValue, setSortMode } = useSettingsContext();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [openSort, setOpenSort] = useState(false);
  const [sortText, setSortText] = useState("Sort...");
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

  return (
    <div
      ref={wrapperRef}
      className={`select-wrapper ${isOpen ? "" : "closed"} ${openSort ? "options-open" : ""}`}
    >
      <div className="select-container" onClick={() => (isOpen ? setOpenSort(!openSort) : null)}>
        <i className="fa-solid fa-sort sort-icon"></i>
        <p>{sortText}</p>
      </div>

      {isOpen && (
        <>
          <Button
            icon={icons.close}
            onClick={() => {
              setSortValue("none");
              setSortText("Sort...");
              setSortMode("asc");
            }}
          />
          {openSort && (
            <SortMenu
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setSortText={setSortText}
              close={() => setOpenSort(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

type MenuProps = {
  close: () => void;
  selectedOption: number | null;
  setSelectedOption: (value: number | null) => void;
  setSortText: (value: string) => void;
};
function SortMenu({ close, selectedOption, setSelectedOption, setSortText }: MenuProps) {
  const { sortMode, setSortMode, setSortValue } = useSettingsContext();

  const changeSort = () => (sortMode === "asc" ? setSortMode("desc") : setSortMode("asc"));
  const handleClick = (key: SortKey, text: string, i: number) => {
    setSortValue(key);
    setSelectedOption(i);
    setSortText(text);
    close();
  };

  return (
    <div className="sort-wrapper">
      <div className="sort-container">
        <div className="sort-method" onClick={changeSort}>
          <Button icon={sortMode === "asc" ? icons.AZ : icons.ZA} onClick={changeSort} />
        </div>

        {SortOptions.map((option, index) => {
          return (
            <div
              className={`sort-option ${selectedOption === index ? "active" : ""}`}
              key={index}
              onClick={() => handleClick(option.key, option.text, index)}
            >
              {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
