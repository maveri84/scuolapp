
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ClassSelectProps, SubjectSelectProps } from "./types";

interface TopicsTabProps {
  classes: ClassSelectProps[];
  subjects: SubjectSelectProps[];
}

const TopicsTab = ({ classes, subjects }: TopicsTabProps) => {
  const [selectedClass, setSelectedClass] = useState<string>("3A");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  return (
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
  );
};

export default TopicsTab;
