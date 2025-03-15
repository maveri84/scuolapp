
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Pencil } from "lucide-react";
import { AttendanceRecord } from "./types";
import { getTypeBadge, formatDate } from "./utils";

interface AttendanceTableProps {
  displayData: AttendanceRecord[];
  onAction: (id: number) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ displayData, onAction }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Studente</TableHead>
            <TableHead className="w-[100px]">Classe</TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Data
              </div>
            </TableHead>
            <TableHead className="w-[150px]">Tipo</TableHead>
            <TableHead className="w-[100px]">Orario</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="w-[100px]">Stato</TableHead>
            <TableHead className="w-[80px] text-center">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.length > 0 ? (
            displayData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.studentName}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Modifica"
                    onClick={() => onAction(item.id)}
                  >
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
  );
};

export default AttendanceTable;
