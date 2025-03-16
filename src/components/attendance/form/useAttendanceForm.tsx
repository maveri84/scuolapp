
import { useState, useEffect } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    // Clear student selection when class changes
    if (selectedClass) {
      setSelectedStudent("");
    }
  }, [selectedClass]);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    setApiError(null);
    
    try {
      // Would be called in a real application:
      // const response = await fetch('/api/presenze', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     studentId: selectedStudent,
      //     type: selectedType,
      //     date,
      //     time: (selectedType === 'late' || selectedType === 'early-exit') ? time : undefined,
      //     notes,
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Errore durante il salvataggio della presenza');
      // }
      
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Clear form
      toast({
        title: "Registrazione Salvata",
        description: "La registrazione è stata salvata con successo.",
      });
      
      setSelectedStudent("");
      setNotes("");
    } catch (error) {
      setApiError("Si è verificato un errore durante il salvataggio della presenza. Riprova più tardi.");
      
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    apiError,
    isSubmitting,
    handleSubmit,
  };
};
