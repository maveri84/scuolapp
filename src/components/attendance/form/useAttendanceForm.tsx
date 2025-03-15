
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AttendanceType } from "./constants";

export const useAttendanceForm = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedType, setSelectedType] = useState<AttendanceType>("absence");
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  );
  const [notes, setNotes] = useState<string>("");

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

  return {
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
    handleSubmit,
  };
};
