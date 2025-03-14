
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";

// Mock data for students
const mockStudents = [
  { 
    id: "1", 
    firstName: "Marco", 
    lastName: "Rossi", 
    studentId: "SR2024001", 
    class: "3A", 
    dateOfBirth: "15/05/2008",
    address: "Via Roma 123, Milano",
    parentNames: "Giuseppe e Maria Rossi"
  },
  { 
    id: "2", 
    firstName: "Laura", 
    lastName: "Bianchi", 
    studentId: "SR2024002", 
    class: "2B", 
    dateOfBirth: "22/08/2009",
    address: "Via Garibaldi 45, Milano",
    parentNames: "Roberto e Anna Bianchi"
  },
  { 
    id: "3", 
    firstName: "Luca", 
    lastName: "Verdi", 
    studentId: "SR2024003", 
    class: "1A", 
    dateOfBirth: "10/03/2010",
    address: "Via Dante 78, Milano",
    parentNames: "Paolo e Carla Verdi"
  },
  { 
    id: "4", 
    firstName: "Giulia", 
    lastName: "Russo", 
    studentId: "SR2024004", 
    class: "3A", 
    dateOfBirth: "05/11/2008",
    address: "Via Manzoni 56, Milano",
    parentNames: "Antonio e Francesca Russo"
  },
  { 
    id: "5", 
    firstName: "Matteo", 
    lastName: "Ferrari", 
    studentId: "SR2024005", 
    class: "2A", 
    dateOfBirth: "18/07/2009",
    address: "Via Verdi 34, Milano",
    parentNames: "Luigi e Sofia Ferrari"
  }
];

interface StudentsListProps {
  onStudentSelect: (studentId: string) => void;
  onStudentEdit?: (studentId: string) => void;
}

const StudentsList: React.FC<StudentsListProps> = ({ onStudentSelect, onStudentEdit }) => {
  const handleEditClick = (studentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onStudentEdit) {
      onStudentEdit(studentId);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matricola</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Cognome</TableHead>
          <TableHead>Classe</TableHead>
          <TableHead>Data di Nascita</TableHead>
          <TableHead>Genitori</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockStudents.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.studentId}</TableCell>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.lastName}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.dateOfBirth}</TableCell>
            <TableCell>{student.parentNames}</TableCell>
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
                  <DropdownMenuItem onClick={() => onStudentSelect(student.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizza
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleEditClick(student.id, e)}>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Modifica
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Elimina
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsList;
