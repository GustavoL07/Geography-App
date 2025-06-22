import "./Top.css";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "@/components/Custom/Button/Button";
import Search from "@/components/Custom/Search/Search";
import Menu from "@/components/Custom/Menu/Menu";
import Sort from "@/components/Custom/Menu/Sort/Sort";
import { SortOptions } from "@/utils/Organizing/sorter";

type Props = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};
export default function Top({ isOpen, toggleIsOpen }: Props) {
  const { sortValue, searchValue, setSearchValue } = useSettingsContext();

  const menuText = SortOptions.find((opt) => opt.key === sortValue)?.text || "Sort...";

  return (
    <div className={`top ${isOpen ? "" : "closed"}`}>
      <div className={`top-btn ${isOpen ? "" : "closed"}`}>
        <Button icon={<i className="fa-solid fa-bars"></i>} onClick={toggleIsOpen} />
      </div>
      {isOpen ? (
        <>
          <div className="top-element">
            <Search
              value={searchValue}
              onSearch={setSearchValue}
              resetSearch={() => setSearchValue("")}
            />
          </div>
          <div className="top-element">
            <Menu icon={<i className="fas fa-sort"></i>} text={menuText}>
              {(closeMenu) => <Sort onClose={closeMenu} />}
            </Menu>
          </div>
        </>
      ) : (
        <>
          <i className="fas fa-search search-icon"></i>
          <i className="fas fa-sort"></i>
        </>
      )}
    </div>
  );
}
