import "./Search.css";
import Button from "@/components/Custom/Button/Button";

interface Props {
  value: string;
  onSearch: (value: string) => void;
  resetSearch: () => void;
}
export default function Search({ value, onSearch, resetSearch }: Props) {
  return (
    <div className="search-wrapper">
      <i className="fas fa-search search-icon"></i>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Button icon={<i className="fa-solid fa-xmark close-icon"></i>} onClick={resetSearch} />
    </div>
  );
}
