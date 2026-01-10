import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Plus, Search, CheckSquare, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  lastUpdated: string;
  status: string;
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "2022-CS-001",
    studentName: "Alice Johnson",
    courseCode: "CS201",
    courseName: "Data Structures and Algorithms",
    totalClasses: 30,
    attendedClasses: 28,
    attendancePercentage: 93.3,
    lastUpdated: "2026-01-08",
    status: "Good",
  },
  {
    id: "2",
    studentId: "2023-CS-045",
    studentName: "Bob Smith",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    totalClasses: 25,
    attendedClasses: 18,
    attendancePercentage: 72.0,
    lastUpdated: "2026-01-08",
    status: "Warning",
  },
  {
    id: "3",
    studentId: "2021-MSDS-012",
    studentName: "Carol Williams",
    courseCode: "CS301",
    courseName: "Machine Learning",
    totalClasses: 28,
    attendedClasses: 27,
    attendancePercentage: 96.4,
    lastUpdated: "2026-01-08",
    status: "Good",
  },
  {
    id: "4",
    studentId: "2024-CS-089",
    studentName: "David Brown",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    totalClasses: 25,
    attendedClasses: 16,
    attendancePercentage: 64.0,
    lastUpdated: "2026-01-08",
    status: "Critical",
  },
  {
    id: "5",
    studentId: "2022-BTE-034",
    studentName: "Emma Davis",
    courseCode: "EE201",
    courseName: "Digital Electronics",
    totalClasses: 32,
    attendedClasses: 30,
    attendancePercentage: 93.8,
    lastUpdated: "2026-01-08",
    status: "Good",
  },
];

export function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AttendanceRecord>>({});

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setFormData({});
    setDialogOpen(true);
  };

  const handleSave = () => {
    const attended = formData.attendedClasses || 0;
    const total = formData.totalClasses || 0;
    const percentage = total > 0 ? (attended / total) * 100 : 0;
    let status = "Good";
    if (percentage < 70) status = "Critical";
    else if (percentage < 80) status = "Warning";

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId: formData.studentId || "",
      studentName: formData.studentName || "",
      courseCode: formData.courseCode || "",
      courseName: formData.courseName || "",
      totalClasses: total,
      attendedClasses: attended,
      attendancePercentage: parseFloat(percentage.toFixed(1)),
      lastUpdated: new Date().toISOString().split("T")[0],
      status,
    };
    setAttendance([...attendance, newRecord]);
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-700";
      case "Warning":
        return "bg-amber-100 text-amber-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500 p-3 rounded-lg">
            <CheckSquare className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
            <p className="text-slate-600">Track and manage student attendance</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="size-4 mr-2" />
          Add Record
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckSquare className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Good Standing</p>
              <p className="text-2xl font-bold text-slate-800">
                {attendance.filter((a) => a.status === "Good").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertCircle className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Needs Attention</p>
              <p className="text-2xl font-bold text-slate-800">
                {attendance.filter((a) => a.status === "Warning").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Critical</p>
              <p className="text-2xl font-bold text-slate-800">
                {attendance.filter((a) => a.status === "Critical").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search attendance records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    {record.studentId}
                  </TableCell>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.courseCode}</Badge>
                  </TableCell>
                  <TableCell>{record.courseName}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {record.attendedClasses}/{record.totalClasses}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium min-w-[3rem]">
                          {record.attendancePercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={record.attendancePercentage}
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {new Date(record.lastUpdated).toLocaleDateString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Attendance Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Attendance Record</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                placeholder="e.g., 2024-CS-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={formData.studentName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, studentName: e.target.value })
                }
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                value={formData.courseCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, courseCode: e.target.value })
                }
                placeholder="e.g., CS101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={formData.courseName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
                placeholder="e.g., Introduction to Programming"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalClasses">Total Classes</Label>
              <Input
                id="totalClasses"
                type="number"
                value={formData.totalClasses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalClasses: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g., 30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendedClasses">Attended Classes</Label>
              <Input
                id="attendedClasses"
                type="number"
                value={formData.attendedClasses || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendedClasses: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g., 28"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
