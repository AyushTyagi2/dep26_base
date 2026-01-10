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
import { Card } from "./ui/card";
import { Plus, Search, Edit, Trash2, GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Program {
  id: string;
  name: string;
  code: string;
  type: string;
  duration: string;
  requiredCredits: number;
  department: string;
}

const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Bachelor of Science in Computer Science",
    code: "BSCS",
    type: "Undergraduate",
    duration: "4 years",
    requiredCredits: 120,
    department: "Computer Science",
  },
  {
    id: "2",
    name: "Master of Science in Data Science",
    code: "MSDS",
    type: "Graduate",
    duration: "2 years",
    requiredCredits: 36,
    department: "Computer Science",
  },
  {
    id: "3",
    name: "Bachelor of Technology in Electronics",
    code: "BTE",
    type: "Undergraduate",
    duration: "4 years",
    requiredCredits: 120,
    department: "Electronics Engineering",
  },
  {
    id: "4",
    name: "Master of Technology in AI",
    code: "MTAI",
    type: "Graduate",
    duration: "2 years",
    requiredCredits: 40,
    department: "Computer Science",
  },
  {
    id: "5",
    name: "Doctor of Philosophy in Computer Science",
    code: "PhD-CS",
    type: "Doctoral",
    duration: "4-6 years",
    requiredCredits: 60,
    department: "Computer Science",
  },
];

export function Programs() {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState<Partial<Program>>({});

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingProgram(null);
    setFormData({});
    setDialogOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData(program);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms(programs.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingProgram) {
      setPrograms(
        programs.map((p) =>
          p.id === editingProgram.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newProgram: Program = {
        id: Date.now().toString(),
        name: formData.name || "",
        code: formData.code || "",
        type: formData.type || "",
        duration: formData.duration || "",
        requiredCredits: formData.requiredCredits || 0,
        department: formData.department || "",
      };
      setPrograms([...programs, newProgram]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#5D9E9C] p-3 rounded-lg">
            <GraduationCap className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Programs</h1>
            <p className="text-slate-600">Manage degree programs and requirements</p>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-[#5D9E9C] hover:bg-[#4D8E8C]">
          <Plus className="size-4 mr-2" />
          Add Program
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 border border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Search programs by name, code, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Programs Table */}
      <Card className="border border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Required Credits</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{program.code}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.type === "Undergraduate"
                          ? "bg-blue-100 text-blue-700"
                          : program.type === "Graduate"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {program.type}
                    </span>
                  </TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{program.requiredCredits}</TableCell>
                  <TableCell>{program.department}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(program)}
                        className="hover:bg-blue-50"
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(program.id)}
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
              {editingProgram ? "Edit Program" : "Add New Program"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Program Code</Label>
              <Input
                id="code"
                value={formData.code || ""}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g., BSCS"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
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
                  <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Doctoral">Doctoral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration || ""}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 4 years"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Required Credits</Label>
              <Input
                id="credits"
                type="number"
                value={formData.requiredCredits || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requiredCredits: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g., 120"
              />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#5D9E9C] hover:bg-[#4D8E8C]">
              {editingProgram ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
