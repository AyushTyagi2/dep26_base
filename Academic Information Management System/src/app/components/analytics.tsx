import { Card } from "./ui/card";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const enrollmentData = [
  { semester: "Fall 2024", enrollments: 3245 },
  { semester: "Spring 2025", enrollments: 3512 },
  { semester: "Summer 2025", enrollments: 1823 },
  { semester: "Fall 2025", enrollments: 3689 },
  { semester: "Spring 2026", enrollments: 3847 },
];

const programDistribution = [
  { name: "Undergraduate", value: 2341, color: "#3b82f6" },
  { name: "Graduate", value: 1245, color: "#10b981" },
  { name: "Doctoral", value: 261, color: "#8b5cf6" },
];

const attendanceDistribution = [
  { range: "90-100%", count: 2156, color: "#10b981" },
  { range: "80-89%", count: 1234, color: "#3b82f6" },
  { range: "70-79%", count: 342, color: "#f59e0b" },
  { range: "Below 70%", count: 115, color: "#ef4444" },
];

const topCourses = [
  { course: "Machine Learning", enrollments: 145 },
  { course: "Data Structures", enrollments: 132 },
  { course: "Database Systems", enrollments: 128 },
  { course: "Web Development", enrollments: 119 },
  { course: "Cloud Computing", enrollments: 108 },
];

const departmentPerformance = [
  { department: "Computer Science", avgGrade: 3.6, students: 1245 },
  { department: "Electronics", avgGrade: 3.4, students: 856 },
  { department: "Mathematics", avgGrade: 3.2, students: 623 },
  { department: "Physics", avgGrade: 3.5, students: 534 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 p-3 rounded-lg">
          <BarChart3 className="size-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-600">Insights and performance metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Average GPA</p>
              <p className="text-3xl font-bold text-slate-800">3.52</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="size-3" />
                <span>+0.12 from last sem</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Pass Rate</p>
              <p className="text-3xl font-bold text-slate-800">94.2%</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="size-3" />
                <span>+2.1% improvement</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="size-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Avg Attendance</p>
              <p className="text-3xl font-bold text-slate-800">87.3%</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="size-3" />
                <span>+3.2% increase</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BookOpen className="size-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">At-Risk Students</p>
              <p className="text-3xl font-bold text-slate-800">115</p>
              <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                <AlertTriangle className="size-3" />
                <span>Needs attention</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <Card className="p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Enrollment Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="semester"
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Program Distribution */}
        <Card className="p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Student Distribution by Program Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {programDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <Card className="p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Top Enrolled Courses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCourses} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis
                type="category"
                dataKey="course"
                tick={{ fontSize: 12 }}
                stroke="#64748b"
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="enrollments" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance Distribution */}
        <Card className="p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Attendance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {attendanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Department Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                  Department
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                  Students
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                  Average GPA
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {departmentPerformance.map((dept, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {dept.department}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{dept.students}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold">
                    {dept.avgGrade.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[200px]">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(dept.avgGrade / 4.0) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600">
                        {((dept.avgGrade / 4.0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
