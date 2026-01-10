import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { Plus, Search, Edit, Trash2, BookOpen, Filter } from "lucide-react";
import { Badge } from "./ui/badge";

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: string;
  semester: string;
  department: string;
  description: string;
  minAttendance: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Programming",
    credits: 4,
    type: "Mandatory",
    semester: "Fall",
    department: "Computer Science",
    description: "Basic programming concepts and problem-solving",
    minAttendance: 75,
  },
  {
    id: "2",
    code: "CS201",
    name: "Data Structures and Algorithms",
    credits: 4,
    type: "Mandatory",
    semester: "Spring",
    department: "Computer Science",
    description: "Advanced data structures and algorithmic techniques",
    minAttendance: 75,
  },
  {
    id: "3",
    code: "CS301",
    name: "Machine Learning",
    credits: 3,
    type: "Elective",
    semester: "Fall",
    department: "Computer Science",
    description: "Introduction to ML algorithms and applications",
    minAttendance: 70,
  },
  {
    id: "4",
    code: "CS302",
    name: "Database Systems",
    credits: 3,
    type: "Mandatory",
    semester: "Spring",
    department: "Computer Science",
    description: "Database design, SQL, and transaction management",
    minAttendance: 75,
  },
  {
    id: "5",
    code: "EE201",
    name: "Digital Electronics",
    credits: 4,
    type: "Mandatory",
    semester: "Fall",
    department: "Electronics Engineering",
    description: "Digital logic design and circuits",
    minAttendance: 80,
  },
];

export function Courses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSemester, setFilterSemester] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({});

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || course.type === filterType;
    const matchesSemester =
      filterSemester === "all" || course.semester === filterSemester;
    return matchesSearch && matchesType && matchesSemester;
  });

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({});
    setDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData(course);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        code: formData.code || "",
        name: formData.name || "",
        credits: formData.credits || 0,
        type: formData.type || "",
        semester: formData.semester || "",
        department: formData.department || "",
        description: formData.description || "",
        minAttendance: formData.minAttendance || 75,
      };
      setCourses([...courses, newCourse]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-3 rounded-lg">
            <BookOpen className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Courses</h1>
            <p className="text-slate-600">Manage course catalog and offerings</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <Plus className="size-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-slate-500" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Course Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Mandatory">Mandatory</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Courses Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Min. Attendance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.type === "Mandatory" ? "default" : "secondary"
                      }
                      className={
                        course.type === "Mandatory"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      {course.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell>{course.minAttendance}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
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
              {editingCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={formData.code || ""}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g., CS101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Introduction to Programming"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={formData.credits || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    credits: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g., 4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Course Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mandatory">Mandatory</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department || ""}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minAttendance">Minimum Attendance (%)</Label>
              <Input
                id="minAttendance"
                type="number"
                value={formData.minAttendance || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minAttendance: parseInt(e.target.value) || 75,
                  })
                }
                placeholder="e.g., 75"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Course description..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {editingCourse ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
