
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student, AcademicRecord } from "../types/student";

interface AcademicTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const AcademicTab: React.FC<AcademicTabProps> = ({ student, onChange }) => {
  const [academicHistory, setAcademicHistory] = useState<AcademicRecord[]>(student.academicHistory || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (onChange) {
      onChange('attendsReligiousEducation', checked);
    }
  };

  const addAcademicRecord = () => {
    const newRecord: AcademicRecord = { 
      year: "", 
      class: "", 
      finalGrade: "", 
      notes: "" 
    };
    const updatedHistory = [...academicHistory, newRecord];
    setAcademicHistory(updatedHistory);
    if (onChange) {
      onChange('academicHistory', updatedHistory);
    }
  };

  const updateAcademicRecord = (index: number, field: keyof AcademicRecord, value: string) => {
    const updatedHistory = [...academicHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value
    };
    setAcademicHistory(updatedHistory);
    if (onChange) {
      onChange('academicHistory', updatedHistory);
    }
  };

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
              <Input 
                id="enrollmentDate" 
                value={student.enrollmentDate} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousSchool">Scuola Precedente</Label>
              <Input 
                id="previousSchool" 
                value={student.previousSchool} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="irc">Insegnamento Religione Cattolica (IRC)</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="irc" 
                  checked={student.attendsReligiousEducation} 
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="irc" className="mb-0">
                  {student.attendsReligiousEducation ? 'Si avvale' : 'Non si avvale'}
                </Label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Storico Accademico</h3>
              <Button type="button" variant="outline" size="sm" onClick={addAcademicRecord}>
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Anno
              </Button>
            </div>
            
            {academicHistory.length > 0 ? (
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
                    {academicHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input 
                            value={record.year}
                            onChange={(e) => updateAcademicRecord(index, 'year', e.target.value)}
                            placeholder="es. 2023-2024"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={record.class}
                            onChange={(e) => updateAcademicRecord(index, 'class', e.target.value)}
                            placeholder="es. 2A"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={record.finalGrade}
                            onChange={(e) => updateAcademicRecord(index, 'finalGrade', e.target.value)}
                            placeholder="es. 8/10"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={record.notes}
                            onChange={(e) => updateAcademicRecord(index, 'notes', e.target.value)}
                            placeholder="Note aggiuntive"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-4 border rounded-md bg-muted/30">
                <p className="text-muted-foreground">Nessun dato storico disponibile</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Note Aggiuntive</Label>
            <textarea 
              id="notes" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={student.notes}
              onChange={handleChange}
            />
          </div>

          {!onChange && (
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salva Modifiche
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicTab;
