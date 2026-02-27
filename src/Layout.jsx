import Sidebar from "./Pages/Sidebar";
import Topbar from "./Pages/Topbar";
import "./Layout.css";

export default function Layout({ children, activePage, onNavigate }) {
  const isChat = activePage === "Chat";
  return (
    <div className="layout">
      <Topbar/>
      <div className="layout__body">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
        <main className={isChat ? "layout__content--chat" : "layout__content"}>
          {children}
        </main>
      </div>
    </div>
  );
}