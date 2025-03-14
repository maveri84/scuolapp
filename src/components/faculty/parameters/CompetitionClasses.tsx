
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompetitionClass {
  id: string;
  code: string;
  name: string;
  description: string;
}

// Mock initial data
const initialClasses: CompetitionClass[] = [
  { id: "1", code: "A-01", name: "Arte e immagine", description: "Scuola secondaria di I grado" },
  { id: "2", code: "A-12", name: "Discipline letterarie", description: "Istituti di istruzione secondaria di II grado" },
  { id: "3", code: "A-26", name: "Matematica", description: "Istituti di istruzione secondaria di II grado" },
  { id: "4", code: "A-41", name: "Scienze e tecnologie informatiche", description: "Istituti di istruzione secondaria di II grado" },
];

const CompetitionClasses: React.FC = () => {
  const { toast } = useToast();
  const [classes, setClasses] = useState<CompetitionClass[]>(initialClasses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<Partial<CompetitionClass>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (competitionClass?: CompetitionClass) => {
    if (competitionClass) {
      setCurrentClass(competitionClass);
      setIsEditing(true);
    } else {
      setCurrentClass({});
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentClass.code?.trim() || !currentClass.name?.trim()) {
      toast({
        title: "Dati incompleti",
        description: "Inserisci il codice e il nome della classe di concorso",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentClass.id) {
      // Update existing class
      setClasses(
        classes.map((c) => (c.id === currentClass.id ? { ...currentClass as CompetitionClass } : c))
      );
      toast({
        title: "Classe di concorso aggiornata",
        description: `La classe "${currentClass.code}" è stata aggiornata con successo.`,
      });
    } else {
      // Create new class
      const newClass: CompetitionClass = {
        id: Date.now().toString(),
        code: currentClass.code || "",
        name: currentClass.name || "",
        description: currentClass.description || "",
      };
      setClasses([...classes, newClass]);
      toast({
        title: "Classe di concorso creata",
        description: `La classe "${currentClass.code}" è stata creata con successo.`,
      });
    }

    setIsDialogOpen(false);
    setCurrentClass({});
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    toast({
      title: "Classe di concorso eliminata",
      description: "La classe di concorso è stata eliminata con successo.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Classi di Concorso</CardTitle>
          <CardDescription>
            Gestisci le classi di concorso per l'insegnamento
          </CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuova Classe
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Codice</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrizione</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium">{cls.code}</TableCell>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(cls)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cls.id)}
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
              {isEditing ? "Modifica Classe di Concorso" : "Nuova Classe di Concorso"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="classCode">Codice</Label>
              <Input
                id="classCode"
                value={currentClass.code || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, code: e.target.value })
                }
                placeholder="Es. A-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="className">Nome</Label>
              <Input
                id="className"
                value={currentClass.name || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, name: e.target.value })
                }
                placeholder="Nome della classe di concorso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classDescription">Descrizione</Label>
              <Input
                id="classDescription"
                value={currentClass.description || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, description: e.target.value })
                }
                placeholder="Descrizione opzionale"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CompetitionClasses;
