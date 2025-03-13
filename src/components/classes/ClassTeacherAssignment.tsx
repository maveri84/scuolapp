
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, UserPlus, Pencil, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for teachers
const teachersData = [
  { id: "1", name: "Prof. Rossi Maria" },
  { id: "2", name: "Prof. Bianchi Paolo" },
  { id: "3", name: "Prof. Verdi Anna" },
  { id: "4", name: "Prof. Neri Luigi" },
  { id: "5", name: "Prof. Gialli Marco" },
];

// Import class data from existing types
import { classesData, subjectsData } from "../teaching/types/lesson";

interface TeacherAssignment {
  id: string;
  teacherId: string;
  classId: string;
  subjectId: string;
}

const ClassTeacherAssignment: React.FC = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([
    { id: "1", teacherId: "1", classId: "1A", subjectId: "1" },
    { id: "2", teacherId: "2", classId: "1A", subjectId: "2" },
    { id: "3", teacherId: "3", classId: "2A", subjectId: "3" },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<Partial<TeacherAssignment>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAssignmentDialog = (assignment?: TeacherAssignment) => {
    if (assignment) {
      setCurrentAssignment(assignment);
      setIsEditing(true);
    } else {
      setCurrentAssignment({});
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (!currentAssignment.teacherId || !currentAssignment.classId || !currentAssignment.subjectId) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi per salvare l'abbinamento",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentAssignment.id) {
      // Update existing assignment
      setAssignments(
        assignments.map((a) => (a.id === currentAssignment.id ? { ...currentAssignment as TeacherAssignment } : a))
      );
      toast({
        title: "Abbinamento aggiornato",
        description: "L'abbinamento insegnante-classe è stato aggiornato con successo.",
      });
    } else {
      // Create new assignment
      const newAssignment: TeacherAssignment = {
        id: Date.now().toString(),
        teacherId: currentAssignment.teacherId!,
        classId: currentAssignment.classId!,
        subjectId: currentAssignment.subjectId!,
      };
      setAssignments([...assignments, newAssignment]);
      toast({
        title: "Abbinamento creato",
        description: "L'abbinamento insegnante-classe è stato creato con successo.",
      });
    }

    setIsDialogOpen(false);
    setCurrentAssignment({});
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = teachersData.find((t) => t.id === teacherId);
    return teacher ? teacher.name : "Insegnante sconosciuto";
  };

  const getClassName = (classId: string) => {
    const classItem = classesData.find((c) => c.id === classId);
    return classItem ? classItem.name : "Classe sconosciuta";
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjectsData.find((s) => s.id === subjectId);
    return subject ? subject.name : "Materia sconosciuta";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Abbinamenti Insegnanti - Classi</CardTitle>
          <CardDescription>
            Gestisci l'assegnazione degli insegnanti alle classi e alle materie
          </CardDescription>
        </div>
        <Button onClick={() => handleOpenAssignmentDialog()}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuovo Abbinamento
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insegnante</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{getTeacherName(assignment.teacherId)}</TableCell>
                <TableCell>{getClassName(assignment.classId)}</TableCell>
                <TableCell>{getSubjectName(assignment.subjectId)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenAssignmentDialog(assignment)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifica Abbinamento" : "Nuovo Abbinamento"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="teacher">Insegnante</Label>
              <Select
                value={currentAssignment.teacherId}
                onValueChange={(value) =>
                  setCurrentAssignment({ ...currentAssignment, teacherId: value })
                }
              >
                <SelectTrigger id="teacher">
                  <SelectValue placeholder="Seleziona un insegnante" />
                </SelectTrigger>
                <SelectContent>
                  {teachersData.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Classe</Label>
              <Select
                value={currentAssignment.classId}
                onValueChange={(value) =>
                  setCurrentAssignment({ ...currentAssignment, classId: value })
                }
              >
                <SelectTrigger id="class">
                  <SelectValue placeholder="Seleziona una classe" />
                </SelectTrigger>
                <SelectContent>
                  {classesData.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Materia</Label>
              <Select
                value={currentAssignment.subjectId}
                onValueChange={(value) =>
                  setCurrentAssignment({ ...currentAssignment, subjectId: value })
                }
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Seleziona una materia" />
                </SelectTrigger>
                <SelectContent>
                  {subjectsData.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveAssignment}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClassTeacherAssignment;
