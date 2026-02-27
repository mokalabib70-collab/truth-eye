import { useState } from "react";
import "./Adminlayout.css";
import logoImg from "./Logo (2).png";

export default function AdminLayout({ children, activePage, onNavigate, onLogout }) {
  const [academicOpen, setAcademicOpen] = useState(true);

  const subItems = ["Universities", "Faculties", "Admins", "AI Settings"];

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <p className="admin-sidebar__title">Super Admin Panel</p>
          <p className="admin-sidebar__sub">System Management</p>
        </div>
        <div className="admin-sidebar__divider" />

        <nav className="admin-sidebar__nav">
          {/* Dashboard */}
          <button
            className={`admin-nav-item ${activePage === "Dashboard" ? "admin-nav-item--active" : ""}`}
            onClick={() => onNavigate("Dashboard")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Dashboard</span>
            <svg className="admin-nav-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Academic dropdown */}
          <button
            className={`admin-nav-item ${subItems.includes(activePage) ? "admin-nav-item--active" : ""}`}
            onClick={() => setAcademicOpen(!academicOpen)}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="9 18 15 12 9 6"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>Academic</span>
            <svg className="admin-nav-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {academicOpen ? <polyline points="6 9 12 15 18 9"/> : <polyline points="9 18 15 12 9 6"/>}
            </svg>
          </button>

          {academicOpen && (
            <div className="admin-nav-sub">
              {subItems.map((item) => (
                <button
                  key={item}
                  className={`admin-nav-sub__item ${activePage === item ? "admin-nav-sub__item--active" : ""}`}
                  onClick={() => onNavigate(item)}
                >
                  <span>{item}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          )}

          {/* Chat */}
          <button
            className={`admin-nav-item ${activePage === "Chat" ? "admin-nav-item--active" : ""}`}
            onClick={() => onNavigate("Chat")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Chat</span>
            <svg className="admin-nav-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Logs */}
          <button
            className={`admin-nav-item ${activePage === "Logs" ? "admin-nav-item--active" : ""}`}
            onClick={() => onNavigate("Logs")}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span>Logs</span>
            <svg className="admin-nav-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </nav>
      </aside>

      {/* ── Main ── */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <img src={logoImg} alt="TruthEye" className="admin-topbar__logo" />
        </header>

        {/* Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}