
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the existing subjects data
import { SubjectOption, subjectsData as initialSubjectsData } from "../teaching/types/lesson";

// Extend the SubjectOption interface to include the new fields
interface ExtendedSubjectOption extends SubjectOption {
  code: string;
  ministryCode: string;
  schoolType: string;
  isScrutinizable: boolean;
  subjectType: "normal" | "irc" | "behavior" | "alternative_irc" | "support";
  includeInAverage: boolean;
}

// Enrich the initial data with the new fields
const enrichedInitialSubjects: ExtendedSubjectOption[] = initialSubjectsData.map(subject => ({
  ...subject,
  code: `C${subject.id}`,
  ministryCode: `M${subject.id}`,
  schoolType: "primary",
  isScrutinizable: true,
  subjectType: "normal" as const,
  includeInAverage: true
}));

const schoolTypes = [
  { id: "kindergarten", name: "Scuola dell'Infanzia" },
  { id: "primary", name: "Scuola Primaria" },
  { id: "middle", name: "Scuola Secondaria di primo grado" },
  { id: "high", name: "Scuola Secondaria di secondo grado" }
];

const subjectTypes = [
  { id: "normal", name: "Normale" },
  { id: "irc", name: "IRC" },
  { id: "behavior", name: "Comportamento" },
  { id: "alternative_irc", name: "Alternativa a IRC" },
  { id: "support", name: "Sostegno" }
];

const SubjectManagement: React.FC = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<ExtendedSubjectOption[]>(enrichedInitialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Partial<ExtendedSubjectOption>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenSubjectDialog = (subject?: ExtendedSubjectOption) => {
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
    if (!currentSubject.name?.trim() || !currentSubject.code?.trim() || !currentSubject.ministryCode?.trim() || !currentSubject.schoolType) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi obbligatori per continuare",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentSubject.id) {
      // Update existing subject
      setSubjects(
        subjects.map((s) => (s.id === currentSubject.id ? { ...s, ...currentSubject as ExtendedSubjectOption } : s))
      );
      toast({
        title: "Materia aggiornata",
        description: `La materia "${currentSubject.name}" è stata aggiornata con successo.`,
      });
    } else {
      // Create new subject
      const newSubject: ExtendedSubjectOption = {
        id: Date.now().toString(),
        name: currentSubject.name!,
        code: currentSubject.code!,
        ministryCode: currentSubject.ministryCode!,
        schoolType: currentSubject.schoolType!,
        isScrutinizable: currentSubject.isScrutinizable ?? true,
        subjectType: currentSubject.subjectType || "normal",
        includeInAverage: currentSubject.includeInAverage ?? true
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

  const getSchoolTypeName = (id: string) => {
    const type = schoolTypes.find(t => t.id === id);
    return type ? type.name : "Sconosciuto";
  };

  const getSubjectTypeName = (id: string) => {
    const type = subjectTypes.find(t => t.id === id);
    return type ? type.name : "Normale";
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
              <TableHead>Codice</TableHead>
              <TableHead>Codice Ministero</TableHead>
              <TableHead>Nome Materia</TableHead>
              <TableHead>Ordine di Scuola</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Scrutinabile</TableHead>
              <TableHead>Media</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.ministryCode}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{getSchoolTypeName(subject.schoolType)}</TableCell>
                <TableCell>{getSubjectTypeName(subject.subjectType)}</TableCell>
                <TableCell>{subject.isScrutinizable ? "Sì" : "No"}</TableCell>
                <TableCell>{subject.includeInAverage ? "Sì" : "No"}</TableCell>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifica Materia" : "Nuova Materia"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Codice Materia</Label>
              <Input
                id="code"
                value={currentSubject.code || ""}
                onChange={(e) =>
                  setCurrentSubject({ ...currentSubject, code: e.target.value })
                }
                placeholder="Inserisci il codice della materia"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ministryCode">Codice Ministero</Label>
              <Input
                id="ministryCode"
                value={currentSubject.ministryCode || ""}
                onChange={(e) =>
                  setCurrentSubject({ ...currentSubject, ministryCode: e.target.value })
                }
                placeholder="Inserisci il codice ministeriale"
              />
            </div>

            <div className="space-y-2 col-span-2">
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

            <div className="space-y-2">
              <Label htmlFor="schoolType">Ordine di Scuola</Label>
              <Select
                value={currentSubject.schoolType}
                onValueChange={(value) =>
                  setCurrentSubject({ ...currentSubject, schoolType: value })
                }
              >
                <SelectTrigger id="schoolType">
                  <SelectValue placeholder="Seleziona un ordine di scuola" />
                </SelectTrigger>
                <SelectContent>
                  {schoolTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectType">Tipo di Materia</Label>
              <Select
                value={currentSubject.subjectType}
                onValueChange={(value) =>
                  setCurrentSubject({ ...currentSubject, subjectType: value as ExtendedSubjectOption["subjectType"] })
                }
              >
                <SelectTrigger id="subjectType">
                  <SelectValue placeholder="Seleziona il tipo di materia" />
                </SelectTrigger>
                <SelectContent>
                  {subjectTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isScrutinizable"
                checked={currentSubject.isScrutinizable}
                onCheckedChange={(checked) =>
                  setCurrentSubject({ ...currentSubject, isScrutinizable: checked })
                }
              />
              <Label htmlFor="isScrutinizable">Scrutinabile</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="includeInAverage"
                checked={currentSubject.includeInAverage}
                onCheckedChange={(checked) =>
                  setCurrentSubject({ ...currentSubject, includeInAverage: checked })
                }
              />
              <Label htmlFor="includeInAverage">Includi in calcolo Media</Label>
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
