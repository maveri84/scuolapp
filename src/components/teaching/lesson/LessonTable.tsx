
import React from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, Copy, FileText, Trash2 } from "lucide-react";
import { LessonPlan } from "../types/lesson";
import LessonDetail from "./LessonDetail";

interface LessonTableProps {
  lessons: LessonPlan[];
  onDuplicate: (lesson: LessonPlan) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const LessonTable: React.FC<LessonTableProps> = ({ 
  lessons, 
  onDuplicate, 
  onComplete, 
  onDelete 
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titolo</TableHead>
            <TableHead>Materia</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Durata</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell className="font-medium">{lesson.title}</TableCell>
              <TableCell>{lesson.subject}</TableCell>
              <TableCell>{lesson.class}</TableCell>
              <TableCell>{format(new Date(lesson.date), 'd MMM yyyy', { locale: it })}</TableCell>
              <TableCell>{lesson.duration} min</TableCell>
              <TableCell>
                {lesson.status === 'completed' ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completata</Badge>
                ) : lesson.status === 'upcoming' ? (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Programmata</Badge>
                ) : (
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Bozza</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Visualizza</span>
                      </Button>
                    </DialogTrigger>
                    <LessonDetail lesson={lesson} onDuplicate={onDuplicate} />
                  </Dialog>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDuplicate(lesson)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Duplica</span>
                  </Button>
                  
                  {lesson.status !== 'completed' && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onComplete(lesson.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="sr-only">Completa</span>
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDelete(lesson.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Elimina</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonTable;
