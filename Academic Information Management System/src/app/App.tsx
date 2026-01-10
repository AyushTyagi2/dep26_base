import { useState } from "react";
import { Login } from "./components/login";
import { DashboardLayout } from "./components/dashboard-layout";
import { Overview } from "./components/overview";
import { Programs } from "./components/programs";
import { Courses } from "./components/courses";
import { Students } from "./components/students";
import { Instructors } from "./components/instructors";
import { Enrollments } from "./components/enrollments";
import { Attendance } from "./components/attendance";
import { Analytics } from "./components/analytics";

type Page =
  | "overview"
  | "programs"
  | "courses"
  | "students"
  | "instructors"
  | "enrollments"
  | "attendance"
  | "analytics";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("overview");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("overview");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "programs":
        return <Programs />;
      case "courses":
        return <Courses />;
      case "students":
        return <Students />;
      case "instructors":
        return <Instructors />;
      case "enrollments":
        return <Enrollments />;
      case "attendance":
        return <Attendance />;
      case "analytics":
        return <Analytics />;
      default:
        return <Overview />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
