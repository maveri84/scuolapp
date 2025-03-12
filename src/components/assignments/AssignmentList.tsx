
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Search, Edit, Trash2, ExternalLink, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample assignment data for demonstration
const sampleAssignments = [
  {
    id: "1",
    title: "Esercizi di matematica",
    description: "Completare gli esercizi 1-10 del capitolo 5",
    dueDate: "2023-05-15",
    assignedTo: "class",
    classId: "1A",
    studentId: null,
    type: "file",
    resourceUrl: "matematica_esercizi.pdf",
  },
  {
    id: "2",
    title: "Ricerca di storia",
    description: "Preparare una ricerca su un personaggio storico a scelta",
    dueDate: "2023-05-20",
    assignedTo: "student",
    classId: "2B",
    studentId: "S12345",
    type: "text",
    resourceUrl: null,
  },
  {
    id: "3",
    title: "Quiz di scienze",
    description: "Completare il quiz online sulla piattaforma educativa",
    dueDate: "2023-05-18",
    assignedTo: "class",
    classId: "3A",
    studentId: null,
    type: "link",
    resourceUrl: "https://example.com/science-quiz",
  },
];

const AssignmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState<string | undefined>(undefined);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter assignments
    console.log("Searching for:", searchQuery, "in class:", classFilter);
  };

  const handleEdit = (assignmentId: string) => {
    console.log("Edit assignment:", assignmentId);
    // In a real app, would navigate to edit form or open modal
  };

  const handleDelete = (assignmentId: string) => {
    console.log("Delete assignment:", assignmentId);
    // In a real app, would confirm deletion and remove the assignment
  };

  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case "file":
        return <Paperclip className="h-4 w-4" />;
      case "link":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <Input 
            placeholder="Cerca compito..." 
            className="rounded-r-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" className="rounded-l-none" type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filtra per classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1A">1A</SelectItem>
            <SelectItem value="1B">1B</SelectItem>
            <SelectItem value="2A">2A</SelectItem>
            <SelectItem value="2B">2B</SelectItem>
            <SelectItem value="3A">3A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>Lista dei compiti assegnati</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Titolo</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Scadenza</TableHead>
            <TableHead>Assegnato a</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleAssignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getAssignmentTypeIcon(assignment.type)}
                  {assignment.title}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {assignment.type === "file" && "File"}
                  {assignment.type === "link" && "Link"}
                  {assignment.type === "text" && "Testo"}
                </Badge>
              </TableCell>
              <TableCell>{new Date(assignment.dueDate).toLocaleDateString('it-IT')}</TableCell>
              <TableCell>
                {assignment.assignedTo === "class" ? (
                  <Badge variant="secondary">Classe {assignment.classId}</Badge>
                ) : (
                  <Badge>Studente individuale</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(assignment.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(assignment.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignmentList;
