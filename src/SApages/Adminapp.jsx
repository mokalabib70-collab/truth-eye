import { useState } from "react";
import Adminlayout from "./Adminlayout";
import UniversitiesPage from "./UniversitiesPage";
import FacultiesPage from "./FacultiesPage";
import AdminsPage from "./AdminsPage";
import AiSettingsPage from "./AiSettingsPage";
import "./Adminapp.css";

export default function AdminApp({ onNavigate }) {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Universities": return <UniversitiesPage />;
       case "Faculties":    return <FacultiesPage />;
       case "Admins":       return <AdminsPage />;
        case "AI Settings":  return <AiSettingsPage />;
      case "Dashboard":
      default:
        return (
          <div className="admin-page-wrap">
            <h1 className="admin-page-title">Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <Adminlayout activePage={activePage} onNavigate={setActivePage} onLogout={() => onNavigate && onNavigate("Login")}>
      {renderPage()}
    </Adminlayout>
  );
}