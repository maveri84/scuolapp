
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ClassSelectProps, SubjectSelectProps } from "./types";

interface SignRegisterTabProps {
  classes: ClassSelectProps[];
  subjects: SubjectSelectProps[];
}

const SignRegisterTab = ({ classes, subjects }: SignRegisterTabProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("3A");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [lessonTopic, setLessonTopic] = useState<string>("");

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

  return (
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
  );
};

export default SignRegisterTab;
