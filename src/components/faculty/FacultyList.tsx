
import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Eye, FileEdit, Trash2, Search } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { mockTeachers, Teacher } from "./types/faculty";

interface FacultyListProps {
  onSelectTeacher: (id: string) => void;
}

const FacultyList: React.FC<FacultyListProps> = ({ onSelectTeacher }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teachers, setTeachers] = useState(mockTeachers);

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.taxCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteTeacher = (id: string) => {
    // In a real application, you would call an API to delete the teacher
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca docente..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cognome</TableHead>
              <TableHead>Materie</TableHead>
              <TableHead>Tipo Contratto</TableHead>
              <TableHead>Incarico</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.employeeId}</TableCell>
                <TableCell>{teacher.firstName}</TableCell>
                <TableCell>{teacher.lastName}</TableCell>
                <TableCell>{teacher.subjectsTaught.join(", ")}</TableCell>
                <TableCell>{teacher.contractType}</TableCell>
                <TableCell>{teacher.isTenured ? "Di ruolo" : "Non di ruolo"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Apri menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Azioni</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onSelectTeacher(teacher.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizza Profilo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSelectTeacher(teacher.id)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Modifica
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive" 
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Elimina
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredTeachers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nessun docente trovato.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FacultyList;
