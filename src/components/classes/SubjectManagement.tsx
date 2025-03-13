
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the existing subjects data
import { SubjectOption, subjectsData as initialSubjectsData } from "../teaching/types/lesson";

const SubjectManagement: React.FC = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<SubjectOption[]>(initialSubjectsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Partial<SubjectOption>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenSubjectDialog = (subject?: SubjectOption) => {
    if (subject) {
      setCurrentSubject(subject);
      setIsEditing(true);
    } else {
      setCurrentSubject({});
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSaveSubject = () => {
    if (!currentSubject.name?.trim()) {
      toast({
        title: "Dati incompleti",
        description: "Inserisci il nome della materia per continuare",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentSubject.id) {
      // Update existing subject
      setSubjects(
        subjects.map((s) => (s.id === currentSubject.id ? { ...currentSubject as SubjectOption } : s))
      );
      toast({
        title: "Materia aggiornata",
        description: `La materia "${currentSubject.name}" è stata aggiornata con successo.`,
      });
    } else {
      // Create new subject
      const newSubject: SubjectOption = {
        id: Date.now().toString(),
        name: currentSubject.name,
      };
      setSubjects([...subjects, newSubject]);
      toast({
        title: "Materia creata",
        description: `La materia "${currentSubject.name}" è stata creata con successo.`,
      });
    }

    setIsDialogOpen(false);
    setCurrentSubject({});
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
    toast({
      title: "Materia eliminata",
      description: "La materia è stata eliminata con successo.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Gestione Materie</CardTitle>
          <CardDescription>
            Aggiungi, modifica ed elimina le materie scolastiche
          </CardDescription>
        </div>
        <Button onClick={() => handleOpenSubjectDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuova Materia
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Materia</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenSubjectDialog(subject)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSubject(subject.id)}
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
              {isEditing ? "Modifica Materia" : "Nuova Materia"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Nome Materia</Label>
              <Input
                id="subjectName"
                value={currentSubject.name || ""}
                onChange={(e) =>
                  setCurrentSubject({ ...currentSubject, name: e.target.value })
                }
                placeholder="Inserisci il nome della materia"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveSubject}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SubjectManagement;
