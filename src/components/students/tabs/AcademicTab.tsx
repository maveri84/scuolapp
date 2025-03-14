
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student, AcademicRecord, PhysicalEducationExemption } from "../types/student";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AcademicTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const AcademicTab: React.FC<AcademicTabProps> = ({ student, onChange }) => {
  const [academicHistory, setAcademicHistory] = useState<AcademicRecord[]>(student.academicHistory || []);
  const [hasExemption, setHasExemption] = useState(!!student.physicalEducationExemption);
  const [exemption, setExemption] = useState<PhysicalEducationExemption>(
    student.physicalEducationExemption || { startDate: "", endDate: "", reason: "" }
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    student.physicalEducationExemption?.startDate ? new Date(student.physicalEducationExemption.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    student.physicalEducationExemption?.endDate ? new Date(student.physicalEducationExemption.endDate) : undefined
  );

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

  const handleExemptionSwitchChange = (checked: boolean) => {
    setHasExemption(checked);
    if (!checked && onChange) {
      onChange('physicalEducationExemption', null);
    }
  };

  const handleExemptionChange = (field: keyof PhysicalEducationExemption, value: string) => {
    const updatedExemption = { ...exemption, [field]: value };
    setExemption(updatedExemption);
    
    if (onChange) {
      onChange('physicalEducationExemption', updatedExemption);
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && onChange) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const updatedExemption = { ...exemption, startDate: formattedDate };
      setExemption(updatedExemption);
      onChange('physicalEducationExemption', updatedExemption);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date && onChange) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const updatedExemption = { ...exemption, endDate: formattedDate };
      setExemption(updatedExemption);
      onChange('physicalEducationExemption', updatedExemption);
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

          {/* Physical Education Exemption Section */}
          <div className="border p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Esonero Educazione Fisica</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="hasExemption" 
                  checked={hasExemption} 
                  onCheckedChange={handleExemptionSwitchChange}
                />
                <Label htmlFor="hasExemption" className="mb-0">
                  {hasExemption ? 'Attivo' : 'Non attivo'}
                </Label>
              </div>
            </div>
            
            {hasExemption && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="exemption-start">Data Inizio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : <span>Seleziona data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={handleStartDateChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exemption-end">Data Fine</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : <span>Seleziona data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleEndDateChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="exemption-reason">Motivo dell'Esonero</Label>
                  <Input
                    id="exemption-reason"
                    value={exemption.reason}
                    placeholder="Specificare il motivo dell'esonero"
                    onChange={(e) => handleExemptionChange('reason', e.target.value)}
                  />
                </div>
              </div>
            )}
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
