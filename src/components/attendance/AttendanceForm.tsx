
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import FormFields from "./form/FormFields";
import FormActions from "./form/FormActions";
import { useAttendanceForm } from "./form/useAttendanceForm";
import { AlertCircle, Loader2 } from "lucide-react";

const AttendanceForm = () => {
  const {
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
  } = useAttendanceForm();

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
          {apiError && (
            <div className="bg-destructive/15 p-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
              <span className="text-destructive text-sm">{apiError}</span>
            </div>
          )}
          
          {isSubmitting && (
            <div className="bg-secondary p-3 rounded-md mb-4 flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-primary mr-2 animate-spin" />
              <span className="text-primary text-sm">Salvataggio in corso...</span>
            </div>
          )}
          
          <FormFields
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            notes={notes}
            setNotes={setNotes}
          />
        </form>
      </CardContent>
      <CardFooter>
        <FormActions onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </CardFooter>
    </Card>
  );
};

export default AttendanceForm;
