
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the existing subjects and classes data
import { SubjectOption, subjectsData } from "../teaching/types/lesson";
import { classesData } from "../teaching/types/lesson";

interface SubjectClassAssignmentType {
  id: string;
  subjectId: string;
  classId: string;
  studentId?: string; // Optional, for individual student assignments
}

// Mock students data
const studentsData = [
  { id: "1", name: "Rossi Marco", classId: "1A" },
  { id: "2", name: "Bianchi Laura", classId: "1A" },
  { id: "3", name: "Verdi Giuseppe", classId: "2A" },
  { id: "4", name: "Neri Sofia", classId: "2A" },
];

const SubjectClassAssignment: React.FC = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<SubjectClassAssignmentType[]>([
    { id: "1", subjectId: "1", classId: "1A" },
    { id: "2", subjectId: "2", classId: "1A" },
    { id: "3", subjectId: "3", classId: "2A" },
    { id: "4", subjectId: "4", classId: "1A", studentId: "1" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<Partial<SubjectClassAssignmentType>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isIndividual, setIsIndividual] = useState(false);

  const handleOpenAssignmentDialog = (assignment?: SubjectClassAssignmentType) => {
    if (assignment) {
      setCurrentAssignment(assignment);
      setIsEditing(true);
      setIsIndividual(!!assignment.studentId);
    } else {
      setCurrentAssignment({});
      setIsEditing(false);
      setIsIndividual(false);
    }
    setIsDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (!currentAssignment.subjectId || (!isIndividual && !currentAssignment.classId) || (isIndividual && !currentAssignment.studentId)) {
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
        assignments.map((a) => (a.id === currentAssignment.id ? { ...currentAssignment as SubjectClassAssignmentType } : a))
      );
      toast({
        title: "Abbinamento aggiornato",
        description: "L'abbinamento materia-classe è stato aggiornato con successo.",
      });
    } else {
      // Create new assignment
      const newAssignment: SubjectClassAssignmentType = {
        id: Date.now().toString(),
        subjectId: currentAssignment.subjectId!,
        classId: isIndividual ? studentsData.find(s => s.id === currentAssignment.studentId)?.classId || "" : currentAssignment.classId!,
        studentId: isIndividual ? currentAssignment.studentId : undefined,
      };
      setAssignments([...assignments, newAssignment]);
      toast({
        title: "Abbinamento creato",
        description: "L'abbinamento materia-classe è stato creato con successo.",
      });
    }

    setIsDialogOpen(false);
    setCurrentAssignment({});
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
    toast({
      title: "Abbinamento eliminato",
      description: "L'abbinamento materia-classe è stato eliminato con successo.",
    });
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjectsData.find((s) => s.id === subjectId);
    return subject ? subject.name : "Materia sconosciuta";
  };

  const getClassName = (classId: string) => {
    const classItem = classesData.find((c) => c.id === classId);
    return classItem ? classItem.name : "Classe sconosciuta";
  };

  const getStudentName = (studentId: string) => {
    const student = studentsData.find((s) => s.id === studentId);
    return student ? student.name : "Studente sconosciuto";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Assegnazione Materie</CardTitle>
          <CardDescription>
            Assegna le materie alle classi o ai singoli studenti
          </CardDescription>
        </div>
        <Button onClick={() => handleOpenAssignmentDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuovo Abbinamento
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Materia</TableHead>
              <TableHead>Classe</TableHead>
              <TableHead>Studente</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{getSubjectName(assignment.subjectId)}</TableCell>
                <TableCell>{getClassName(assignment.classId)}</TableCell>
                <TableCell>
                  {assignment.studentId ? getStudentName(assignment.studentId) : "Tutta la classe"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenAssignmentDialog(assignment)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="individual" 
                checked={isIndividual}
                onCheckedChange={(checked) => {
                  setIsIndividual(checked === true);
                  if (checked) {
                    setCurrentAssignment({ ...currentAssignment, studentId: "", classId: "" });
                  } else {
                    setCurrentAssignment({ ...currentAssignment, studentId: undefined });
                  }
                }}
              />
              <Label htmlFor="individual">Assegnazione individuale</Label>
            </div>

            {!isIndividual ? (
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
            ) : (
              <div className="space-y-2">
                <Label htmlFor="student">Studente</Label>
                <Select
                  value={currentAssignment.studentId}
                  onValueChange={(value) => {
                    const student = studentsData.find(s => s.id === value);
                    setCurrentAssignment({ 
                      ...currentAssignment, 
                      studentId: value,
                      classId: student?.classId || ""
                    });
                  }}
                >
                  <SelectTrigger id="student">
                    <SelectValue placeholder="Seleziona uno studente" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentsData.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {getClassName(student.classId)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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

export default SubjectClassAssignment;
