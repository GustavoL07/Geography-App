import { SortOptions } from "@/utils/Organizing/sorter";
import { SortKey } from "@/types";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "@/components/Custom/CustomButton/Button";

type Props = {
  close: () => void;
  selectedOption: number | null;
  setSelectedOption: (value: number | null) => void;
  setSortText: (value: string) => void;
};
export default function SortMenu({ close, selectedOption, setSelectedOption, setSortText }: Props) {
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
          <Button
            icon={
              sortMode === "asc" ? (
                <i className="fa-solid fa-arrow-down-short-wide"></i>
              ) : (
                <i className="fa-solid fa-arrow-down-wide-short"></i>
              )
            }
            onClick={changeSort}
          />
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
