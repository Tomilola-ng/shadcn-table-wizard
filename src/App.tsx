// Package Imports
import { Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
// Page Imports
import HomePage from "./pages/Home";
// Component Imports
import RouteSaver from "./components/reusable/LastRoute";
// CSS Imports
import "./App.css";
import { TableCreatorWizard } from "./pages/wizard";

function App() {
  const lastRoute = localStorage.getItem("lastRoute");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouteSaver>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wizard" element={<TableCreatorWizard />} />
          {lastRoute ? (
            <Route path="*" element={<Navigate to={lastRoute} replace />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
        </Routes>
      </RouteSaver>
    </Suspense>
  );
}

export default App;
