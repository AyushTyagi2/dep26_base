import { Card } from "./ui/card";
import {
  GraduationCap,
  BookOpen,
  Users,
  UserCircle,
  TrendingUp,
  Calendar,
} from "lucide-react";

const stats = [
  {
    label: "Total Programs",
    value: "12",
    icon: GraduationCap,
    color: "bg-blue-500",
    trend: "+2 this year",
  },
  {
    label: "Active Courses",
    value: "156",
    icon: BookOpen,
    color: "bg-green-500",
    trend: "+18 this semester",
  },
  {
    label: "Enrolled Students",
    value: "3,847",
    icon: Users,
    color: "bg-purple-500",
    trend: "+342 this year",
  },
  {
    label: "Instructors",
    value: "89",
    icon: UserCircle,
    color: "bg-orange-500",
    trend: "+7 this year",
  },
];

const recentActivity = [
  {
    action: "New course offering",
    detail: "Data Structures and Algorithms - Spring 2026",
    time: "2 hours ago",
  },
  {
    action: "Student enrollment",
    detail: "45 students enrolled in Machine Learning",
    time: "5 hours ago",
  },
  {
    action: "Attendance updated",
    detail: "Database Systems - Lecture 12",
    time: "1 day ago",
  },
  {
    action: "New instructor added",
    detail: "Dr. Sarah Johnson - Computer Science",
    time: "2 days ago",
  },
];

const upcomingEvents = [
  {
    title: "Spring Semester Begins",
    date: "January 20, 2026",
    type: "Academic",
  },
  {
    title: "Course Registration Deadline",
    date: "January 15, 2026",
    type: "Important",
  },
  {
    title: "Mid-term Examinations",
    date: "March 10-20, 2026",
    type: "Exam",
  },
];

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">
          Welcome to AcadStack. Here's a summary of your academic information.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-lg transition-shadow border border-slate-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="size-3" />
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="size-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="size-2 bg-[#5D9E9C] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800">{activity.action}</p>
                  <p className="text-sm text-slate-600 truncate">{activity.detail}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="size-5 text-[#5D9E9C]" />
            <h2 className="text-xl font-semibold text-slate-800">Upcoming Events</h2>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#5D9E9C] transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-slate-800 text-sm">{event.title}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      event.type === "Important"
                        ? "bg-red-100 text-red-700"
                        : event.type === "Exam"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{event.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow text-left">
            <BookOpen className="size-6 text-blue-600 mb-2" />
            <p className="font-medium text-slate-800">Add New Course</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow text-left">
            <Users className="size-6 text-green-600 mb-2" />
            <p className="font-medium text-slate-800">Register Student</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-shadow text-left">
            <UserCircle className="size-6 text-purple-600 mb-2" />
            <p className="font-medium text-slate-800">Add Instructor</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-md transition-shadow text-left">
            <Calendar className="size-6 text-orange-600 mb-2" />
            <p className="font-medium text-slate-800">Schedule Class</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
