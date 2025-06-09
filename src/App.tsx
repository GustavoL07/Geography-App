import "./App.css";
import AppProviders from "./AppProviders";
import Sidebar from "./components/App/Sidebar/Sidebar";
import Main from "./components/App/Main/Main";
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
