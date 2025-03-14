
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { AcademicRecord } from "../../types/student";

interface AcademicHistoryProps {
  academicHistory: AcademicRecord[];
  onAddRecord: () => void;
  onUpdateRecord: (index: number, field: keyof AcademicRecord, value: string) => void;
  isDisabled?: boolean;
}

const AcademicHistory: React.FC<AcademicHistoryProps> = ({
  academicHistory,
  onAddRecord,
  onUpdateRecord,
  isDisabled = false,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Storico Accademico</h3>
        <Button type="button" variant="outline" size="sm" onClick={onAddRecord} disabled={isDisabled}>
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
                      onChange={(e) => onUpdateRecord(index, 'year', e.target.value)}
                      placeholder="es. 2023-2024"
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={record.class}
                      onChange={(e) => onUpdateRecord(index, 'class', e.target.value)}
                      placeholder="es. 2A"
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={record.finalGrade}
                      onChange={(e) => onUpdateRecord(index, 'finalGrade', e.target.value)}
                      placeholder="es. 8/10"
                      disabled={isDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={record.notes}
                      onChange={(e) => onUpdateRecord(index, 'notes', e.target.value)}
                      placeholder="Note aggiuntive"
                      disabled={isDisabled}
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
  );
};

export default AcademicHistory;
