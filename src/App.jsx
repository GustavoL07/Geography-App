import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import getData from "./utils/countries.js";
import { useEffect, useState } from "react";

export default function App() {
  const [countryList, setCountryList] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setCountryList(data);
    }

    fetchData();
  }, []);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        countryList={countryList}
        setSelectedCountry={setSelectedCountry}
      />
      <MainContent isSidebarOpen={isSidebarOpen} />
    </>
  );
}
