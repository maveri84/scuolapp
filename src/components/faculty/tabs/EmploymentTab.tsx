
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Teacher } from "../types/faculty";

interface EmploymentTabProps {
  teacher: Teacher;
  onChange: (field: string, value: any) => void;
}

const EmploymentTab: React.FC<EmploymentTabProps> = ({ teacher, onChange }) => {
  const [newSubject, setNewSubject] = React.useState("");

  const handleAddSubject = () => {
    if (newSubject.trim() && !teacher.subjectsTaught.includes(newSubject.trim())) {
      onChange("subjectsTaught", [...teacher.subjectsTaught, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    onChange("subjectsTaught", teacher.subjectsTaught.filter(s => s !== subject));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni sull'Impiego</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="employeeId">ID Dipendente</Label>
            <Input 
              id="employeeId" 
              value={teacher.employeeId} 
              onChange={(e) => onChange("employeeId", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Posizione/Ruolo</Label>
            <Input 
              id="position" 
              value={teacher.position} 
              onChange={(e) => onChange("position", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contractType">Tipo di Contratto</Label>
            <Select 
              value={teacher.contractType} 
              onValueChange={(value) => onChange("contractType", value)}
            >
              <SelectTrigger id="contractType">
                <SelectValue placeholder="Seleziona tipo contratto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tempo Indeterminato">Tempo Indeterminato</SelectItem>
                <SelectItem value="Tempo Determinato">Tempo Determinato</SelectItem>
                <SelectItem value="Supplenza">Supplenza</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hiringDate">Data di Assunzione</Label>
            <Input 
              id="hiringDate" 
              type="date" 
              value={teacher.hiringDate} 
              onChange={(e) => onChange("hiringDate", e.target.value)}
            />
          </div>
          
          <div className="col-span-2 space-y-2">
            <Label>Di Ruolo</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={teacher.isTenured} 
                onCheckedChange={(checked) => onChange("isTenured", checked)}
              />
              <span className="text-sm">
                {teacher.isTenured ? "Di ruolo" : "Non di ruolo"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Materie Insegnate</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {teacher.subjectsTaught.map((subject, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(subject)}
                    className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Rimuovi {subject}</span>
                  </button>
                </Badge>
              ))}
              {teacher.subjectsTaught.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  Nessuna materia aggiunta
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Aggiungi una materia..." 
                value={newSubject} 
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubject();
                  }
                }}
              />
              <Button onClick={handleAddSubject} type="button">
                Aggiungi
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Dati Bancari</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input 
                id="iban" 
                value={teacher.bankDetails?.iban || ""} 
                onChange={(e) => onChange("bankDetails", { 
                  ...teacher.bankDetails, 
                  iban: e.target.value 
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bank">Banca</Label>
              <Input 
                id="bank" 
                value={teacher.bankDetails?.bank || ""} 
                onChange={(e) => onChange("bankDetails", { 
                  ...teacher.bankDetails, 
                  bank: e.target.value 
                })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentTab;
