
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserX, AlarmClock, ArrowRightFromLine, FileCheck, ClipboardList } from "lucide-react";

const studentClasses = ["1A", "1B", "2A", "2B", "3A", "3B"];

const mockStudents = [
  { id: 1, name: "Marco Bianchi", class: "3A" },
  { id: 2, name: "Anna Verdi", class: "3A" },
  { id: 3, name: "Luca Rossi", class: "3A" },
  { id: 4, name: "Elena Neri", class: "3A" },
  { id: 5, name: "Paolo Gialli", class: "3A" },
  { id: 6, name: "Sofia Blu", class: "1A" },
  { id: 7, name: "Matteo Viola", class: "1A" },
  { id: 8, name: "Chiara Arancio", class: "2B" },
];

type AttendanceType = "absence" | "late" | "early-exit" | "justification";

const AttendanceForm = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedType, setSelectedType] = useState<AttendanceType>("absence");
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
  const [notes, setNotes] = useState<string>("");

  const filteredStudents = selectedClass 
    ? mockStudents.filter(student => student.class === selectedClass) 
    : mockStudents;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedStudent || !selectedType || !date) {
      toast({
        title: "Errore",
        description: "Completa tutti i campi obbligatori.",
        variant: "destructive",
      });
      return;
    }

    // Submit attendance record (mock implementation)
    toast({
      title: "Registrazione Salvata",
      description: "La registrazione è stata salvata con successo.",
    });

    // Clear form
    setSelectedStudent("");
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuova Registrazione</CardTitle>
        <CardDescription>
          Registra assenze, ritardi, uscite anticipate e giustificazioni
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Classe</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Seleziona la classe" />
                </SelectTrigger>
                <SelectContent>
                  {studentClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="student">Studente</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Seleziona lo studente" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStudents.map(student => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo di Registrazione</Label>
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as AttendanceType)}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Seleziona il tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="absence">
                    <div className="flex items-center">
                      <UserX className="mr-2 h-4 w-4 text-red-500" />
                      <span>Assenza</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="late">
                    <div className="flex items-center">
                      <AlarmClock className="mr-2 h-4 w-4 text-amber-500" />
                      <span>Ritardo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="early-exit">
                    <div className="flex items-center">
                      <ArrowRightFromLine className="mr-2 h-4 w-4 text-blue-500" />
                      <span>Uscita Anticipata</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="justification">
                    <div className="flex items-center">
                      <FileCheck className="mr-2 h-4 w-4 text-green-500" />
                      <span>Giustificazione</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input 
                id="date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>

            {(selectedType === "late" || selectedType === "early-exit") && (
              <div className="space-y-2">
                <Label htmlFor="time">Orario</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea 
              id="notes" 
              placeholder="Inserisci eventuali note o motivazioni" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" type="button">Annulla</Button>
        <Button type="submit" onClick={handleSubmit}>Salva Registrazione</Button>
      </CardFooter>
    </Card>
  );
};

export default AttendanceForm;
