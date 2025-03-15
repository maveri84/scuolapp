
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceTable from "./AttendanceTable";
import AttendancePagination from "./AttendancePagination";
import { mockAttendanceData } from "./types";
import { filterAttendanceData } from "./utils";
import AttendanceForm from "./AttendanceForm";

const AttendanceRegister = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [showNewForm, setShowNewForm] = useState(false);
  const itemsPerPage = 10;

  // Filter attendance data based on search, class, type, and date
  const filteredData = filterAttendanceData(
    mockAttendanceData,
    searchQuery,
    selectedClass,
    selectedType,
    selectedDate
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNewAttendance = () => {
    toast({
      title: "Nuova registrazione",
      description: "Form di inserimento presenze/assenze aperto"
    });
    setShowNewForm(true);
  };

  const handleAction = (id: number) => {
    toast({
      title: "Modifica registrazione",
      description: `Modifica della registrazione ${id} in corso...`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro Presenze</CardTitle>
        <CardDescription>
          Visualizza e gestisci le registrazioni di presenze e assenze
        </CardDescription>
        <AttendanceFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onNewAttendance={handleNewAttendance}
        />
      </CardHeader>
      <CardContent>
        {showNewForm ? (
          <AttendanceForm />
        ) : (
          <>
            <AttendanceTable 
              displayData={displayData} 
              onAction={handleAction}
            />
            <AttendancePagination 
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceRegister;
