import "./Search.css";
import Button from "@/components/Custom/CustomButton/Button";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";

interface Props {
  isOpen: boolean;
}
export default function Search({ isOpen }: Props) {
  const { searchValue, setSearchValue } = useSettingsContext();
  return (
    <div className={`search-wrapper ${!isOpen ? "closed" : ""}`}>
      <i className={`fas fa-search search-icon ${!isOpen ? "closed" : ""}`}></i>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isOpen && (
        <Button
          icon={<i className="fa-solid fa-xmark close-icon"></i>}
          onClick={() => {
            setSearchValue("");
          }}
        />
      )}
    </div>
  );
}
