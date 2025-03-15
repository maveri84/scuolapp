
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClassSelectProps, StudentProps } from "./types";

interface NotesTabProps {
  classes: ClassSelectProps[];
  students: StudentProps[];
}

const NotesTab = ({ classes, students }: NotesTabProps) => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>("3A");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [disciplinaryNote, setDisciplinaryNote] = useState<string>("");

  const handleAddDisciplinaryNote = () => {
    if (!selectedStudent || !disciplinaryNote) {
      toast({
        title: "Informazioni mancanti",
        description: "Seleziona uno studente e inserisci una nota",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Nota disciplinare aggiunta",
      description: `Nota aggiunta per ${students.find(s => s.id === selectedStudent)?.name}`,
    });
    
    // Reset form
    setSelectedStudent("");
    setDisciplinaryNote("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Note Disciplinari</CardTitle>
        <CardDescription>
          Gestisci le note disciplinari per gli studenti
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Classe</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona classe" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>
                    {cls.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Studente</label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona studente" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nota disciplinare</label>
          <Textarea 
            value={disciplinaryNote}
            onChange={(e) => setDisciplinaryNote(e.target.value)}
            placeholder="Inserisci la nota disciplinare"
            className="min-h-24"
          />
        </div>

        <Button onClick={handleAddDisciplinaryNote}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Aggiungi Nota
        </Button>

        <div className="mt-4 border rounded-md p-4">
          <h3 className="font-medium mb-4">Note recenti</h3>
          <p className="text-muted-foreground text-sm">Nessuna nota recente da visualizzare</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesTab;
