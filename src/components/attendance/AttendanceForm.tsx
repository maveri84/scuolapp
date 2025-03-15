
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import FormFields from "./form/FormFields";
import FormActions from "./form/FormActions";
import { useAttendanceForm } from "./form/useAttendanceForm";

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
        <FormActions onSubmit={handleSubmit} />
      </CardFooter>
    </Card>
  );
};

export default AttendanceForm;
