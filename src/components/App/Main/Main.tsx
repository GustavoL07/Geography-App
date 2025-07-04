import "./Main.css";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Country } from "@/types";
import ROUTES from "@/routes";
import Header from "./Header/Header";
import Intro from "./Intro/Intro";
import FullCountry from "./FullCountry/FullCountry";
import CompareCountry from "./CompareCountry/CompareCountry";
import WorldMap from "./WorldMap/WorldMap";
import Favorite from "./Favorite/Favorite";

interface Props {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}
export default function Main({ isSidebarOpen, closeSidebar }: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string | undefined>(undefined);

  const handleMapClick = useCallback((c: Country) => {
    navigate(ROUTES.COUNTRY(c.name.symbol));
  }, []);

  return (
    <main className={`main-content ${!isSidebarOpen ? "closed" : ""}`}>
      <Header title={title} closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="display-area">
        <Routes>
          <Route path={ROUTES.HOME} element={<Intro />} />
          <Route path={ROUTES.COUNTRY()} element={<FullCountry />} />
          <Route path={ROUTES.COMPARE} element={<CompareCountry />} />
          <Route path={ROUTES.WORLDMAP} element={<WorldMap onPopupClick={handleMapClick} />} />
          <Route path={ROUTES.FAVORITES} element={<Favorite />} />
        </Routes>
      </div>
    </main>
  );
}
