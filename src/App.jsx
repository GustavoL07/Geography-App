import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.jsx";
import MainContent from "./components/MainContent/MainContent/MainContent.jsx";
import getData from "./utils/getData.js";
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "+") {
        console.log("Selected Country: ", selectedCountry);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCountry]);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        countryList={countryList}
        setSelectedCountry={setSelectedCountry}
      />
      <MainContent selectedCountry={selectedCountry} isSidebarOpen={isSidebarOpen} />
    </>
  );
}
