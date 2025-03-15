
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Filter, Search, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for students
const mockStudents = [
  { id: 1, name: "Marco Rossi", class: "3A" },
  { id: 2, name: "Giulia Bianchi", class: "3A" },
  { id: 3, name: "Luca Verdi", class: "3A" },
  { id: 4, name: "Sofia Russo", class: "3A" },
  { id: 5, name: "Alessandro Ferrara", class: "3A" },
  { id: 6, name: "Giovanni Bruno", class: "2B" },
  { id: 7, name: "Maria Esposito", class: "2B" },
  { id: 8, name: "Paolo Marino", class: "1A" },
  { id: 9, name: "Laura Greco", class: "1A" },
  { id: 10, name: "Roberto Conti", class: "1A" },
];

// Mock subjects for dropdown
const subjects = [
  { value: "italiano", label: "Italiano" },
  { value: "matematica", label: "Matematica" },
  { value: "storia", label: "Storia" },
  { value: "scienze", label: "Scienze" },
  { value: "inglese", label: "Inglese" },
];

// Mock classes
const classes = [
  { value: "1A", label: "1A" },
  { value: "2B", label: "2B" },
  { value: "3A", label: "3A" },
];

// Mock assessment types
const assessmentTypes = [
  { value: "written", label: "Scritto" },
  { value: "oral", label: "Orale" },
  { value: "practical", label: "Pratico" },
  { value: "formative", label: "Formativo" },
  { value: "summative", label: "Sommativo" },
];

// MIM 2025 learning outcomes - Competenze
const learningOutcomes = [
  { value: "communication", label: "Comunicazione nella lingua madre" },
  { value: "mathematical", label: "Competenza matematica" },
  { value: "digital", label: "Competenza digitale" },
  { value: "learning", label: "Imparare ad imparare" },
  { value: "social", label: "Competenze sociali e civiche" },
  { value: "initiative", label: "Spirito di iniziativa" },
  { value: "cultural", label: "Consapevolezza ed espressione culturale" },
];

const GradesTable: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showCompetences, setShowCompetences] = useState<boolean>(false);
  const [showNewGradeDialog, setShowNewGradeDialog] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  
  const filteredStudents = mockStudents.filter(student => {
    return (
      (selectedClass ? student.class === selectedClass : true) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddGrade = () => {
    setShowNewGradeDialog(true);
  };

  const handleSaveGrade = () => {
    toast({
      title: "Valutazione salvata",
      description: "La valutazione è stata salvata con successo.",
    });
    setShowNewGradeDialog(false);
  };

  const handleSaveAllGrades = () => {
    toast({
      title: "Tutte le valutazioni salvate",
      description: "Tutte le valutazioni sono state salvate con successo.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Inserimento Voti</CardTitle>
        <CardDescription>
          Inserisci le valutazioni per studente, materia e tipologia di valutazione
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona materia" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipologia di valutazione" />
                </SelectTrigger>
                <SelectContent>
                  {assessmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tutte le classi</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.value} value={cls.value}>
                      {cls.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca studente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtri
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCompetences(!showCompetences)}
              >
                {showCompetences ? "Nascondi competenze" : "Mostra competenze MIM 2025"}
              </Button>
            </div>
            <Button size="sm" onClick={handleAddGrade}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuova Valutazione
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Studente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Voto</TableHead>
                  <TableHead>Giudizio</TableHead>
                  {showCompetences && <TableHead>Competenza (MIM 2025)</TableHead>}
                  <TableHead>Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.class}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input type="date" className="w-full" defaultValue="2023-11-15" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="1" max="10" step="0.25" className="w-20" placeholder="1-10" />
                    </TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Seleziona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ottimo">Ottimo</SelectItem>
                          <SelectItem value="buono">Buono</SelectItem>
                          <SelectItem value="discreto">Discreto</SelectItem>
                          <SelectItem value="sufficiente">Sufficiente</SelectItem>
                          <SelectItem value="insufficiente">Insufficiente</SelectItem>
                          <SelectItem value="gravemente_insufficiente">Grav. Insufficiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {showCompetences && (
                      <TableCell>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Competenza" />
                          </SelectTrigger>
                          <SelectContent>
                            {learningOutcomes.map((outcome) => (
                              <SelectItem key={outcome.value} value={outcome.value}>
                                {outcome.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )}
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredStudents.length} studenti
            </div>
            <Button variant="outline" onClick={handleSaveAllGrades}>Salva Tutte le Valutazioni</Button>
          </div>
        </div>

        <Dialog open={showNewGradeDialog} onOpenChange={setShowNewGradeDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nuova Valutazione</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="newGradeClass">Classe</Label>
                <Select defaultValue={selectedClass}>
                  <SelectTrigger id="newGradeClass">
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
                <Label htmlFor="newGradeStudent">Studente</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger id="newGradeStudent">
                    <SelectValue placeholder="Seleziona studente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents
                      .filter(s => !selectedClass || s.class === selectedClass)
                      .map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newGradeSubject">Materia</Label>
                <Select defaultValue={selectedSubject}>
                  <SelectTrigger id="newGradeSubject">
                    <SelectValue placeholder="Seleziona materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newGradeType">Tipo Valutazione</Label>
                <Select defaultValue={selectedType}>
                  <SelectTrigger id="newGradeType">
                    <SelectValue placeholder="Seleziona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newGradeDate">Data</Label>
                <Input type="date" id="newGradeDate" defaultValue="2023-11-15" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newGradeValue">Voto (1-10)</Label>
                <Input type="number" min="1" max="10" step="0.25" id="newGradeValue" placeholder="7.5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newGradeComment">Commento</Label>
                <Textarea id="newGradeComment" placeholder="Inserisci un commento..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewGradeDialog(false)}>Annulla</Button>
              <Button onClick={handleSaveGrade}>Salva</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GradesTable;
