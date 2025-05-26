import { useCountryContext } from "../../../Contexts/CountryContext";
import "./Search.css";

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
    </div>
  );
}
