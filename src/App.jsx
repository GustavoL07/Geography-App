import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.jsx";
import MainContent from "./components/MainContent/MainContent/MainContent.jsx";
import getData from "./utils/getData.js";
import Country from "./utils/Country.js";
import { useEffect, useState } from "react";

export default function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [sortValue, setSortValue] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = countryList.filter((country) => {
      return country.name.informal.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (sortValue) {
      filtered = Country.sortCountries(filtered, sortValue);
    }

    setFilteredCountries(filtered);
  }, [searchValue, sortValue, countryList]);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        countryList={filteredCountries}
        setSelectedCountry={setSelectedCountry}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <MainContent selectedCountry={selectedCountry} isSidebarOpen={isSidebarOpen} />
    </>
  );
}
