// src/App.tsx
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar/Sidebar";
import Main from "./components/MainContent/MainArea/Main";
import AppProviders from "./AppProviders";
import { useState } from "react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AppProviders>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Main isSidebarOpen={isSidebarOpen} />
    </AppProviders>
  );
}
