
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserX, AlarmClock, ArrowRightFromLine, FileCheck } from "lucide-react";
import { studentClasses, mockStudents } from "./constants";

interface FormFieldsProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  selectedClass,
  setSelectedClass,
  selectedStudent,
  setSelectedStudent,
  selectedType,
  setSelectedType,
  date,
  setDate,
  time,
  setTime,
  notes,
  setNotes,
}) => {
  const filteredStudents = selectedClass 
    ? mockStudents.filter(student => student.class === selectedClass) 
    : mockStudents;

  return (
    <div className="space-y-4">
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
          <Select value={selectedType} onValueChange={setSelectedType}>
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
    </div>
  );
};

export default FormFields;
