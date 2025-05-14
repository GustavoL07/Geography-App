import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar.jsx";
import Main from "./components/MainContent/MainArea/Main.jsx";
import { CountryProvider } from "./components/Contexts/CountryContext.jsx";
import { useState } from "react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <CountryProvider>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Main isSidebarOpen={isSidebarOpen} />
      </CountryProvider>
    </>
  );
}
