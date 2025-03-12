
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  UserX, 
  AlarmClock, 
  ArrowRightFromLine, 
  FileCheck, 
  Pencil, 
  Search,
  Calendar,
  Filter
} from "lucide-react";

// Mock data for attendance register
const mockAttendanceData = [
  { 
    id: 1, 
    studentId: 1, 
    studentName: "Marco Bianchi", 
    class: "3A",
    date: "2024-05-20", 
    type: "absence", 
    time: "",
    notes: "Malattia",
    justified: true
  },
  { 
    id: 2, 
    studentId: 3, 
    studentName: "Luca Rossi", 
    class: "3A",
    date: "2024-05-20", 
    type: "late", 
    time: "08:45",
    notes: "Ritardo treno",
    justified: true
  },
  { 
    id: 3, 
    studentId: 5, 
    studentName: "Paolo Gialli", 
    class: "3A",
    date: "2024-05-19", 
    type: "early-exit", 
    time: "12:30",
    notes: "Visita medica",
    justified: true
  },
  { 
    id: 4, 
    studentId: 2, 
    studentName: "Anna Verdi", 
    class: "3A",
    date: "2024-05-18", 
    type: "absence", 
    time: "",
    notes: "",
    justified: false
  },
  { 
    id: 5, 
    studentId: 4, 
    studentName: "Elena Neri", 
    class: "3A",
    date: "2024-05-17", 
    type: "late", 
    time: "09:05",
    notes: "",
    justified: false
  },
];

const AttendanceRegister = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const itemsPerPage = 10;

  // Filter attendance data based on search, class, and type
  const filteredData = mockAttendanceData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass ? item.class === selectedClass : true;
    const matchesType = selectedType ? item.type === selectedType : true;
    return matchesSearch && matchesClass && matchesType;
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "absence":
        return <UserX className="h-4 w-4 text-red-500" />;
      case "late":
        return <AlarmClock className="h-4 w-4 text-amber-500" />;
      case "early-exit":
        return <ArrowRightFromLine className="h-4 w-4 text-blue-500" />;
      case "justification":
        return <FileCheck className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "absence":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <UserX className="h-3 w-3" /> Assenza
        </Badge>;
      case "late":
        return <Badge variant="default" className="flex items-center gap-1 bg-amber-500">
          <AlarmClock className="h-3 w-3" /> Ritardo
        </Badge>;
      case "early-exit":
        return <Badge variant="default" className="flex items-center gap-1 bg-blue-500">
          <ArrowRightFromLine className="h-3 w-3" /> Uscita ant.
        </Badge>;
      case "justification":
        return <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <FileCheck className="h-3 w-3" /> Giustificazione
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro Presenze</CardTitle>
        <CardDescription>
          Visualizza e gestisci le registrazioni di presenze e assenze
        </CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca studente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Classe" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le classi</SelectItem>
              <SelectItem value="1A">1A</SelectItem>
              <SelectItem value="1B">1B</SelectItem>
              <SelectItem value="2A">2A</SelectItem>
              <SelectItem value="2B">2B</SelectItem>
              <SelectItem value="3A">3A</SelectItem>
              <SelectItem value="3B">3B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i tipi</SelectItem>
              <SelectItem value="absence">Assenze</SelectItem>
              <SelectItem value="late">Ritardi</SelectItem>
              <SelectItem value="early-exit">Uscite anticipate</SelectItem>
              <SelectItem value="justification">Giustificazioni</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Studente</TableHead>
                <TableHead className="w-[100px]">Classe</TableHead>
                <TableHead className="w-[120px]">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Data
                  </div>
                </TableHead>
                <TableHead className="w-[150px]">Tipo</TableHead>
                <TableHead className="w-[100px]">Orario</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="w-[100px]">Stato</TableHead>
                <TableHead className="w-[80px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.length > 0 ? (
                displayData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.studentName}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('it-IT')}</TableCell>
                    <TableCell>{getTypeBadge(item.type)}</TableCell>
                    <TableCell>{item.time || "-"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.notes || "-"}</TableCell>
                    <TableCell>
                      {item.justified ? (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Giustificato
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          Da giustificare
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" title="Modifica">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nessun risultato trovato.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Pagina {currentPage} di {pageCount}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceRegister;
