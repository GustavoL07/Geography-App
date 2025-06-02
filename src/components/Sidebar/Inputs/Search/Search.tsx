import "./Search.css";
import { useCountryContext } from "../../../Contexts/CountryContext";
import Button from "../../../CustomButton/Button";

interface Props {
  isOpen: boolean;
}
export default function Search({ isOpen }: Props) {
  const { searchValue, setSearchValue } = useCountryContext();
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
