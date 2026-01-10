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
import { Plus, Search, Trash2, ClipboardList } from "lucide-react";
import { Badge } from "./ui/badge";

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  semester: string;
  year: number;
  enrollmentDate: string;
  status: string;
  grade?: string;
}

const mockEnrollments: Enrollment[] = [
  {
    id: "1",
    studentId: "2022-CS-001",
    studentName: "Alice Johnson",
    courseCode: "CS201",
    courseName: "Data Structures and Algorithms",
    semester: "Spring",
    year: 2026,
    enrollmentDate: "2026-01-05",
    status: "Active",
  },
  {
    id: "2",
    studentId: "2023-CS-045",
    studentName: "Bob Smith",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    semester: "Spring",
    year: 2026,
    enrollmentDate: "2026-01-05",
    status: "Active",
  },
  {
    id: "3",
    studentId: "2021-MSDS-012",
    studentName: "Carol Williams",
    courseCode: "CS301",
    courseName: "Machine Learning",
    semester: "Spring",
    year: 2026,
    enrollmentDate: "2026-01-05",
    status: "Active",
  },
  {
    id: "4",
    studentId: "2022-CS-001",
    studentName: "Alice Johnson",
    courseCode: "CS302",
    courseName: "Database Systems",
    semester: "Fall",
    year: 2025,
    enrollmentDate: "2025-08-20",
    status: "Completed",
    grade: "A",
  },
  {
    id: "5",
    studentId: "2024-CS-089",
    studentName: "David Brown",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    semester: "Spring",
    year: 2026,
    enrollmentDate: "2026-01-05",
    status: "Active",
  },
];

export function Enrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSemester, setFilterSemester] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Enrollment>>({});

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || enrollment.status === filterStatus;
    const matchesSemester =
      filterSemester === "all" || enrollment.semester === filterSemester;
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const handleAdd = () => {
    setFormData({});
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this enrollment?")) {
      setEnrollments(enrollments.filter((e) => e.id !== id));
    }
  };

  const handleSave = () => {
    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      studentId: formData.studentId || "",
      studentName: formData.studentName || "",
      courseCode: formData.courseCode || "",
      courseName: formData.courseName || "",
      semester: formData.semester || "",
      year: formData.year || new Date().getFullYear(),
      enrollmentDate:
        formData.enrollmentDate || new Date().toISOString().split("T")[0],
      status: formData.status || "Active",
      grade: formData.grade,
    };
    setEnrollments([...enrollments, newEnrollment]);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-3 rounded-lg">
            <ClipboardList className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Enrollments</h1>
            <p className="text-slate-600">Manage student course enrollments</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="size-4 mr-2" />
          Add Enrollment
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search enrollments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Enrollments Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    {enrollment.studentId}
                  </TableCell>
                  <TableCell>{enrollment.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{enrollment.courseCode}</Badge>
                  </TableCell>
                  <TableCell>{enrollment.courseName}</TableCell>
                  <TableCell>{enrollment.semester}</TableCell>
                  <TableCell>{enrollment.year}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        enrollment.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : enrollment.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {enrollment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {enrollment.grade ? (
                      <Badge className="bg-amber-100 text-amber-700">
                        {enrollment.grade}
                      </Badge>
                    ) : (
                      <span className="text-slate-400 text-sm">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(enrollment.id)}
                      className="hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Enrollment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Enrollment</DialogTitle>
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
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) =>
                  setFormData({ ...formData, semester: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    year: parseInt(e.target.value) || 2026,
                  })
                }
                placeholder="2026"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, enrollmentDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
