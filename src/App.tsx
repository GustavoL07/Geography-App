import "./App.css";
import AppProviders from "./AppProviders";
import Sidebar from "./components/App/Sidebar/Sidebar";
import Main from "./components/App/Main/Main";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <BrowserRouter>
      <AppProviders>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Main closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
      </AppProviders>
    </BrowserRouter>
  );
}
