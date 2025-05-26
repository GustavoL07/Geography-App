import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.js";
import Main from "./components/MainContent/MainArea/Main.js";
import { CountryProvider } from "./components/Contexts/CountryContext.js";
import { useState } from "react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <CountryProvider>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Main isSidebarOpen={isSidebarOpen} />
      </CountryProvider>
    </>
  );
}
