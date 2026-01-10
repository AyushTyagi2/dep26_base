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
import { Plus, Search, Edit, Trash2, UserCircle, Mail, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";

interface Instructor {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  specialization: string;
  coursesAssigned: number;
  status: string;
  joinDate: string;
}

const mockInstructors: Instructor[] = [
  {
    id: "1",
    employeeId: "EMP-CS-001",
    name: "Dr. Robert Chen",
    email: "robert.chen@university.edu",
    department: "Computer Science",
    specialization: "Algorithms & Theory",
    coursesAssigned: 3,
    status: "Active",
    joinDate: "2018-08-15",
  },
  {
    id: "2",
    employeeId: "EMP-CS-012",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    department: "Computer Science",
    specialization: "Machine Learning",
    coursesAssigned: 2,
    status: "Active",
    joinDate: "2020-01-10",
  },
  {
    id: "3",
    employeeId: "EMP-EE-005",
    name: "Prof. Michael Davis",
    email: "michael.davis@university.edu",
    department: "Electronics Engineering",
    specialization: "Digital Systems",
    coursesAssigned: 4,
    status: "Active",
    joinDate: "2015-09-01",
  },
  {
    id: "4",
    employeeId: "EMP-CS-008",
    name: "Dr. Emily White",
    email: "emily.white@university.edu",
    department: "Computer Science",
    specialization: "Database Systems",
    coursesAssigned: 2,
    status: "Active",
    joinDate: "2019-02-20",
  },
  {
    id: "5",
    employeeId: "EMP-CS-015",
    name: "Dr. James Wilson",
    email: "james.wilson@university.edu",
    department: "Computer Science",
    specialization: "Software Engineering",
    coursesAssigned: 3,
    status: "Active",
    joinDate: "2021-08-01",
  },
];

export function Instructors() {
  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [formData, setFormData] = useState<Partial<Instructor>>({});

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || instructor.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAdd = () => {
    setEditingInstructor(null);
    setFormData({});
    setDialogOpen(true);
  };

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setFormData(instructor);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      setInstructors(instructors.filter((i) => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingInstructor) {
      setInstructors(
        instructors.map((i) =>
          i.id === editingInstructor.id ? { ...i, ...formData } : i
        )
      );
    } else {
      const newInstructor: Instructor = {
        id: Date.now().toString(),
        employeeId: formData.employeeId || "",
        name: formData.name || "",
        email: formData.email || "",
        department: formData.department || "",
        specialization: formData.specialization || "",
        coursesAssigned: formData.coursesAssigned || 0,
        status: formData.status || "Active",
        joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
      };
      setInstructors([...instructors, newInstructor]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-3 rounded-lg">
            <UserCircle className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Instructors</h1>
            <p className="text-slate-600">Manage faculty and teaching staff</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="size-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics Engineering">Electronics Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Instructors Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructors.map((instructor) => (
                <TableRow key={instructor.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    {instructor.employeeId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <UserCircle className="size-5 text-orange-600" />
                      </div>
                      <span>{instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 text-slate-400" />
                      <span className="text-sm">{instructor.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{instructor.department}</TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {instructor.specialization}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="size-4 text-slate-400" />
                      <span>{instructor.coursesAssigned}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700">
                      {instructor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(instructor)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(instructor.id)}
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
              {editingInstructor ? "Edit Instructor" : "Add New Instructor"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={formData.employeeId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                placeholder="e.g., EMP-CS-001"
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
                placeholder="e.g., Dr. John Doe"
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
                placeholder="instructor@university.edu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics Engineering">
                    Electronics Engineering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization || ""}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                placeholder="e.g., Machine Learning"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coursesAssigned">Courses Assigned</Label>
              <Input
                id="coursesAssigned"
                type="number"
                value={formData.coursesAssigned || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coursesAssigned: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g., 3"
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
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, joinDate: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
              {editingInstructor ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
