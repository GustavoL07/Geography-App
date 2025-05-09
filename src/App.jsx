import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.jsx";
import MainContent from "./components/MainContent/MainContent/MainContent.jsx";
import getData from "./utils/getData.js";
import { useEffect, useState } from "react";

export default function App() {
  const [countryList, setCountryList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [searchValue, setSearchValue] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  useEffect(()=>{
    const filtered = countryList.filter((country)=>{
      return country.name.informal.toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilteredCountries(filtered);

  }, [searchValue, countryList]);

  
  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        countryList={filteredCountries}
        setSelectedCountry={setSelectedCountry}

        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <MainContent selectedCountry={selectedCountry} isSidebarOpen={isSidebarOpen} />
    </>
  );
}
