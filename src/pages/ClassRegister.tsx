
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import DashboardLayout from "@/layouts/DashboardLayout";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import AttendanceRegister from "@/components/attendance/AttendanceRegister";
import { BookText, CheckCircle, Clock, CalendarDays, FileText, MessageSquare, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClassRegister = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("3A");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [lessonTopic, setLessonTopic] = useState<string>("");
  const [disciplinaryNote, setDisciplinaryNote] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  const subjects = [
    { value: "italiano", label: "Italiano" },
    { value: "matematica", label: "Matematica" },
    { value: "storia", label: "Storia" },
    { value: "scienze", label: "Scienze" },
    { value: "inglese", label: "Inglese" },
  ];

  const students = [
    { id: "1", name: "Marco Rossi" },
    { id: "2", name: "Giulia Bianchi" },
    { id: "3", name: "Luca Verdi" },
    { id: "4", name: "Sofia Russo" },
    { id: "5", name: "Alessandro Ferrara" },
  ];

  const classes = [
    { value: "1A", label: "1A" },
    { value: "1B", label: "1B" },
    { value: "2A", label: "2A" },
    { value: "2B", label: "2B" },
    { value: "3A", label: "3A" },
    { value: "3B", label: "3B" },
  ];

  const teacherSchedule = [
    { day: "Lunedì", periods: [
      { time: "08:00-09:00", subject: "Italiano", class: "3A" },
      { time: "09:00-10:00", subject: "Italiano", class: "3A" },
      { time: "10:00-11:00", subject: "Storia", class: "2B" },
    ]},
    { day: "Martedì", periods: [
      { time: "08:00-09:00", subject: "Storia", class: "3A" },
      { time: "09:00-10:00", subject: "Italiano", class: "1A" },
    ]},
    { day: "Mercoledì", periods: [
      { time: "10:00-11:00", subject: "Italiano", class: "3A" },
      { time: "11:00-12:00", subject: "Storia", class: "3A" },
    ]},
    { day: "Giovedì", periods: [
      { time: "08:00-09:00", subject: "Italiano", class: "2B" },
      { time: "09:00-10:00", subject: "Storia", class: "1A" },
    ]},
    { day: "Venerdì", periods: [
      { time: "10:00-11:00", subject: "Italiano", class: "3A" },
      { time: "11:00-12:00", subject: "Storia", class: "2B" },
    ]},
  ];

  const handleSignRegister = () => {
    if (!selectedSubject || !lessonTopic) {
      toast({
        title: "Informazioni mancanti",
        description: "Per favore compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registro firmato",
      description: `Hai firmato il registro per la classe ${selectedClass}, materia ${subjects.find(s => s.value === selectedSubject)?.label}`,
    });
    
    // Reset form
    setLessonTopic("");
  };

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
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Registro di Classe</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le attività didattiche, presenze e annotazioni per la classe
        </p>
      </div>

      <Tabs defaultValue="sign" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="sign">
            <CheckCircle className="mr-2 h-4 w-4" />
            Firma Registro
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <UserCheck className="mr-2 h-4 w-4" />
            Presenze
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquare className="mr-2 h-4 w-4" />
            Note Disciplinari
          </TabsTrigger>
          <TabsTrigger value="topics">
            <BookText className="mr-2 h-4 w-4" />
            Argomenti
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <CalendarDays className="mr-2 h-4 w-4" />
            Orario
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sign" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Firma Registro</CardTitle>
              <CardDescription>
                Inserisci la tua firma digitale per l'ora di lezione corrente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data</label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
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
                    <label className="text-sm font-medium">Materia</label>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ora</label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona ora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1° ora (8:00-9:00)</SelectItem>
                        <SelectItem value="2">2° ora (9:00-10:00)</SelectItem>
                        <SelectItem value="3">3° ora (10:00-11:00)</SelectItem>
                        <SelectItem value="4">4° ora (11:00-12:00)</SelectItem>
                        <SelectItem value="5">5° ora (12:00-13:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Argomenti svolti</label>
                    <Textarea 
                      value={lessonTopic}
                      onChange={(e) => setLessonTopic(e.target.value)}
                      placeholder="Inserisci gli argomenti svolti durante la lezione"
                      className="min-h-24"
                    />
                  </div>

                  <Button className="w-full mt-4" onClick={handleSignRegister}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Firma Registro
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceRegister />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Argomenti</CardTitle>
              <CardDescription>
                Registro degli argomenti svolti in classe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-sm font-medium">Classe</label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="mt-1">
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
                  
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-sm font-medium">Materia</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="mt-1">
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
                </div>

                <div className="border rounded-md">
                  <div className="p-4 bg-muted border-b">
                    <h3 className="font-medium">Elenco argomenti</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 bg-secondary rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">20/05/2024 - 1° ora</span>
                          <span className="text-sm text-muted-foreground">Prof. Bianchi</span>
                        </div>
                        <p>Introduzione alla letteratura del Novecento: contesto storico e culturale</p>
                      </div>
                      
                      <div className="p-3 bg-secondary rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">19/05/2024 - 3° ora</span>
                          <span className="text-sm text-muted-foreground">Prof. Bianchi</span>
                        </div>
                        <p>Eugenio Montale: vita e opere principali</p>
                      </div>
                      
                      <div className="p-3 bg-secondary rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">18/05/2024 - 1° ora</span>
                          <span className="text-sm text-muted-foreground">Prof. Bianchi</span>
                        </div>
                        <p>Analisi della poesia "Spesso il male di vivere" di Montale</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orario Settimanale</CardTitle>
              <CardDescription>
                Consulta il tuo orario di lezione settimanale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border bg-muted font-medium text-left">Orario</th>
                      <th className="p-2 border bg-muted font-medium text-left">Lunedì</th>
                      <th className="p-2 border bg-muted font-medium text-left">Martedì</th>
                      <th className="p-2 border bg-muted font-medium text-left">Mercoledì</th>
                      <th className="p-2 border bg-muted font-medium text-left">Giovedì</th>
                      <th className="p-2 border bg-muted font-medium text-left">Venerdì</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00"].map((timeSlot) => (
                      <tr key={timeSlot}>
                        <td className="p-2 border font-medium">{timeSlot}</td>
                        {["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"].map((day) => {
                          const lesson = teacherSchedule
                            .find(d => d.day === day)
                            ?.periods.find(p => p.time === timeSlot);
                          
                          return (
                            <td key={`${day}-${timeSlot}`} className="p-2 border">
                              {lesson ? (
                                <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded">
                                  <div className="font-medium">{lesson.subject}</div>
                                  <div className="text-xs text-muted-foreground">{lesson.class}</div>
                                </div>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClassRegister;
