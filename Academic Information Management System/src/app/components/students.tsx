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
import { Plus, Search, Edit, Trash2, Users, Mail, Phone } from "lucide-react";
import { Badge } from "./ui/badge";

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  year: number;
  status: string;
  enrollmentDate: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    studentId: "2022-CS-001",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    program: "BSCS",
    year: 3,
    status: "Active",
    enrollmentDate: "2022-09-01",
  },
  {
    id: "2",
    studentId: "2023-CS-045",
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    phone: "+1 (555) 234-5678",
    program: "BSCS",
    year: 2,
    status: "Active",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "3",
    studentId: "2021-MSDS-012",
    name: "Carol Williams",
    email: "carol.williams@university.edu",
    phone: "+1 (555) 345-6789",
    program: "MSDS",
    year: 2,
    status: "Active",
    enrollmentDate: "2021-09-01",
  },
  {
    id: "4",
    studentId: "2024-CS-089",
    name: "David Brown",
    email: "david.brown@university.edu",
    phone: "+1 (555) 456-7890",
    program: "BSCS",
    year: 1,
    status: "Active",
    enrollmentDate: "2024-09-01",
  },
  {
    id: "5",
    studentId: "2022-BTE-034",
    name: "Emma Davis",
    email: "emma.davis@university.edu",
    phone: "+1 (555) 567-8901",
    program: "BTE",
    year: 3,
    status: "Active",
    enrollmentDate: "2022-09-01",
  },
];

export function Students() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram =
      filterProgram === "all" || student.program === filterProgram;
    const matchesYear =
      filterYear === "all" || student.year.toString() === filterYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({});
    setDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...s, ...formData } : s
        )
      );
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        studentId: formData.studentId || "",
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        program: formData.program || "",
        year: formData.year || 1,
        status: formData.status || "Active",
        enrollmentDate: formData.enrollmentDate || new Date().toISOString().split("T")[0],
      };
      setStudents([...students, newStudent]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-3 rounded-lg">
            <Users className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Students</h1>
            <p className="text-slate-600">Manage student records and information</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="size-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select value={filterProgram} onValueChange={setFilterProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="BSCS">BSCS</SelectItem>
                <SelectItem value="MSDS">MSDS</SelectItem>
                <SelectItem value="BTE">BTE</SelectItem>
                <SelectItem value="MTAI">MTAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-slate-400" />
                      <span className="text-sm">{student.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-slate-400" />
                      <span className="text-sm">{student.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.program}</Badge>
                  </TableCell>
                  <TableCell>Year {student.year}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(student)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? "Edit Student" : "Add New Student"}
            </DialogTitle>
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="student@university.edu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select
                value={formData.program}
                onValueChange={(value) =>
                  setFormData({ ...formData, program: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSCS">BSCS</SelectItem>
                  <SelectItem value="MSDS">MSDS</SelectItem>
                  <SelectItem value="BTE">BTE</SelectItem>
                  <SelectItem value="MTAI">MTAI</SelectItem>
                  <SelectItem value="PhD-CS">PhD-CS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                value={formData.year?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, year: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              {editingStudent ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
