
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "../types/student";

interface AcademicTabProps {
  student: Student;
}

const AcademicTab: React.FC<AcademicTabProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Curriculum Scolastico</CardTitle>
        <CardDescription>Storia accademica e progressione scolastica</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Data di Iscrizione</Label>
              <Input id="enrollmentDate" defaultValue={student.enrollmentDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousSchool">Scuola Precedente</Label>
              <Input id="previousSchool" defaultValue={student.previousSchool} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="irc">Insegnamento Religione Cattolica (IRC)</Label>
              <div className="flex items-center space-x-2">
                <Switch id="irc" defaultChecked={student.attendsReligiousEducation} />
                <Label htmlFor="irc" className="mb-0">{student.attendsReligiousEducation ? 'Si avvale' : 'Non si avvale'}</Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Storico Accademico</h3>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anno Scolastico</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Valutazione Finale</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.academicHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.year}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.finalGrade}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Note Aggiuntive</Label>
            <textarea 
              id="notes" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={student.notes}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salva Modifiche
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicTab;
