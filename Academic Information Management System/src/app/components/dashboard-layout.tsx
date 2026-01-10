import { ReactNode, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  UserCircle,
  ClipboardList,
  CheckSquare,
  BarChart3,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Button } from "./ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "programs", label: "Programs", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "instructors", label: "Instructors", icon: UserCircle },
  { id: "enrollments", label: "Enrollments", icon: ClipboardList },
  { id: "attendance", label: "Attendance", icon: CheckSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export function DashboardLayout({
  children,
  currentPage,
  onNavigate,
  onLogout,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-[#5D9E9C] p-2 rounded-lg">
                <GraduationCap className="size-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-800">AcadStack</h1>
                <p className="text-xs text-slate-500">Academic Management System</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-slate-600 hover:text-red-600"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200
            transform transition-transform duration-200 ease-in-out lg:transform-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <nav className="p-4 space-y-1 mt-16 lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-[#5D9E9C] text-white shadow-md"
                        : "text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon className="size-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
