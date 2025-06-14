import "./Sort.css";
import { useState, useEffect, useRef } from "react";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "@/components/Custom/CustomButton/Button";
import SortMenu from "./SortMenu";

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
            icon={<i className="fa-solid fa-xmark close-icon"></i>}
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
