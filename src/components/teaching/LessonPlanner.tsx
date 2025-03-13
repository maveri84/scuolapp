
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import { it } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Copy,
  Edit,
  FileText,
  Plus,
  SaveAll,
  Search,
  Share2,
  Target,
  Trash2,
  Users,
  BookCopy
} from "lucide-react";

// Mock data for classes
const classesData = [
  { id: '1A', name: '1A' },
  { id: '1B', name: '1B' },
  { id: '2A', name: '2A' },
  { id: '2B', name: '2B' },
  { id: '3A', name: '3A' },
  { id: '3B', name: '3B' },
];

// Mock data for subjects
const subjectsData = [
  { id: '1', name: 'Matematica' },
  { id: '2', name: 'Italiano' },
  { id: '3', name: 'Storia' },
  { id: '4', name: 'Geografia' },
  { id: '5', name: 'Scienze' },
  { id: '6', name: 'Inglese' },
  { id: '7', name: 'Arte' },
  { id: '8', name: 'Musica' },
  { id: '9', name: 'Educazione Fisica' },
  { id: '10', name: 'Tecnologia' },
];

// Define the type for the status to be one of the specified literal types
type LessonStatus = 'draft' | 'upcoming' | 'completed';

// Mock lesson plans
const mockLessonPlans = [
  {
    id: '1',
    title: 'Le frazioni: introduzione',
    subject: 'Matematica',
    class: '1A',
    date: '2024-04-15',
    duration: 60,
    objectives: 'Comprendere il concetto di frazione come parte di un intero. Saper rappresentare graficamente le frazioni.',
    materials: ['Libro di testo', 'Schede didattiche', 'LIM'],
    activities: 'Lezione frontale (20 min)\nAttività pratiche con materiali manipolativi (30 min)\nEsercizi alla lavagna (10 min)',
    assessment: 'Partecipazione in classe\nEsercizi individuali di verifica',
    notes: 'Prestare attenzione agli studenti con difficoltà nel concetto di divisione',
    status: 'completed' as LessonStatus  // Type cast to ensure TypeScript recognizes it as a valid status
  },
  {
    id: '2',
    title: 'I verbi regolari al presente',
    subject: 'Italiano',
    class: '1B',
    date: '2024-04-16',
    duration: 45,
    objectives: 'Riconoscere i verbi regolari. Saper coniugare i verbi al presente indicativo.',
    materials: ['Libro di testo', 'LIM', 'Schede di esercizi'],
    activities: 'Ripasso delle regole (15 min)\nEsempi pratici (15 min)\nEsercizi individuali (15 min)',
    assessment: 'Esercizi di completamento\nProva di verifica scritta',
    notes: '',
    status: 'upcoming' as LessonStatus  // Type cast to ensure TypeScript recognizes it as a valid status
  },
  {
    id: '3',
    title: 'La civiltà romana: le origini',
    subject: 'Storia',
    class: '2A',
    date: '2024-04-18',
    duration: 90,
    objectives: 'Conoscere le origini di Roma e le principali caratteristiche della civiltà romana',
    materials: ['Libro di testo', 'Presentazione PowerPoint', 'Documentario video'],
    activities: 'Introduzione all\'argomento (20 min)\nVisione documentario (30 min)\nDiscussione guidata (20 min)\nAttività di gruppo (20 min)',
    assessment: 'Partecipazione alla discussione\nElaborato di gruppo',
    notes: 'Preparare la mappa concettuale da distribuire agli studenti',
    status: 'draft' as LessonStatus  // Type cast to ensure TypeScript recognizes it as a valid status
  }
];

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  class: string;
  date: string;
  duration: number;
  objectives: string;
  materials: string[];
  activities: string;
  assessment: string;
  notes: string;
  status: LessonStatus;  // Using the type alias for status
}

const LessonPlanner = () => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  
  // Form state
  const [newPlan, setNewPlan] = useState<Omit<LessonPlan, 'id' | 'status'>>({
    title: '',
    subject: '',
    class: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 60,
    objectives: '',
    materials: [],
    activities: '',
    assessment: '',
    notes: ''
  });
  
  const [newMaterial, setNewMaterial] = useState('');
  
  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setNewPlan({
        ...newPlan,
        materials: [...newPlan.materials, newMaterial.trim()]
      });
      setNewMaterial('');
    }
  };
  
  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = [...newPlan.materials];
    updatedMaterials.splice(index, 1);
    setNewPlan({
      ...newPlan,
      materials: updatedMaterials
    });
  };
  
  const handleCreateLessonPlan = () => {
    const newLessonPlan: LessonPlan = {
      ...newPlan,
      id: Date.now().toString(),
      status: 'upcoming' // This is now properly typed
    };
    
    setLessonPlans([...lessonPlans, newLessonPlan]);
    setIsCreating(false);
    
    // Reset form
    setNewPlan({
      title: '',
      subject: '',
      class: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      duration: 60,
      objectives: '',
      materials: [],
      activities: '',
      assessment: '',
      notes: ''
    });
    
    toast.success("Piano di lezione creato con successo");
  };
  
  const handleDuplicateLessonPlan = (plan: LessonPlan) => {
    const duplicatedPlan: LessonPlan = {
      ...plan,
      id: Date.now().toString(),
      title: `${plan.title} (copia)`,
      status: 'draft' // This is now properly typed
    };
    
    setLessonPlans([...lessonPlans, duplicatedPlan]);
    toast.success("Piano di lezione duplicato con successo");
  };
  
  const handleDeleteLessonPlan = (id: string) => {
    setLessonPlans(lessonPlans.filter(plan => plan.id !== id));
    toast.success("Piano di lezione eliminato");
  };
  
  const handleCompleteLessonPlan = (id: string) => {
    const updatedPlans = lessonPlans.map(plan => {
      if (plan.id === id) {
        return { ...plan, status: 'completed' as LessonStatus };
      }
      return plan;
    });
    
    setLessonPlans(updatedPlans);
    toast.success("Piano di lezione contrassegnato come completato");
  };
  
  const filteredLessonPlans = lessonPlans.filter(plan => {
    // Filter by search query
    if (searchQuery && !plan.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !plan.objectives.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by class
    if (selectedClass && plan.class !== selectedClass) {
      return false;
    }
    
    // Filter by subject
    if (selectedSubject && plan.subject !== selectedSubject) {
      return false;
    }
    
    // Filter by date
    if (selectedDate && plan.date !== format(selectedDate, 'yyyy-MM-dd')) {
      return false;
    }
    
    // Filter by status
    if (!showCompleted && plan.status === 'completed') {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <BookCopy className="mr-2 h-5 w-5" />
                Pianificazione Lezioni
              </CardTitle>
              <CardDescription>
                Crea e gestisci i tuoi piani di lezione
              </CardDescription>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuova Lezione
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Crea un nuovo piano di lezione</DialogTitle>
                  <DialogDescription>
                    Compila il modulo per creare un nuovo piano di lezione.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titolo</Label>
                      <Input
                        id="title"
                        placeholder="Titolo della lezione"
                        value={newPlan.title}
                        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newPlan.date ? format(new Date(newPlan.date), 'd MMMM yyyy', { locale: it }) : "Seleziona una data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newPlan.date ? new Date(newPlan.date) : undefined}
                            onSelect={(date) => setNewPlan({ ...newPlan, date: date ? format(date, 'yyyy-MM-dd') : '' })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Materia</Label>
                      <Select
                        value={newPlan.subject}
                        onValueChange={(value) => setNewPlan({ ...newPlan, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona la materia" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjectsData.map((subject) => (
                            <SelectItem key={subject.id} value={subject.name}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="class">Classe</Label>
                      <Select
                        value={newPlan.class}
                        onValueChange={(value) => setNewPlan({ ...newPlan, class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona la classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {classesData.map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.name}>
                              {classItem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durata (minuti)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min={15}
                        step={15}
                        value={newPlan.duration}
                        onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) || 60 })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="objectives">Obiettivi</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Obiettivi didattici della lezione"
                      value={newPlan.objectives}
                      onChange={(e) => setNewPlan({ ...newPlan, objectives: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Materiali</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Aggiungi un materiale"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddMaterial} variant="outline">
                        Aggiungi
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPlan.materials.map((material, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1 px-3 py-1"
                        >
                          {material}
                          <button
                            onClick={() => handleRemoveMaterial(index)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <span className="sr-only">Remove</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                            >
                              <path
                                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="activities">Attività e Metodologie</Label>
                    <Textarea
                      id="activities"
                      placeholder="Descrivi le attività e le metodologie didattiche"
                      value={newPlan.activities}
                      onChange={(e) => setNewPlan({ ...newPlan, activities: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assessment">Valutazione</Label>
                    <Textarea
                      id="assessment"
                      placeholder="Metodi di valutazione e verifica dell'apprendimento"
                      value={newPlan.assessment}
                      onChange={(e) => setNewPlan({ ...newPlan, assessment: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Note Aggiuntive</Label>
                    <Textarea
                      id="notes"
                      placeholder="Note aggiuntive, considerazioni, adattamenti"
                      value={newPlan.notes}
                      onChange={(e) => setNewPlan({ ...newPlan, notes: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Annulla
                  </Button>
                  <Button onClick={handleCreateLessonPlan} disabled={!newPlan.title || !newPlan.subject || !newPlan.class}>
                    <SaveAll className="mr-2 h-4 w-4" />
                    Salva Piano di Lezione
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca lezioni..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={selectedClass || ""} onValueChange={(value) => setSelectedClass(value || null)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tutte</SelectItem>
                    {classesData.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.name}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubject || ""} onValueChange={(value) => setSelectedSubject(value || null)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tutte</SelectItem>
                    {subjectsData.map((subject) => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-10">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'd MMM', { locale: it }) : "Data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={() => setShowCompleted(!showCompleted)}
                >
                  <CheckCircle2 className={`mr-2 h-4 w-4 ${showCompleted ? 'text-green-500' : 'text-muted-foreground'}`} />
                  {showCompleted ? 'Nascondi Completate' : 'Mostra Completate'}
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list">
                  <FileText className="mr-2 h-4 w-4" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendario
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                {filteredLessonPlans.length === 0 ? (
                  <div className="text-center py-10">
                    <BookCopy className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Nessun piano di lezione trovato</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery || selectedClass || selectedSubject || selectedDate
                        ? "Prova a modificare i filtri di ricerca."
                        : "Inizia creando un nuovo piano di lezione."}
                    </p>
                    <div className="mt-6">
                      {searchQuery || selectedClass || selectedSubject || selectedDate ? (
                        <Button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedClass(null);
                            setSelectedSubject(null);
                            setSelectedDate(null);
                          }}
                        >
                          Elimina tutti i filtri
                        </Button>
                      ) : (
                        <Button onClick={() => setIsCreating(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Crea il primo piano di lezione
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titolo</TableHead>
                          <TableHead>Materia</TableHead>
                          <TableHead>Classe</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Durata</TableHead>
                          <TableHead>Stato</TableHead>
                          <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLessonPlans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.title}</TableCell>
                            <TableCell>{plan.subject}</TableCell>
                            <TableCell>{plan.class}</TableCell>
                            <TableCell>{format(new Date(plan.date), 'd MMM yyyy', { locale: it })}</TableCell>
                            <TableCell>{plan.duration} min</TableCell>
                            <TableCell>
                              {plan.status === 'completed' ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completata</Badge>
                              ) : plan.status === 'upcoming' ? (
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Programmata</Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Bozza</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <FileText className="h-4 w-4" />
                                      <span className="sr-only">Visualizza</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>{plan.title}</DialogTitle>
                                      <DialogDescription>
                                        {plan.subject} - Classe {plan.class} - {format(new Date(plan.date), 'd MMMM yyyy', { locale: it })}
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="space-y-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Materia</h4>
                                          <p>{plan.subject}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Classe</h4>
                                          <p>{plan.class}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
                                          <p>{format(new Date(plan.date), 'd MMMM yyyy', { locale: it })}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground">Durata</h4>
                                          <p>{plan.duration} minuti</p>
                                        </div>
                                      </div>
                                      
                                      <Separator />
                                      
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                          <Target className="mr-2 h-4 w-4" />
                                          Obiettivi
                                        </h4>
                                        <p className="whitespace-pre-line">{plan.objectives}</p>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                          <BookCopy className="mr-2 h-4 w-4" />
                                          Materiali
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                          {plan.materials.map((material, index) => (
                                            <Badge key={index} variant="secondary">
                                              {material}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                          <Users className="mr-2 h-4 w-4" />
                                          Attività e Metodologie
                                        </h4>
                                        <p className="whitespace-pre-line">{plan.activities}</p>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                                          <CheckCircle2 className="mr-2 h-4 w-4" />
                                          Valutazione
                                        </h4>
                                        <p className="whitespace-pre-line">{plan.assessment}</p>
                                      </div>
                                      
                                      {plan.notes && (
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Note Aggiuntive</h4>
                                          <p className="whitespace-pre-line">{plan.notes}</p>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <DialogFooter>
                                      <div className="flex justify-between w-full">
                                        <Button
                                          variant="outline"
                                          onClick={() => handleDuplicateLessonPlan(plan)}
                                        >
                                          <Copy className="mr-2 h-4 w-4" />
                                          Duplica
                                        </Button>
                                        <div className="flex gap-2">
                                          <Button variant="outline">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Modifica
                                          </Button>
                                          <Button>
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Condividi
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                
                                <Button variant="ghost" size="sm" onClick={() => handleDuplicateLessonPlan(plan)}>
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Duplica</span>
                                </Button>
                                
                                {plan.status !== 'completed' && (
                                  <Button variant="ghost" size="sm" onClick={() => handleCompleteLessonPlan(plan.id)}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="sr-only">Completa</span>
                                  </Button>
                                )}
                                
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteLessonPlan(plan.id)}>
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Elimina</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="calendar">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center py-10">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Vista Calendario</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        La visualizzazione calendario delle lezioni programmate sarà disponibile nella prossima versione.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredLessonPlans.length} lezioni{filteredLessonPlans.length !== 1 ? "" : ""}
          </div>
          
          <Button variant="outline" size="sm">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Importa da orario
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LessonPlanner;
