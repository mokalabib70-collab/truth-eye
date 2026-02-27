import { useState } from "react";
import { LoginPage, ResetPasswordPage, VerifyCodePage, CreatePasswordPage } from "./Pages/Authpages";
import Signup from "./Pages/Signup";
import Layout from "./Layout";
import ExamManagement from "./Pages/ExamManagement";
import DoctorProfile from "./Pages/DoctorProfile";
import ReportsContent from "./Pages/ReportsContent";
import Coursescontent from "./Pages/Coursescontent";
import ChatContent from "./Pages/ChatContent";
import AdminApp from "./SApages/Adminapp";
function App() {
  const [activePage, setActivePage] = useState("Login");

  // 1. عرض صفحات الـ Auth بشكل مستقل (بدون Layout)
  if (activePage === "Signup") return <Signup onNavigate={setActivePage} />;
  if (activePage === "Login") return <LoginPage onNavigate={setActivePage} />;
  if (activePage === "ResetPassword") return <ResetPasswordPage onNavigate={setActivePage} />;
  if (activePage === "VerifyCode") return <VerifyCodePage onNavigate={setActivePage} />;
  if (activePage === "CreatePassword") return <CreatePasswordPage onNavigate={setActivePage} />;

if (activePage === "AdminPanel") return <AdminApp onNavigate={setActivePage} />;
  // 2. وظيفة اختيار الصفحة لعرضها داخل الـ Layout كـ children
  const renderPage = () => {
    switch (activePage) {
      case "Dashboard": return <DoctorProfile onNavigate={setActivePage} />;
      case "Exams":     return <ExamManagement onNavigate={setActivePage} />;
      case "Reports":   return <ReportsContent onNavigate={setActivePage} />;
      case "Courses":   return <Coursescontent onNavigate={setActivePage} />;
      case "Chat":      return <ChatContent onNavigate={setActivePage} />;
      default:          return <DoctorProfile onNavigate={setActivePage} />;
    }
  };

  // 3. هنا نمرر renderPage() بين وسمي البداية والنهاية للـ Layout
  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;