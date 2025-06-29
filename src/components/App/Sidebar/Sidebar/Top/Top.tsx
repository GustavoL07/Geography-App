import "./Top.css";
import { useSettingsContext } from "@/components/Contexts/SettingsContext";
import Button from "@/components/Custom/Button/Button";
import Search from "@/components/Custom/Search/Search";
import Menu from "@/components/Custom/Menu/Menu";
import Sort from "@/components/Custom/Menu/Sort/Sort";
import { SortOptions } from "@/utils/Organizing/sorter";
import Filter from "@/components/Custom/Menu/Filter/Filter";
import { FilterOptions } from "@/utils/Organizing/filter";

type Props = {
  isOpen: boolean;
  toggleIsOpen: () => void;
};
export default function Top({ isOpen, toggleIsOpen }: Props) {
  const { filterValue, sortValue, searchValue, setSearchValue } = useSettingsContext();

  const sortMenuText = SortOptions.find((opt) => opt.key === sortValue)?.text || "Sort...";
  const filterMenuText = FilterOptions.find((opt) => opt.key === filterValue)?.text || "Filter...";

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
            <Menu icon={<i className="fas fa-sort"></i>} text={sortMenuText}>
              {(closeMenu) => <Sort onClose={closeMenu} />}
            </Menu >

            <Menu icon={<i className="fa-solid fa-filter"></i>} text={filterMenuText}>
              {(closeMenu) => <Filter onClose={closeMenu} />}
            </Menu>
            
          </div>
          
        </>
      ) : (
        <>
          <i className="fas fa-search search-icon"></i>
          <i className="fas fa-sort"></i>
          <i className="fa-solid fa-filter"></i>
        </>
      )}
    </div>
  );
}
