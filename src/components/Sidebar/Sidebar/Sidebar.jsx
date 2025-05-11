import "./Sidebar.css";
import Card from "../Card/Card.jsx";
import ToggleButton from "../ToggleButton/ToggleButton.jsx";
import Search from "../Search/Search.jsx";
import Sort from "../Sort/Sort.jsx";

export default function Sidebar({
  isOpen,
  toggleSidebar,
  countryList,
  setSelectedCountry,
  searchValue,
  setSearchValue,
  sortValue,
  setSortValue
}) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="sidebar-top">
        <ToggleButton toggleSidebar={toggleSidebar} />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} isOpen={isOpen} />
        <Sort isOpen={isOpen} sortValue={sortValue} setSortValueOnChange={setSortValue}/>
      </div>

      {countryList ? (
          <ul>
            {countryList.map((country, index) => {
              return (
                <li key={index}>
                  <Card
                    isOpen={isOpen}
                    country={country}
                    description={sortValue}
                    setSelectedCountry={setSelectedCountry}
                  />
                </li>
              );
            })}
          </ul>
      ) : (
        <p>Loading...</p>
      )}
    </aside>
  );
}
